    // Define margins
    var margin = {top: 20, right: 0, bottom: 30, left: 80},
    width = parseInt(d3.select("#chart2").style("width")) - margin.left - margin.right,
    height = parseInt(d3.select("#chart2").style("height")) - margin.top - margin.bottom;

    // Define date parser
    var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

    // Define scales
    var xScale = d3.time.scale().range([0, width]);
    var yScale = d3.scale.linear().range([height, 0]);
    var color = d3.scale.category20b();

    var sdate = 03;
    var smindate = parseDate('2016-05-'+ sdate + ' 00:00:00'),
        smaxdate = parseDate('2016-05-'+ sdate + ' 23:59:00');

    var scale = d3.scale.linear()
                    .domain([0, 10])
                    .range([0, 150]);

    // Define axes
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    // Define lines
    var line = d3.svg.line().interpolate("basis")
                .x(function(d) { return xScale(d["date"]); })
                .y(function(d) { return yScale(d["metric"]); });

    // Define svg canvas
    var chart2 = d3.select("#chart2")
        .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Read in data
    d3.csv("data/sallyTotal.csv", function(error, sdata){
      if (error) throw error;

      // Set the color domain equal to the three product categories
    var sallyMetricsIncluded = d3.keys(sdata[0]).filter(function(key){return (key !== "timestamp") && (key !== "day")  && (key !== "airtemp")  && (key !== "calories") && (key !== "steps")&& (key !== "excitement")&& (key !== "happy")&& (key !== "calm")&& (key !== "anxious")&& (key !== "sad")&& (key !== "angry") && (key !== "tired")  && (key !== "hungry")  && (key !== "bored")  && (key !== "exercise") && (key !== "thesis") && (key !== "sarah")  && (key !== "barb")  && (key !== "sol")  && (key !== "work") && (key !== "home")  && (key !== "arash"); });


    color.domain(sallyMetricsIncluded);
      // console.log(JSON.stringify(data, null, 2)) // to view the structure


      // Format the data field
      sdata.forEach(function(d){
        d["timestamp"] = parseDate(d["timestamp"])
      });

     // var mindate2 = parseDate('2016-04-28 00:00:00'),
     //    maxdate2 = parseDate('2016-04-28 23:59:00');
     //    console.log(mindate);
      // Filter the data to only include a single metric
      var subset = sdata.filter(function(el) {
        // return el.day === date});
        return (el.timestamp >= smindate) && (el.timestamp <= smaxdate)});
      // console.log(JSON.stringify(subset, null, 2))

      // Reformat data to make it more copasetic for d3
      // data = An array of objects
      // sallyMetrics = An array of three objects, each of which contains an array of objects
      var sallyMetrics = sallyMetricsIncluded.map(function(measurement){
        return {measurement: measurement, datapoints: subset.map(function(d){
          return {date: d["timestamp"], metric: +d[measurement]}
        })}
      })
      // console.log(JSON.stringify(sallyMetrics, null, 2)) // to view the structure

      // Set the domain of the axes
      xScale.domain(d3.extent(subset, function(d) {return d["timestamp"]; }));

      yScale.domain([0, 150]);
      // yScale.domain([0, 10]);

    var legend = chart2.selectAll('g')
        .data(sallyMetrics)
        .enter()
        .append('g')
        .attr('class', 'legend');

    legend.append('rect')
        .attr('x', width - 50)
        .attr('y', function(d, i){ return i *  10;})
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', function(d) {
        return color(d.measurement);
    });

    legend.append('text')
        .attr('x', width - 35)
        .attr('y', function(d, i){ return (i *  10) + 9;})
        .text(function(d){ return d.measurement; });

      // Place the axes on the chart
      chart2.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      chart2.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("y", 6)
          .attr("dy", ".71em")
          .attr("dx", ".71em")
          .style("text-anchor", "beginning")
          .text("scale 1 to 10");

      var metric = chart2.selectAll(".measurement")
            .data(sallyMetrics)
            .enter().append("g")
            .attr("class", "measurement");

      metric.append("path")
              .attr("class", "line")
              .attr("d", function(d) {return line(d.datapoints); })
              .style("stroke", function(d) {return color(d.measurement); });

      // metric.append("g").selectAll("circle")
      //     .data(function(d){return d.datapoints})
      //     .enter()
      //     .append("circle")
      //     .attr("r", 1)
      //     .attr("cx", function(dd){return xScale(dd.date)})
      //     .attr("cy", function(d){return yScale(d.metric)})
      //     .attr("fill", function(d){return color(d.parentNode.__data__.name)})
      //     .attr("stroke", function(d){return color(d.parentNode.__data__.name)})

    var mouseG = chart2.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(sallyMetrics)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.measurement);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            console.log(width/mouse[0])
            var xDate = xScale.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.measurement, xDate);

            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }

            d3.select(this).select('text')
              .text(yScale.invert(pos.y).toFixed(2));

            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });
})


    // Define responsive behavior
    function resize() {
      var width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
      height = parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;

      // Update the range of the scale with new width/height
      xScale.range([0, width]);
      yScale.range([height, 0]);

      // Update the axis and text with the new scale
      chart2.select('.x.axis')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      chart2.select('.y.axis')
        .call(yAxis);

      // Force D3 to recalculate and update the line
      chart2.selectAll('.line')
        .attr("d", function(d) { return line(d.datapoints); });

      // Update the tick marks
      xAxis.ticks(Math.max(width/75, 2));
      yAxis.ticks(Math.max(height/50, 2));

    };

    // Call the resize function whenever a resize event occurs
    d3.select(window).on('resize', resize);

    // Call the resize function
    resize();
