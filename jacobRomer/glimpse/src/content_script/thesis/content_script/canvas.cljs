;; create the main project namespace
(ns thesis.content-script.canvas
  (:require-macros [hiccups.core :as hiccups :refer [html]]
                   [cljs.core.async.macros :as m :refer [go go-loop]])
  (:require [domina.core :refer [by-id value set-value! destroy! append! by-class]]
            [domina.css :refer [sel]]
            [chromex.logging :refer-macros [log]]
            [thesis.content-script.draw :refer [draw-entity draw-text]]
            [domina.events :as evt]
            [reagent.core :as r]
            [goog.events :as events]
            [goog.events.EventType :as EventType]
            [cljs.core.async :refer [chan close! <! >!]]
            [thesis.content-script.animation :as anim]
            [thesis.content-script.image :as image]
            [hiccups.runtime :as hiccupsrt]))

(defonce app-db (r/atom {:screen {:w 0 :h 0}
                     :data [{:pos {:x 0 :y 10} :display-size 5 :data ["outbrain.com", 1, true]}
                           {:pos {:x 19 :y 10} :display-size 5 :data ["disqus.com", 1, true]}]
                     :offset 0
                     :center-point {:x 0 :y 0}
                     :shift 0
                     :view "start"
                     :normalize-size 1
                     :space nil
                     :current-page 1}))
(def dim (r/cursor app-db [:screen]))
(def data (r/cursor app-db [:data]))
(def shift (r/cursor app-db [:shift]))
(def offset (r/cursor app-db [:offset]))
(def view (r/cursor app-db [:view]))
(def normalize (r/cursor app-db [:normalize]))
(def center-point-x (r/cursor app-db [:center-point :x]))
(def center-point-y (r/cursor app-db [:center-point :y]))
(def space (r/cursor app-db [:space]))

(def reactions (map-indexed #(anim/spring (r/cursor app-db [:data %1 :pos :x])) @data))

(def shift-spring (anim/spring shift))
(def ospring (anim/spring offset))
(def center-spring-x (anim/spring center-point-x))
(def center-spring-y (anim/spring center-point-y))

(defonce resize-chan (chan))
(defonce scroll-chan (chan))

(def tabdict (atom nil))

(def state-chan (chan))
(def img-chan (atom nil))
(def img-state (r/atom {:x 0 :y 0 :rx 0 :ry 0}))
(def img-spring (anim/spring img-state))

(defn randomize-data
  []
  (->>
    (reduce #(conj %1 (assoc %2 :pos {:x (+ 40 (* (rand) (- (:w @dim) 80)))
                                      :y (+ 40 (* (rand) (- (:h @dim) 80)))}
                                :display-size (get-in %2 [:data 1]))) [] @data)
    (reset! data)))

(defn align-right
  []
  (->>
    (reduce #(conj %1 (assoc %2 :pos {:x (* 0.2 (:w @dim))
                                      :y (* (+ 0.5 (count %1)) (/ (:h @dim) (count @data)))}
                                 :display-size 8)) [] @data)
    (reset! data)))

(defn single-view
  []
  (->>
    (reduce #(conj %1 (assoc %2 :pos {:x (if (= (count %1) 1) 100 -200)
                                      :y (condp = (count %1)
                                                1 100
                                                (get-in %2 [:pos :y]))}
                                :display-size (if (= (count %1) 1) 15 1)
                                      )) [] @data)
    (reset! data)))

(defn get-springs
  [data]
  (reduce #(conj %1 {:no (count %1)
                     :x (anim/spring (r/cursor app-db [:data (count %1) :pos :x]))
                     :y (anim/spring (r/cursor app-db [:data (count %1) :pos :y]))})
  [] data))

(def springs (get-springs @data))

(defn switch-page
  []
  (let [h (/ (:h @dim) 1)]
  (swap! offset #(condp = %
                   0 h
                   h 0))))

(defn switch-state
  [chan]
  (go-loop []
     (let [msg (<! chan)]
       (do (condp = msg
             "page" (swap! shift #(condp = %
                               0 1
                               1 -1
                               -1 0))
             "hu" (switch-page)
             "randomize" (do (randomize-data))
             "align" (do (align-right))
             "single" (do (single-view))
             (recur))
           (recur)))))
(switch-state state-chan)

(defn add-image-listeners []
  (do
    (.. js/window (addEventListener "wheel" #(go (>! scroll-chan %))))
    (.. js/window (addEventListener "resize" (fn [e] (go (>! resize-chan "hu")))))
    (.. js/window (addEventListener "mousedown" #(go
                                                    (>! state-chan "mouse")))))
    (.. js/window (addEventListener "keydown" #(go
                                                  (>! state-chan (condp = (.. % -code)
                                                                   "KeyJ" "page"
                                                                   "KeyS" "single"
                                                                   "KeyA" "align"
                                                                   "KeyR" "randomize"
                                                                   (str "default"))))))
    (evt/listen!
    js/document
    :mousemove
    (fn [e]
      #_(println (str "node: " (:clientY e)))))
    (evt/listen!
      (by-class "ext-image")
      :webkitAnimationEnd
      (fn
        [evt]
        (println (str "ende" (:target evt))))))

(defn get-initial-coordinates
  [datac]
  (let [w (:w @dim)
        h (:h @dim)
        data @datac]
        (map-indexed #(update-in %2 [:pos :y] + (* (+ 0.5 %1) (/ h (count data)))) data)))

(defn watch-resize! []
  (go-loop []
    (<! resize-chan)
    (swap! dim #(assoc % :w (.. js/window -innerWidth) :h (.. js/window -innerHeight)))
    (recur)))

(defn watch-scroll! []
  (go-loop
    []
    (let [dy (.-deltaY (<! scroll-chan))]
      (println dy)
      (swap! offset #(+ @offset dy))
      (recur))))

(defn setup
  []
  (do
    (swap! dim #(assoc % :w (.. js/window -innerWidth) :h (.. js/window -innerHeight)))
    (do
      ;(add-image-listeners)
      (get-initial-coordinates data)
      (randomize-data)
      (watch-scroll!)
      (watch-resize!)

      (reset! center-point-x 0)
      (reset! center-point-y (/ (:h @dim) 2))
      ;(log (str (clj->js (sel "body"))))
      (append! (sel "body") (str (if-not (by-id "ext-canvas-container")
                                    (html [:div#ext-canvas-container])
                                    ;(html [:img#ext-image.ext-image.ext-canvas-slide {:src "img/t.png"}])))
                                    ))))))


(defn sc-overview
  [form data]
  (doall (map
         #(draw-text
            form
            [(get data :x) (get data :y)]
            (get-in % [:data 0])
            25)
         data)))

(defn sc-tabdict
  [form center]
  (doall (map-indexed
           #(draw-text
              form
              (js/Vector. 20 (+ 20 (* 70 %1)))
              %2
              15)
           @tabdict)))

(defn sc-satellites
  [form center data osf]
  (doall (map #(draw-entity
            form
            center
            %
            osf)
           data)))

(defn sc-clusters
  [form center data]
  (reduce #() [] data)
  )

(defn get-visible-elements
  [data]
    (filter #(and (<  (get-in % [:pos :x]) (:w @dim)) (< (get-in % [:pos :h]) (:h @dim)) data)))

(defn get-elements
  [spr]
  (doall (map #(assoc {} :x @(get % :x)
                         :y @(get % :y)
                         :data (get-in @data [(get % :no) :data])
                         :display-size (get-in @data [(get % :no) :display-size])
                         ) spr)))
(defn offspringify
  [data]
  (map #(assoc-in % [:pos :y] (+ @ospring (get-in % [:pos :y]))) data))

(defn draw
  ([time form w h center data]
   (let [os @ospring
         osf @offset
         space @space]
    (.clearRect (.-ctx space) 0 0 w h)

    ;(draw-element form)
    (condp = @view
      "start" (do
                (sc-satellites form center data osf))
      ;"random" (sc-satellites form center data)
      ;"single" (sc-satellites form center data)
      )
    ;(sc-overview form (offspringify data))
    ;(sc-overview form (offspringify data))

    (.requestAnimationFrame js/window #(do
                                         (draw % form)
                                         (image/draw! {:x 0 :y 0 :z (- 0 (/ time 100)) :rx 0 :ry (+ 0 (/ time 100000)) :rz 0 :display false})))))
  ([time form]
   (let [h (:h @dim)
         w (:w @dim)]
    (draw time form w h (.. (js/Vector. @center-spring-x @center-spring-y) (add 1 @offset)) (get-elements springs)))))

(defn init!
  [img tab-dict]
  (let [div (by-id "ext-canvas-container")
        ichan (image/init! img)]
    (reset! tabdict tab-dict)
    (reset! img-chan ichan)
    (if (nil? div)
      (do
        (->> (doall (map #(hash-map
                             :pos {:x (+ 1 (rand 20)) :y (+ 1 (rand 50))}
                             :display-size (+ 5 (rand 15))
                             :data [%, 4, false]
                             ) (vec tab-dict)))
        (reset! data))
        (setup)
      {:pos {:x 19 :y 10} :display-size 5 :data ["yldbt.com", 3, false]}
        (reset! space (..
                     (js/CanvasSpace.)
                     (display "#ext-canvas-container")
                     (refresh true)))
        (draw 0 (js/Form. @space)))
      (do (destroy! div)
          (destroy! (by-id "ext-image"))))))

