var usePreview = true;

    $(document).ready(function() {

      // images
      $("div .project").each(function() {
        if ($(this).attr('src') != undefined && $(this).attr('videolink') != '') {
          // console.log($(this).attr('videolink'));
          var video = "<table width='100%'><tr><td><button onclick='playVideo(\"" + $(this).attr('videolink') + "\")'> <a href=\"" + $(this).attr('github-src') + "\"><img data-toggle='GitHub' title='Source' src=\"web/img/GitHub.png\" style=\"margin-top:12px;width:13px\"> GITHUB</a></td>";
          video += "<td align='right'><button class='download' onclick='window.location.assign(\"" + $(this).attr('videolink') + "\")'><i class='fa fa-download' style='font-size:`16px'></i> DOWNLOAD VIDEO</button></td></tr></table>";
          $(this).append(video);
        }

      //   if ($(this).attr('href') != undefined) {

      //     // scale
      //     var str = "";
      //     str += "<a href='#top'><span class='pull-right glyphicon glyphicon-chevron-up' data-toggle='tooltip' data-placement='left' title='top'></span></a>";
      //     $(this).append(str);

      //     // create text field to copy from
      //     var iframe = "<input id='embed' type='text' class='collapse pull-right btn btn-default col-md-12' value='" +
      //       $(this).find("p").html() +
      //       "<iframe width=\"100%\" height=\"100%\" src=\"" + window.location.href + "/." + $(this).attr('href') + "\"></iframe>" +
      //       "<a href=\"https://visualizedata.github.io/undp/\"><img style=\"width:200px !important\" src=\"" + window.location.href + "/../" + "web/img/ParsonsDataVisualization.png" + "\"></a>" +
      //       "'>";
      //     if ($(this).find("input").length == 0) {
      //       $(this).append(iframe);
      //     }

      //     // add preview image when available
      //     if (usePreview) {
      //       $(this).append("<img data-toggle='tooltip' data-placement='left' title='launch project' width=\"100%\" src='" + $(this).attr('img-src') + "' target='_blank' onClick='window.open(\"" + $(this).attr('href') + "\")'>");
      //       $(this).find("img").error(function() {
      //         $(this).parent().append("<iframe width='100%' height='100%' src='" + $(this).parent().attr('href') +
      //           "' frameborder='0' allowfullscreen></iframe>");
      //         $(this).parent().find("img").remove();
      //         $(this).parent().find(".title").remove();
      //       });

      //     }
      //     else {
      //       $(this).append("<iframe width='100%' height='566' src='" + $(this).attr('href') + "'></iframe>");
      //     }
      //   }
      // });

      // index
      // $("h3").each(function(i) {
      //   if (!$(this).hasClass("no-touch")) {
      //     $("#index").append("<li><a href='#" + i + "'>" +
      //       "<span class='glyphicon glyphicon-chevron-down'></span>  &nbsp;" +
      //       $(this).text() + "</a><li>");
      //     $(this).prepend("<a id='" + i + "'>");
      //    }
      //   else {
      //     $("#index").append("<li class='no-touch'><a href='#" + i + "'>" +
      //       "<span class='glyphicon glyphicon-chevron-down'></span>  &nbsp;" +
      //       $(this).text() + "</a><li>");
      //     $(this).prepend("<a id='" + i + "'>");
      //   }
      // });

      // check for touch screens
      // var hasTouch = window.matchMedia('(pointer: coarse)').matches;
      // if (hasTouch) {
      //   $(".no-touch").hide();
      // }

      // activate tooltip
    //   $('[data-toggle="tooltip"]').tooltip();

    //   if (window.location.href.indexOf('?preview') >= 0)
    //     $( "div#cover:visible" ).css( "display", "inline" ).fadeIn( "slow" );

    //   if( (new Date().getTime() < new Date('May 13, 2020 18:30:00').getTime()))
    //   {
    //     $( "div#cover" ).css('visibility', 'visible');
    //   }

    //   $(window).scroll(function(){
    //         $( "div#cover:visible" ).css( "display", "inline" ).fadeOut( "slow" );
    //     });
    // });

    function playVideo(url) {
      var localDownloadPath = 'web/assets';
      var player = document.getElementById("videoPlayer");
      var videoSource = document.getElementById('videoSource');
      var localSource = document.getElementById('localSource');

      player.pause();

      videoSource.src = url;

      var file = url.replace(/^.*[\\\/]/, '');
      console.log('video url', file);
      var person = $("div").find(`[videolink='${url}']`).prev().attr('id');
      console.log('person', person);

      localSource.src = localDownloadPath + '/' + person + '/' + '/' + file;

      player.load();
      player.play();

      if (player.requestFullscreen) {
        player.requestFullscreen();
      }
    }

    });