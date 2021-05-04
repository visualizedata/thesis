// SHOWS ALL VIDEO

$('.video').click(function(){
      $("div[id=" + $(this).attr("data-related") + "]").toggleClass('show');
});

// $('.video').click(function(){
//       $(this).next('div').toggle();
// });



// FULL SCREEN
// var elem = document.getElementById("myvideo");
// if (elem.requestFullscreen) {
//   elem.requestFullscreen();
// } else if (elem.mozRequestFullScreen) {
//   elem.mozRequestFullScreen();
// } else if (elem.webkitRequestFullscreen) {
//   elem.webkitRequestFullscreen();
// } else if (elem.msRequestFullscreen) { 
//   elem.msRequestFullscreen();
// }