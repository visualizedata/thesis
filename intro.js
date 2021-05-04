// SHOWING PREVIEWS
document.querySelectorAll(".showmore").forEach(function (p) {
    p.querySelector("a").addEventListener("click", function () {
      p.classList.toggle("show");
      this.textContent = p.classList.contains("show") ? "Show Less" : "Show More";
    });
});

// SHOWS ALL VIDEO
$('.video').click(function(){
      $("div[id=" + $(this).attr("data-related") + "]").toggleClass('show');
});

// CLOSE VIDEO BUTTON
$('.close').click(function(){
      $("div[id=" + $(this).attr("id") + "]").toggleClass('hide');
});

// CLICK TO PAUSE
const videoPlayer = document.querySelector(".videoPlayer");
const video = videoPlayer.querySelector("video");
video.pause();

