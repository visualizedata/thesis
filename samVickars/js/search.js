var category = "All Categories";
var haystack = [];
jQuery(document).ready(function($) {
  updateHaystack(category);
  var resizing = false,
    navigationWrapper = $('.cd-main-nav-wrapper'),
    navigation = navigationWrapper.children('.cd-main-nav'),
    searchForm = $('.cd-main-search'),
    pageContent = $('.cd-main-content'),
    searchTrigger = $('.cd-search-trigger'),
    coverLayer = $('.cd-cover-layer'),
    navigationTrigger = $('.cd-nav-trigger'),
    mainHeader = $('.cd-main-header'),
    suggestions = $('.cd-search-suggestions'),
    creditsCover = $('.credits-overlay'),
    creditsTrigger = $('.credits-trigger'),
    creditsCloseTrigger = $('.credits-exit');


  function checkWindowWidth() {
    var mq = window.getComputedStyle(mainHeader.get(0), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
    return mq;
  }

  function checkResize() {
    if (!resizing) {
      resizing = true;
      (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300): window.requestAnimationFrame(moveNavigation);
    }
  }

  function moveNavigation() {
    var screenSize = checkWindowWidth();
    if (screenSize == 'desktop' && (navigationTrigger.siblings('.cd-main-search').length == 0)) {
      //desktop screen - insert navigation and search form inside <header>
      searchForm.detach().insertBefore(navigationTrigger);
      navigationWrapper.detach().insertBefore(searchForm).find('.cd-serch-wrapper').remove();
    } else if (screenSize == 'mobile' && !(mainHeader.children('.cd-main-nav-wrapper').length == 0)) {
      //mobile screen - move navigation and search form after .cd-main-content element
      navigationWrapper.detach().insertAfter('.cd-main-content');
      var newListItem = $('<li class="cd-serch-wrapper"></li>');
      searchForm.detach().appendTo(newListItem);
      newListItem.appendTo(navigation);
    }

    resizing = false;
  }

  function closeSearchForm() {
    searchTrigger.removeClass('search-form-visible');
    searchForm.removeClass('is-visible');
    coverLayer.removeClass('search-form-visible');
    $('.cd-search-suggestions').removeClass('cd-search-suggestionsVisible');
    $('.cd-search-suggestions').addClass('cd-search-suggestionsInvisible');
    $('.newLinks').removeClass('newLinksVisible');
  }

  //add the .no-pointerevents class to the <html> if browser doesn't support pointer-events property
  (!Modernizr.testProp('pointerEvents')) && $('html').addClass('no-pointerevents');

  //move navigation and search form elements according to window width
  moveNavigation();
  $(window).on('resize', checkResize);

  // //mobile version - open/close navigation
  // navigationTrigger.on('click', function(event) {
  //   event.preventDefault();
  //   mainHeader.add(navigation).add(pageContent).toggleClass('nav-is-visible');
  // });

  searchTrigger.on('click', function(event) {
    event.preventDefault();
    if (searchTrigger.hasClass('search-form-visible')) {
      searchForm.find('form').submit();
    } else {
      $('.cd-main-header').addClass('cd-main-header-open');
      $('.newLinks').addClass('newLinksVisible');
      searchTrigger.addClass('search-form-visible');
      coverLayer.addClass('search-form-visible');
      searchForm.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        searchForm.find('input[type="search"]').focus().end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      });
    }
  });

  creditsTrigger.on('click', function(event) {
    event.preventDefault();
    creditsCover.addClass('credits-overlay-visible');
    coverLayer.addClass('search-form-visible');
  })

  creditsCloseTrigger.on('click', function(event) {
    closeSearchForm();
    creditsCover.removeClass('credits-overlay-visible');
    coverLayer.removeClass('search-form-visible')
  })

  //close search form
  searchForm.on('click', '.close', function() {
    closeSearchForm();
    $('.cd-main-header').removeClass('cd-main-header-open');
    $('.cd-search-suggestions').removeClass('cd-search-suggestionsVisible');
    $('.cd-search-suggestions').addClass('cd-search-suggestionsInvisible');
    $('.newLinks').removeClass('newLinksVisible');
  });

  coverLayer.on('click', function() {
    closeSearchForm();
    creditsCover.removeClass('credits-overlay-visible');
    $('.cd-search-suggestions').removeClass('cd-search-suggestionsVisible');
    $('.cd-search-suggestions').addClass('cd-search-suggestionsInvisible');
    $('.newLinks').removeClass('newLinksVisible');
  });

  $(document).keyup(function(event) {
    if (event.which == '27') closeSearchForm();
  });

  // upadate span.selected-value text when user selects a new option
  searchForm.on('change', 'select', function() {
    searchForm.find('.selected-value').text($(this).children('option:selected').text());
    category = $(this).children('option:selected').text();
    updateHaystack(category);
  });

  searchForm.keyup(function() {
    var value = $(this).find('input').val();
    runSearch(value)
    $('.newLinks').removeClass('newLinksVisible');
  });
});

function updateHaystack(category) {
  haystack = [];
  d3.json("js/data/search_terms.json", function(terms) {
    if (category === "Stories") {
      terms = terms.filter(function(d) {
        return ((d.type === "story"));
      });
    } else {
      if (category === "Schools") {
        terms = terms.filter(function(d) {
          return ((d.type === "school"));
        });
      } else {
        if (category === "Reservations") {
          terms = terms.filter(function(d) {
            return ((d.type === "reservation"));
          });
        }
      }
    }
    for (var i = 0; i < terms.length; i++) {
      haystack.push(terms[i]);
    }
  })
}


function runSearch(term) {
  var suggestionBox = $('.cd-search-suggestions'),
    o1 = $('.o1'),
    o2 = $('.o2'),
    o3 = $('.o3'),
    o1A = $('.o1A'),
    o2A = $('.o2A'),
    o3A = $('.o3A'),
    o1h = $('.o1h'),
    o2h = $('.o2h'),
    o3h = $('.o3h'),
    o1Sh = $('.o1Sh'),
    o2Sh = $('.o2Sh'),
    o3Sh = $('.o3Sh'),
    o1I = $('.o1I'),
    o2I = $('.o2I'),
    o3I = $('.o3I'),
    o1Info = $('.o1Info'),
    o2Info = $('.o2Info'),
    o3Info = $('.o3Info');

  suggestionBox.removeClass('cd-search-suggestionsInvisible');
  suggestionBox.addClass('cd-search-suggestionsVisible');

  var options = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      "name",
      "location"
    ]
  };
  var fuse = new Fuse(haystack, options); // "list" is the item array
  var result = fuse.search(term);

  var o1image,
    o2image,
    o3image;

  if (result[0].type === "school" && result[0].photo === "TRUE") {
    o1image = "images/schoolPhotos/" + result[0].id + ".jpg";
  } else {
    if (result[0].type === "story" && result[0].photo === "TRUE") {
      o1image = "js/data/stories/images/" + result[0].id + ".png";
    }
  };

  if (result[1].type === "school" && result[1].photo === "TRUE") {
    o2image = "images/schoolPhotos/" + result[1].id + ".jpg";
  } else {
    if (result[1].type === "story" && result[1].photo === "TRUE") {
      o2image = "js/data/stories/images/" + result[1].id + ".png";
    }
  }

  if (result[2].type === "school" && result[2].photo === "TRUE") {
    o3image = "images/schoolPhotos/" + result[2].id + ".jpg";
  } else {
    if (result[2].type === "story" && result[2].photo === "TRUE") {
      o3image = "js/data/stories/images/" + result[2].id + ".png";
    }
  };

  var a1 = [result[0].id, result[0].name, result[0].type, result[0].lat, result[0].lng],
    a2 = [result[1].id, result[1].name, result[1].type, result[1].lat, result[1].lng],
    a3 = [result[2].id, result[2].name, result[2].type, result[2].lat, result[2].lng];

  o1h.text(result[0].name);
  o1Sh.text(result[0].type.replace("story", "Residential School Survivor").replace("school", "Residential School").replace("reservation", "Reserve/Band/Tribe"));
  o1I.html("<div class='oI' style='background-image: url(" + o1image + ")'></div>");
  o1Info.text(result[0].location);
  o1A.text(a1)

  o2h.text(result[1].name);
  o2Sh.text(result[1].type.replace("story", "Residential School Survivor").replace("school", "Residential School").replace("reservation", "Reserve/Band/Tribe"));
  o2I.html("<div class='oI' style='background-image: url(" + o2image + ")'></div>");
  o2Info.text(result[1].location);
  o2A.text(a2)

  o3h.text(result[2].name);
  o3Sh.text(result[2].type.replace("story", "Residential School Survivor").replace("school", "Residential School").replace("reservation", "Reserve/Band/Tribe"));
  o3I.html("<div class='oI' style='background-image: url(" + o3image + ")'></div>");
  o3Info.text(result[2].location);
  o3A.text(a3)


}

$('.o1').on("click", function(event) {
  var array = $(this).find(".oA").text().split(",");
  var id = array[0],
    name = array[1],
    type = array[2],
    lat = array[3],
    lng = array[4];

  optionClick(id, name, type, lat, lng)
})

$('.o2').on("click", function(event) {
  var array = $(this).find(".oA").text().split(",");
  var id = array[0],
    name = array[1],
    type = array[2],
    lat = array[3],
    lng = array[4];

  optionClick(id, name, type, lat, lng)
})

$('.o3').on("click", function(event) {
  var array = $(this).find(".oA").text().split(",");
  var id = array[0],
    name = array[1],
    type = array[2],
    lat = array[3],
    lng = array[4];

  optionClick(id, name, type, lat, lng)
})

function optionClick(id, name, type, lat, lng) {
  if (type === "story") {
    drawStory(id);
    pageSix(name);
    var section = document.getElementById("p5");
    zenscroll.to(section);
  } else {
    if (mapStatus === "none" || mapStatus === "zoomedIn") {
      map.flyTo({
        center: [lng, lat],
        zoom: 10,
        bearing: 0,
        speed: 100,
        curve: 1,

        easing: function(t) {
          return t;
        }
      });
      if (type === "school") {
        sSearch(id);
      } else {
        rSearch(id);
      }
      var section = document.getElementById("p6");
      zenscroll.to(section);
    } else {
      if (mapStatus === "zoomedOut") {
        if (type === "school") {
          sSearch(id);
        } else {
          rSearch(id);
        }
        var section = document.getElementById("tMap1_reserves");
        zenscroll.to(section);
      } else {
        if (mapStatus === "reserves") {
          if (type === "school") {
            sSearch(id);
          } else {
            rSearch(id);
          }
          var section = document.getElementById("tMap1_connections");
          zenscroll.to(section);
        } else {
          if (mapStatus === "connections") {
            if (type === "school") {
              sSearch(id);
            } else {
              rSearch(id);
            }
            var section = document.getElementById("tMap1_connections");
            zenscroll.to(section);
          }
        }
      }
    }
  }
}

function rSearch(id) {
  // remove reserveDot class from current dot and dim all school dots, except current
  d3.selectAll(".rDot").style("opacity", ".025").style("fill", "#333");
  d3.select("#rDot-" + id).style("opacity", ".75").style("fill", orange);
  d3.selectAll(".rTooltip").style("opacity", "0");
  d3.selectAll(".dot").style("opacity", ".25").style("fill", orange);
  d3.selectAll(".conn").style("opacity", ".05");
  d3.selectAll(".sTooltip").style("opacity", 0);
  d3.selectAll(".sTooltipB").style("opacity", 0);
  d3.selectAll(".sTooltip2").style("opacity", 0);
  d3.selectAll(".sTooltip2B").style("opacity", 0);
  d3.selectAll("#sTip-" + id).style("opacity", 0);

  // d3.selectAll(".reserveDot").style("display", "block").transition().duration(600).ease(d3.easeLinear).style("opacity", 0.1);
  d3.select("#l2").transition().duration(500).ease(d3.easeLinear).style("opacity", .75);
  d3.select(".legendIn-bottom").transition().delay(500).duration(500).ease(d3.easeLinear).style("opacity", .75);
  d3.selectAll("#rTip-" + id).style("opacity", 0);

  // turn on school tooltip for current dot
  if (mapStatus === "zoomedIn" || mapStatus === "none") {
    d3.selectAll("#rTip-" + id).style("opacity", 0);
  } else {
    d3.selectAll("#rTip-" + id).style("opacity", 1);
  };
}

function sSearch(id) {
  // remove reserveDot class from current dot and dim all school dots, except current
  d3.selectAll(".dot").style("opacity", ".25").style("fill", orange);
  d3.select("#dot-" + id).style("opacity", 1).style("fill", "#333");
  d3.selectAll(".sTooltip").style("opacity", 0);
  d3.selectAll(".sTooltipB").style("opacity", 0);
  d3.selectAll(".sTooltip2").style("opacity", 0);
  d3.selectAll(".sTooltip2B").style("opacity", 0);
  d3.selectAll(".rDot").style("opacity", ".025").style("fill", "#333");
  d3.selectAll(".rTooltip").style("opacity", "0")
  d3.selectAll(".conn").style("opacity", ".05");
  d3.selectAll("#sTip-" + id).style("opacity", 0);
  d3.selectAll("#rTip-" + id).style("opacity", 0);
  if (mapStatus === "zoomedIn" || mapStatus === "none") {
    d3.selectAll("#sTip-" + id).style("opacity", 0);
  } else {
    d3.selectAll("#sTip-" + id).style("opacity", 1);
  }
}
