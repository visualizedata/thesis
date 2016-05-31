(defproject jacobmbr/thesis "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.8.51"]
                 [org.clojure/core.async "0.2.374"]
                 [binaryage/chromex "0.4.0"]
                 [figwheel "0.5.2"]
                 [org.clojars.magomimmo/domina "2.0.0-SNAPSHOT"]
                 [cljs-idxdb "0.1.0"]
                 [hiccups "0.3.0"]
                 [cljs-ajax "0.5.4"]
                 [reagent "0.6.0-alpha"]
                 [binaryage/dirac "0.3.0"]
                 [re-frame "0.7.0"]
                 [com.andrewmcveigh/cljs-time "0.4.0"]
                 [binaryage/devtools "0.6.1"]
                 [timothypratley/reanimated "0.1.4"]
                 [environ "1.0.2"]]

  :plugins [[lein-cljsbuild "1.1.3"]
            [lein-figwheel "0.5.2"]
            [lein-shell "0.5.0"]
            [lein-environ "1.0.2"]
            [lein-cooper "1.2.2"]]

  ;:prep-tasks ["javac" "compile" "shell" "echo"]

  :source-paths ["src/background"
                 "src/content_script"
                 "src/dev"
                 "src/figwheel"
                 "src/map"
                 "src/popup"]

  :clean-targets ^{:protect false} ["target"
                                    "resources/unpacked/compiled"
                                    "resources/release/compiled"]

  :cljsbuild {:builds {}}                                                                                                     ; prevent https://github.com/emezeske/lein-cljsbuild/issues/413

  :profiles {:unpacked
             {:cljsbuild {:builds
                          {:background
                           {:source-paths ["src/dev"
                                           "src/figwheel"
                                           "src/background"]
                            :compiler     {:output-to     "resources/unpacked/compiled/background/thesis.js"
                                           :output-dir    "resources/unpacked/compiled/background"
                                           :asset-path    "compiled/background"
                                           :optimizations :none
                                           :source-map    true}}
                           :map
                           {:source-paths ["src/dev"
                                           "src/figwheel"
                                           "src/map"]
                            :compiler     {:output-to     "resources/unpacked/compiled/map/thesis.js"
                                           :output-dir    "resources/unpacked/compiled/map"
                                           :asset-path    "compiled/map"
                                           :optimizations :none
                                           :source-map    true}}
                           :popup
                           {:source-paths ["src/dev"
                                           "src/figwheel"
                                           "src/popup"]
                            :compiler     {:output-to     "resources/unpacked/compiled/popup/thesis.js"
                                           :output-dir    "resources/unpacked/compiled/popup"
                                           :asset-path    "compiled/popup"
                                           :optimizations :none
                                           :source-map    true}}
                           :content-script
                           {:source-paths ["src/dev" "src/content_script"]
                            :notify-command ["./scripts/concat-content.sh"]
                            :compiler     {:output-to     "resources/unpacked/compiled/content_script/thesis.js"
                                           :output-dir    "resources/unpacked/compiled/content_script"
                                           :asset-path    "compiled/content_script"
                                           :main "thesis.content-script"
                                           :optimizations :none                                                         ; content scripts cannot do eval / load script dynamically
                                           :verbose true
                                           :parallel-build true
                                           :closure-output-charset "US-ASCII"
                                           ;:pretty-print false
                                           ;:cache-analysis true
                                           :source-map true}}}}}
                                           ; TODO This was initially along with optimizations :whitespace !
                                           ;:optimizations :whitespace 
                                           ;:source-map    "resources/unpacked/compiled/content_script/thesis.js.map"}}}}}
             :checkouts
             ; DON'T FORGET TO UPDATE scripts/ensure-checkouts.sh
             {:cljsbuild {:builds
                          {:background     {:source-paths ["checkouts/chromex/src/lib"
                                                           "checkouts/chromex/src/exts"]}
                           :map            {:source-paths ["checkouts/chromex/src/lib"
                                                           "checkouts/chromex/src/exts"]}
                           :popup          {:source-paths ["checkouts/chromex/src/lib"
                                                           "checkouts/chromex/src/exts"]}
                           :content-script {:source-paths ["checkouts/chromex/src/lib"
                                                           "checkouts/chromex/src/exts"]}}}}

             :figwheel
             {:figwheel {:server-port 6888
                         :repl false}}

             :dev-mode
             {:cooper {"content"  ["lein" "content"]
                       "figwheel" ["lein" "fig"]
                       "browser"  ["scripts/launch-test-browser.sh"]}}

             :repla
             {:repl-options {:port             8230
                             :nrepl-middleware [dirac.nrepl/middleware]
                             :init             (do
                                                 (require 'dirac.agent)
                                                 (dirac.agent/boot!))}}

             :release
             {:env       {:chromex-elide-verbose-logging "true"}
              :cljsbuild {:builds
                          {:background
                           {:source-paths ["src/background"]
                            :compiler     {:output-to     "resources/release/compiled/background.js"
                                           :output-dir    "resources/release/compiled/background"
                                           :asset-path    "compiled/background"
                                           :optimizations :advanced
                                           :elide-asserts true}}
                           :map
                           {:source-paths ["src/map"]
                            :compiler     {:output-to     "resources/release/compiled/map.js"
                                           :output-dir    "resources/release/compiled/map"
                                           :asset-path    "compiled/map"
                                           :optimizations :advanced
                                           :elide-asserts true}}
                           :popup
                           {:source-paths ["src/popup"]
                            :compiler     {:output-to     "resources/release/compiled/popup.js"
                                           :output-dir    "resources/release/compiled/popup"
                                           :asset-path    "compiled/popup"
                                           :optimizations :advanced
                                           :elide-asserts true}}
                           :content-script
                           {:source-paths ["src/content_script"]
                            :compiler     {:output-to     "resources/release/compiled/content_script.js"
                                           :output-dir    "resources/release/compiled/content_script"
                                           :asset-path    "compiled/content_script"
                                           :optimizations :advanced
                                           :elide-asserts true}}}}}}

  :aliases {"dev-build" ["with-profile" "+unpacked,+checkouts"
                         "cljsbuild" "once" "background" "popup" "map" "content-script"]
            "fig"       ["with-profile" "+unpacked,+figwheel,+checkouts"
                         "figwheel" "background" "popup" "map"]
            "content"   ["with-profile" "+unpacked,+checkouts"
                         "cljsbuild" "auto" "content-script"]
            "devel"     ["with-profile" "+dev-mode" "do"                                                                      ; for mac only
                         "shell" "scripts/ensure-checkouts.sh,"
                         "cooper"]
            "repla"     ["with-profile" "+base,+repla,+checkouts" "repl"]
            "release"   ["with-profile" "+release"
                         "do" "clean,"
                         "cljsbuild" "once" "background" "popup" "map" "content-script"]
            "package"   ["shell" "scripts/package.sh"]})
