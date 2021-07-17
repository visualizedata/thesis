// SHOWING PREVIEWS
document.querySelectorAll(".showmore").forEach(function (p) {
    p.querySelector("a").addEventListener("click", function () {
      p.classList.toggle("show");
      this.textContent = p.classList.contains("show") ? "Show Less" : "Show More";
    });
});

// SHOWS ALL VIDEO
$('.video').click(function(){
      $("div[id=" + $(this).attr("data-related") + "]").toggleClass('play');
});

// CLOSE VIDEO BUTTON
$('.close').click(function(){
      $("div[id=" + $(this).attr("id") + "]").toggleClass('pause').stopVideo();
});

// CLICK TO PAUSE
const videoPlayer = document.querySelector(".videoPlayer");
const video = videoPlayer.querySelector(".vidPlayer");	
	if (video != null) videoPlayer.querySelector(".vidPlayer");

video.pause();

// ANOTHER SHOW METHOD
// var videoPlayer = document.querySelector(".videoPlayer");
// 	if (videoPlayer != null) video.setAttribute('style', 'display:flex;');
// 		var video = parentElement.querySelector('.vidPlayer');
// 		show.setAttribute('style', 'display:none;');

