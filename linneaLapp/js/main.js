/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	
	/*	An array to store all the data */
	var items = [];
	/*	News Section Colours */
	var colourPurple =	["#DABDD8","#95177E","#B570A7","#651E59","#461E47"];
	var colourYellow =	["#FED162","#F8B436","#F29500","#D37510","#AF6A17"];
	var colourRed =		["#EE8361","#EB6B4B","#E85338","#E53524","#A8131D"];
	var colourBlue =	["#84D0F0","#3BAADC","#006DB2","#2C3387","#152760"];
	var colourGreen =	["#E1DC00","#96BE17","#45A72C","#00892F","#00642D"];

	/*	Typography */
	var colourText =	["#363636","#707070","#006699","#5C7996","#222222","#EEEEEE","#F5821F","#C4C4C4"];

	/*	Border Colours */
	var colourBorder =	["#999999","#E7E7E7","#C7C8CC","#B7B7B7","#D4D4D4","#CCCCCC","#006699","#C4C4C4"];
	  
	/*	Background Colours */
	var colourBackground =	["#006699","#2C2C2C","#E1E4E9","#ECECEC","#5E5E5E","#F9F9F9","#F0F1F3"];


	var init = function(){
		console.log('Initializing app.');

		$.ajax({
				// url: "http://codepen.io/chris-creditdesign/pen/87c2848937b6962f4efd2a67e5ea2031.html",
				url: "data/timeline.html", 
				dataType: 'text',
				success: function(data) {

						/* Helper function to format and parse date from data */
						function getDate(d) {
								/*	If d is a number or a string in the format Day Month Year
						process it as normal. Other wise presume that it may be a string 
						in the format Month Year and add 1 to the start so that Firefox
						and safari can parse the date */
								if (typeof d === "number") {
										return new Date(d);
								} else if (Date.parse(d)) {
										return new Date(d);
								} else {
										return new Date("1 " + d);
								}
						}

						var fullData = $(data);
						var table = $(data).find("table tbody tr");

						/* Grab the tables headline and caption so that we can reproduce them in the widget */
						var headline = $(fullData).find("h2.table-heading").text();

						var standfirst = $(data).find("table caption p").text();

						/* Hides the table and shows the SVG if javascript is enabled */
						// $("h2:contains('Dogs at work')").parent("section").parent("div").css({"display":"none"});
						// $("h2:contains('Dogs at work') + table").css({"width":"630px"});
						$(".outerwrapper span.timeline-heading").text(headline);
						$(".outerwrapper p.timeline-standfirst").text(standfirst);
						// $(".outerwrapper").css({"display":"block"});

						/*	Push an object into the items array for each table row/point on the timeline */
						for (var i = 0; i < $(table).length; i++) {
								var newObject = {};
								items.push(newObject);
						};

						/*	Add a prorerty to the objects for each column in the table/bit of info we want to show
					i.e date, headline, the text, image link and credit */
						for (var i = 0; i < $(table).length; i++) {
								var dateStart = $(table).eq(i).children('td').eq(0).html();
								var dateEnd;

								if ($(table).eq(i).children('td').eq(1).html() === " ") {
										dateEnd = $(table).eq(i).children('td').eq(0).html();
								} else {
										dateEnd = $(table).eq(i).children('td').eq(1).html();
								}

								items[i].dateStart = dateStart;
								items[i].dateEnd = dateEnd;
								items[i].date1 = getDate(dateStart);
								items[i].date2 = getDate(dateEnd);

								if ($(table).eq(i).children('td').eq(2).html() !== " ") {
										items[i].headline = $(table).eq(i).children('td').eq(2).html();
								}

								if ($(table).eq(i).children('td').eq(3).html() !== " ") {
										items[i].text = $(table).eq(i).children('td').eq(3).html();
								}

								if ($(table).eq(i).children('td').eq(4).html() !== " ") {
										items[i].link = $(table).eq(i).children('td').eq(4).html();
								}

								if ($(table).eq(i).children('td').eq(5).html() !== " ") {
										items[i].img = $(table).eq(i).children('td').eq(5).html();
										items[i].credit = $(table).eq(i).children('td').eq(6).html();
								}
						};
						console.log(items);

						/*	Insert an .event div for each event */
						for (var i = 0; i < items.length; i++) {
								$(".outerwrapper .info-box .panel").append('<div class="event-' + i + '"></div>');
						};

						for (var i = 0; i < $('.outerwrapper div[class^="event"]').length; i++) {

								if (items[i].img) {
										$('.outerwrapper div[class="event-' + i + '"]')
												.append('<span class="timeline-img">' + items[i].img + '</span>');
								}

								if (items[i].date1 < items[i].date2) {
										$('.outerwrapper div[class="event-' + i + '"]')
												.append('<span class="date">' + items[i].dateStart + ' - ' + items[i].dateEnd + '</span>');
								} else {
										$('.outerwrapper div[class="event-' + i + '"]')
												.append('<span class="date">' + items[i].dateStart + '</span>');
								}

								if (items[i].headline) {
										$('.outerwrapper div[class="event-' + i + '"]')
												// .append('<h4>' + items[i].headline + ' (' + (i + 1) + ' of ' + items.length + ')</h4>');
												.append('<h4>' + items[i].headline + '</h4>');
								} else {
										$('.outerwrapper div[class="event-' + i + '"]')
												.append('<h4> (' + (i + 1) + ' of ' + items.length + ')</h4>');
								}

								if (items[i].text) {
										$('.outerwrapper div[class="event-' + i + '"]')
												.append('<p>' + items[i].text + '</p>');
								}

								if (items[i].link) {
										$('.outerwrapper div[class="event-' + i + '"]')
												.append('<p>' + items[i].link + '</p>');
								}

								if (items[i].img) {
										$('.outerwrapper div[class="event-' + i + '"]')
												.append('<p class="credit">PICTURE CREDIT: ' + items[i].credit + '</p>')
								}

						};

						var eventWidth = $('.outerwrapper .info-box').width();

						var position = 0;

						var panelWidth = eventWidth * items.length;

						$(".outerwrapper .info-box .panel").css({
								"width": panelWidth + "px"
						});

						/* Load D3 */
						/* All of the D3/svg code is contained within the callback function */
						/* Loading D3 via a html script tag into ie6-8 will to cause a runtime error */
						$.getScript("http://d3js.org/d3.v3.min.js", function() {
								// $.getScript("http://d3js.org/d3.v3.min.js", function() {
								/*	Define the dimensions of the SVG */
								var duration = 300;
								var marginTop = 5;
								var marginRight = 0;
								var marginBottom = 40;
								var marginLeft = 0;
								var padding = 2;
								var width = 1140 - marginRight - marginLeft;
								var height = 200 - marginTop - marginBottom;
								var miniHeight = 55;
								var mainHeight = height - miniHeight - 50;

								var zoom = 1;
								var maxZoom = 10;
								var zoomIncrement = 1;

								/*	A global variable to control which event/location to show */
								var counter = 0;

								/*	A global variable to control the amout of ticks visible */
								var ticks = 8;

								/*	Find the earliest and latest time in the range */
								var timeFirst = d3.min(items, function(d) {
										return d.date1;
								});
								var timeLast = d3.max(items, function(d) {
										return d.date2;
								});

								/*	Work out the time span of the whole timeline in miliseconds plus one tenth of this value */
								var timeDiff = timeLast - timeFirst;
								timeDiff = timeDiff + (timeDiff * 0.1);

								/*	Extend the time range before the first date and after the last date 
						to make for a more attractive timeline */
								var timeBegin = getDate(items[counter].date1.getTime() - timeDiff);
								var timeEnd = getDate(items[counter].date1.getTime() + timeDiff);

								/* Scales */
								var x = d3.time.scale()
										.domain([timeBegin, timeEnd])
										.range([0, width]);

								/*	Create the SVG and its elements */
								var chart = d3.select(".timeline")
										.append("svg")
										.attr("width", width + marginRight + marginLeft)
										// .attr("height", height + marginTop + marginBottom)
										.attr("height", height)
										.attr("class", "chart");

								/*	Draw the four icons for zooming and moving through the time line as well as their enclosing
						rects. Add functionality for hover and click. */
								var zoomInIcon = chart.append("path")
										.attr("d", "M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM15.687,9.051h-4v2.833H8.854v4.001h2.833v2.833h4v-2.834h2.832v-3.999h-2.833V9.051z")
										// .style("pointer-events", "none")
										.style("opacity", 0.5)
										.attr("transform", "translate(125,0)")
										.style("cursor", "pointer")
										.on("click", function(e) {
												if (zoom < maxZoom) {
														zoom += zoomIncrement;
														showLocation();
												};
												d3.event.preventDefault();
												return false;
										})
										.on("mouseover", function() {
												if (zoom < maxZoom) {
														d3.select(this).transition()
																.duration(duration)
																.style("opacity", 1);
												};
										})
										.on("mouseout", function() {
												d3.select(this).transition()
														.duration(duration)
														.style("opacity", 0.5);
										});

								var zoomOutIcon = chart.append("path")
										.attr("d", "M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM8.854,11.884v4.001l9.665-0.001v-3.999L8.854,11.884z")
										// .style("pointer-events", "none")
										.attr("transform", "translate(175,0)")
										.style("opacity", 0.5)
										.style("cursor", "pointer")
										.on("click", function(e) {
												if (zoom > 1) {
														zoom -= zoomIncrement;
														showLocation();
												};

												d3.event.preventDefault();
												return false;
										})
										.on("mouseover", function() {
												if (zoom > 1) {
														d3.select(this).transition()
																.duration(duration)
																.style("opacity", 1);
												};

										})
										.on("mouseout", function() {
												d3.select(this).transition()
														.duration(duration)
														.style("opacity", 0.5);
										});

								var leftIcon = chart.append("path")
										.attr("d", "M20.834,8.037L9.641,14.5c-1.43,0.824-1.43,2.175,0,3l11.193,6.463c1.429,0.826,2.598,0.15,2.598-1.5V9.537C23.432,7.887,22.263,7.211,20.834,8.037z")
										// .style("pointer-events", "none")
										// .attr("transform", "translate(0,0), scale(1.5)"),
										.style("opacity", 0.5)
										.attr("transform", "translate(0,0)")
										.style("cursor", "pointer")
										.on("click", function(e) {
												if (counter > 0) {
														counter -= 1;
												};

												showLocation();
												d3.event.preventDefault();
												return false;
										})
										.on("mouseover", function() {

												if (counter > 0) {
														d3.select(this).transition()
																.duration(duration)
																.style("opacity", 1);
												};
										})
										.on("mouseout", function() {
												d3.select(this).transition()
														.duration(duration)
														.style("opacity", 0.5);
										});

								var rightIcon = chart.append("path")
										.attr("d", "M11.166,23.963L22.359,17.5c1.43-0.824,1.43-2.175,0-3L11.166,8.037c-1.429-0.826-2.598-0.15-2.598,1.5v12.926C8.568,24.113,9.737,24.789,11.166,23.963z")
										// .style("pointer-events", "none")
										// .attr("transform", "translate(50,0), scale(1.5)");
										.style("opacity", 0.5)
										.attr("transform", "translate(50,0)")
										.style("cursor", "pointer")
										.on("click", function(e) {
												if (counter < (items.length - 1)) {
														counter += 1;
												};

												showLocation();
												d3.event.preventDefault();
												return false;
										})
										.on("mouseover", function() {

												if (counter < (items.length - 1)) {
														d3.select(this).transition()
																.duration(duration)
																.style("opacity", 1);
												};

										})
										.on("mouseout", function() {
												d3.select(this).transition()
														.duration(duration)
														.style("opacity", 0.5);
										});

								/*	Prepare a cliping path to stop the locations and scales breaking spilling over the edges
						of the SVG in IE */
								chart.append("defs").append("clipPath")
										.attr("id", "clip")
										.append("rect")
										.attr("x", 0)
										.attr("y", 0)
										.attr("width", width)
										.attr("height", height + marginTop + marginBottom);

								chart.append("g")
										.append("rect")
										.attr("x", 0)
										.attr("y", (height - miniHeight))
										.attr("width", width)
										.attr("height", miniHeight)
										.attr("fill", colourBackground[2])
										.style("opacity", 0.5);

								var miniHolder = chart.append("g")
										.attr("clip-path", "url(#clip)");

								var mini = miniHolder.append("g")
										.attr("width", width)
										.attr("height", miniHeight)
										.attr("class", "mini")
										.attr("transform", "translate(0," + (height - miniHeight) + ")")

								/* create three seperate x axis for Year, Month and Day based on the same x scale */
								var xYearAxis = d3.svg.axis()
										.scale(x)
										.tickSize(15, 0)
										.ticks(d3.time.years, 1)
										.tickFormat(d3.time.format('%Y'))
										.orient('top');

								var yearAxis = mini.append('g')
										.attr('class', 'year-axis')
										.call(xYearAxis);

								var xMonthAxis = d3.svg.axis()
										.scale(x)
										.tickSize(-miniHeight, 0)
										.orient('top');

								var monthAxis = mini.append('g')
										.attr('class', 'axis')
										.call(xMonthAxis);

								var xDayAxis = d3.svg.axis()
										.scale(x)
										.tickSize(10, 0)
										.tickFormat(function(d) {
												return '';
										})
										.orient('bottom');

								var dayAxis = mini.append('g')
										.attr('class', 'axis')
										.attr("transform", "translate(0," + (miniHeight - 10) + ")")
										.call(xDayAxis);

								/* draw the static triangle to act as a pointer */
								chart.append("path")
										.attr("d", "M10,0 L20,20 L0,20z")
										.style("fill", colourBorder[0])
										.style("pointer-events", "none")
										.attr("transform", "translate(" + ((width / 2) - 10) + "," + height + ")");

								/* 	Add rect for each point on the timeline */
								var locations = mini.append("g").selectAll("rect")
										.data(items)
										.enter()
										.append("rect")
										.attr("class", function(d, i) {
												if (i === counter) {
														return "locations selected";
												} else {
														return "locations";
												};
										})
										.attr("x", function(d, i) {
												return x(d.date1);
										})
										.attr("y", function(d, i) {
												/*	Work out if the first date of the current range overlaps the last date of the previous
								if so move the current rect down so that there is no overlap*/
												var prev = 0;

												if (i > 0) {
														prev = i - 1;
												}

												if (i === 0) {
														return 0;
												} else if (items[prev].date2 < items[i].date1) {
														return 0;
												} else {
														return (miniHeight - 10) / 2;
												}
										})
										.attr("width", function(d) {
												if (d.date1 < d.date2) {
														/* 	decide the width of the rect based on the range of dates */
														return x(d.date2) - x(d.date1);
												} else {
														/* 	if no end date is specified add 86,400,000 milliseconds (1 day) to the first
									date to create a span of time for the width
									but make sure that it is at least 4 px wide */
														var thisWidth = x(getDate(d.date1.getTime() + 86400000)) - x(d.date1);

														if (thisWidth < 4) {
																return 4;
														} else {
																return thisWidth;
														}
												}
										})
										.attr("height", function(d, i) {
												/*	Work out if the first date of the current range overlaps the last date of the previous
								if so half the height of the block to accomadate */
												var prev = 0;
												var next;

												if (i > 0) {
														prev = i - 1;
												}

												if (i < items.length - 1) {
														next = i + 1
												} else {
														next = items.length - 1;
												}

												if (prev > 0) {
														if (items[i].date2 > items[next].date1) {
																return (miniHeight - 10) / 2;
														} else if (items[prev].date2 > items[i].date1) {
																return (miniHeight - 10) / 2;
														} else {
																return (miniHeight - 10);
														}
												} else {
														return (miniHeight - 10);
												}

										})
										.on("mouseover", function(d, i) {

												if (d.date1 < d.date2) {
														d3.select(".outerwrapper .timeline .tooltip")
																.html("<p>" + d.dateStart + " - <br />" + d.dateEnd + "</p>");
												} else {
														d3.select(".outerwrapper .timeline .tooltip")
																.html("<p>" + d.dateStart + "</p>");
												}

												var eventLeft = parseInt(d3.select(this).attr("x"));
												var eventWidth = parseInt(d3.select(this).attr("width"));

												var eventTop = parseInt(d3.select(this).attr("y"));

												var tooltipHeight = parseInt($(".outerwrapper .timeline .tooltip").css("height"));

												$(".outerwrapper .timeline .tooltip")
														.css({
																"left": 120 + eventLeft + (eventWidth / 2) + "px",
																"top": 455 - (tooltipHeight - eventTop) + "px"
														});

												$(".outerwrapper .timeline .tooltip").css({
														"opacity": 1,
														"display": "block"
												});

										})
										.on("mouseout", function() {
												$(".outerwrapper .timeline .tooltip").css({
														"opacity": 0,
														"display": "none"
												});
										})
										.on("click", function(d, i) {
												counter = i;

												showLocation();

												$(".outerwrapper .timeline .tooltip").css({
														"opacity": 0,
														"display": "none"
												});

												d3.event.preventDefault();
												return false;
										})

								/*	Function to add the info for the next selected location
						Adds the relevent content to info-box and provides a new value for xPosition
						to center the timeline on the selected location*/
								function showLocation() {

										position = eventWidth * counter;

										$('.outerwrapper .info-box').animate({
												scrollLeft: position
										}, duration);

										/*	Recalculate the start and end point of the time range based upon
							the current location and the zoom level */
										timeBegin = getDate(items[counter].date1.getTime() - (timeDiff / zoom));
										timeEnd = getDate(items[counter].date1.getTime() + (timeDiff / zoom));

										/*	Replace the values used in the x domain */
										x.domain([timeBegin, timeEnd]);

										/*	Adjust the ticks for each x axis depening on the time range */
										/* ticks for than 5 years, 157,788,000,000 milliseconds */
										if ((timeEnd - timeBegin) > 157788000000) {
												xMonthAxis.ticks(d3.time.years, 1).tickFormat(function(d) {
														return '';
												});
												xDayAxis.ticks(d3.time.years, 1);
										}
										/* ticks for than a year, 31,557,600,000 milliseconds */
										else if ((timeEnd - timeBegin) > 31557600000) {
												xMonthAxis.ticks(d3.time.months, 3).tickFormat(d3.time.format('%d %b'));
												xDayAxis.ticks(d3.time.months, 1);
										}
										/* ticks for than six months 31,557,600,000 milliseconds divided by 2 */
										else if ((timeEnd - timeBegin) > 15778800000) {
												xMonthAxis.ticks(d3.time.months, 1).tickFormat(d3.time.format('%d %b'));
												xDayAxis.ticks(d3.time.weeks, 1);
										}
										/* ticks for than two months 31,557,600,000 milliseconds divided by 6 */
										else if ((timeEnd - timeBegin) > 5259600000) {
												xMonthAxis.ticks(d3.time.months, 1).tickFormat(d3.time.format('%d %b'));
												xDayAxis.ticks(d3.time.days, 1);
										}
										/* ticks for than a month 31,557,600,000 milliseconds divided by 12 */
										else if ((timeEnd - timeBegin) > 2629800000) {
												xMonthAxis.ticks(d3.time.weeks, 1).tickFormat(d3.time.format('%d %b'));
												xDayAxis.ticks(d3.time.days, 1);
										}
										/* ticks for a day */
										else {
												xMonthAxis.ticks(d3.time.days, 4).tickFormat(d3.time.format('%d %b'));
												xDayAxis.ticks(d3.time.days, 1);
										}

										/*	Redraw each x axis based on the new domain */
										yearAxis.transition()
												.duration(duration)
												.call(xYearAxis);

										monthAxis.transition()
												.duration(duration)
												.call(xMonthAxis);

										dayAxis.transition()
												.duration(duration)
												.call(xDayAxis);

										/*	Give the selected location the class of 'selected'
							then animate the locations to their new position based on the updated x scale */
										locations.classed("selected", false)
												.attr("class", function(d, i) {
														if (i === counter) {
																return "locations selected";
														} else {
																return "locations";
														};
												})
												.transition()
												.duration(duration)
												.attr("x", function(d, i) {
														return x(d.date1);
												})
												.attr("width", function(d) {
														if (d.date1 < d.date2) {
																/* 	decide the width of the rect based on the range of dates */
																return x(d.date2) - x(d.date1);
														} else {
																/* 	if no end date is specified add 86,400,000 milliseconds to the first
										date to create a span of time for the width
										but make sure that it is at least 4 px wide */
																var thisWidth = x(getDate(d.date1.getTime() + 86400000)) - x(d.date1);

																if (thisWidth < 4) {
																		return 4;
																} else {
																		return thisWidth;
																}
														}
												});

										/*	Fade out the next/prev and zoom buttons when they are not available */
										switch (counter) {
												case 0:
														leftIcon.style("fill", colourText[7]);
														rightIcon.style("fill", colourText[1]);
														break;
												case (items.length - 1):
														leftIcon.style("fill", colourText[1]);
														rightIcon.style("fill", colourText[7]);
														break;
												default:
														leftIcon.style("fill", colourText[1]);
														rightIcon.style("fill", colourText[1]);
														break;
										}

										switch (zoom) {
												case 1:
														zoomInIcon.style("fill", colourText[1]);
														zoomOutIcon.style("fill", colourText[7]);
														break;
												case maxZoom:
														zoomInIcon.style("fill", colourText[7]);
														zoomOutIcon.style("fill", colourText[1]);
														break;
												default:
														zoomInIcon.style("fill", colourText[1]);
														zoomOutIcon.style("fill", colourText[1]);
														break;
										}

								}

								/* Initial call of show position to adjust the timeline on page load */
								showLocation();

						}); /* End of getScript callback function */
				}
		}); /* End of Ajax success function */
		
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);