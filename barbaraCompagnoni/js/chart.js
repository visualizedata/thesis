    // Define margins
    var margin = {top: 20, right: 80, bottom: 30, left: 20},
    width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
    height = parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;
    
    var intercept = 12.75709704;
    
    var coefficients = [0.06304758, -0.00126064, -0.6812107, 0.19716592, -0.24517675, 0.03837635, 0.11751085, 0.01119421];

    // weekday, hour, curmin
    var score = 0;
    
    
    function getSubser(d){ 
      var score = intercept + calCo(d["heartrate"], coefficients[0]) + calCo(d["steps"], coefficients[1]) + calCo(d["calories"], coefficients[2]) + calCo(d["gsr"], coefficients[3]) + calCo(d["skintemp"], coefficients[4]) + calCo(d["airtemp"], coefficients[5]) + calCo(d["weekday"], coefficients[6]) + calCo(d["hour"], coefficients[7])
      // + calCo(d["min"], coefficients[8])
      
      return { 
      wkDay: d["weekday"], 
      hour: d["hour"], 
      mins: d["min"], 
      heartrate: d["heartrate"], 
      steps: d["steps"], 
      calories: d["calories"], 
      gsr: d["gsr"], skintemp: 
      d["skintemp"], 
      airtemp: d["airtemp"], 
      intcept: intercept,  
      hco: calCo(d["heartrate"], coefficients[0]), 
      stepco: calCo(d["steps"], coefficients[1]), 
      calco: calCo(d["calories"], coefficients[2]), 
      gsrco: calCo(d["gsr"], coefficients[3]), 
      skinco: calCo(d["skintemp"], coefficients[4]), 
      airco: calCo(d["airtemp"], coefficients[5]), 
      wkdco: calCo(d["weekday"], coefficients[6]),
      hrco: calCo(d["hour"], coefficients[7]),
      // minco: calCo(d["min"], coefficients[8]),
      score: score,
      sigscore: sigmoid(score)
      
      }
    }

    function sigmoid(t) {
      return 1/(1+Math.pow(Math.E, -t));
    }
    
    function calCo(co, num){
      return co*num
    }
    
    
  function type(d) {
    d.emojis = +d.emojis;
    return d;
  }

    // # heartrate, steps, calories, gsr, skintemp, airtemp,
    // ['grin', 'grinning', 'relaxed', 'worried', ' disappointed_relieved','angry', 'no_mouth']

    // Define date parser
    var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

    // Define scales
    var xScale = d3.time.scale().range([0, width]);
    var yScale = d3.scale.linear().range([height, 0]);
    // var color = d3.scale.category20b();

    var color = d3.scale.ordinal()
        .range([ '#B0C4DE', '#ef7f1c', '#29489a']);
        // .range([ '#545301', '#5f1c0c', '#29489a', '#832994']);


    var date = 04;
    var mindate = parseDate('2016-05-'+ date + ' 00:00:00'),
        maxdate = parseDate('2016-05-'+ date + ' 23:59:00');

    var scale = d3.scale.linear()
                    .domain([0, 10])
                    .range([0, 150]);

    // Define axes
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).orient("right");

    // Define lines
    var line = d3.svg.line().interpolate("basis")
                .x(function(d) { return xScale(d["date"]); })
                .y(function(d) { return yScale(d["metric"]); });

    // Define svg canvas
    var chart1 = d3.select("#chart")
        .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Read in data
    d3.csv("data/newsarahTotal.csv", function(error, data){
      if (error) throw error;

      // Set the color domain equal to the three product categories
    var metricsIncluded = d3.keys(data[0]).filter(function(key){return (key !== "timestamp") && (key !== "weekday") && (key !== "month") && (key !== "hour") && (key !== "min") &&  (key !== "excitement")&& (key !== "happy")&& (key !== "calm")&& (key !== "anxious")&& (key !== "sad")&& (key !== "angry") && (key !== "tired")  && (key !== "hungry")  && (key !== "bored")  && (key !== "exercise") && (key !== "thesis") && (key !== "sally")  && (key !== "barb")  && (key !== "sol")  && (key !== "work") && (key !== "home")  && (key !== "arash") && (key !== "emoji")  && (key !== "exhaca")  && (key !== "ansaan")  && (key !== "exha")  && (key !== "haca") && (key !== "anan") && (key !== "ansa")  && (key !== "calories")  && (key !== "airtemp")  && (key !== "steps"); });

    // data.forEach(function(d){
    //     emojis.push(d["emoji"]);
    // })
    // console.log(emojis)

     color.domain(metricsIncluded);
      // console.log(JSON.stringify(data, null, 2)) // to view the structure


      // Format the data field
      data.forEach(function(d){
        d["timestamp"] = parseDate(d["timestamp"])
        // d["heartrate"]= d3.scale.linear().domain([d3.min(d["heartrate"]), d3.max(d["heartrate"])]).range([0, 100]);
        // d["gsr"] = d3.scale.linear().domain([d3.min(d["gsr"]), d3.max(d["gsr"])]).range([0, 100]);
        // d["skintemp"] = d3.scale.linear().domain([d3.min(d["skintemp"]), d3.max(d["skintemp"])]).range([0, 100]);
        // d["steps"] = d3.scale.linear().domain([d3.min(d["steps"]), d3.max(d["steps"])]).range([0, 100]);
        // d["airtemp"] = d3.scale.linear().domain([d3.min(d["airtemp"]), d3.max(d["airtemp"])]).range([0, 100]);
        // d["calories"] = d3.scale.linear().domain([d3.min(d["calories"]), d3.max(d["calories"])]).range([0, 100]);
        // d["excitedscore"] = scale(d["excitedscore"]);
        // d["happyscore"] = scale(d["happyscore"]);
        // d["calmscore"] = scale(d["calmscore"]);
        // d["anxiousscore"] = scale(d["anxiousscore"]);
        // d["sadscore"] = scale(d["sadscore"]);
        // d["angryscore"] = scale(d["angryscore"]);
        // d["hungerscore"] = d3.scale.linear().domain([d3.min(d["hungerscore"]), d3.max(d["hungerscore"])]).range([0, 100]);

      });

      // Filter the data to only include a single metric
      var subset = data.filter(function(el) {
        // return el.day === date});
        return (el.timestamp >= mindate) && (el.timestamp <= maxdate)});
      // console.log(JSON.stringify(subset, null, 2))

      // metrics = An array of three objects, each of which contains an array of objects
      var metrics = metricsIncluded.map(function(measurement , i){
        return {measurement: measurement, datapoints: subset.map(function(d){
          return { date: d["timestamp"], emoji: d["emoji"], metric: +d[measurement]}
        })}
      })
      
      var predictions = data.map(function(data){
        return { date: data["timestamp"], datapoints: getSubser(data)}
      })
      
      console.log(JSON.stringify(predictions, null, 2))

      // console.log(JSON.stringify(metrics, null, 2)) // to view the structure

      // Set the domain of the axes
      xScale.domain(d3.extent(subset, function(d) {return d["timestamp"]; }));

      yScale.domain([0, 150]);
      // yScale.domain([0, 10]);

      // metric.append("g").selectAll("circle")
      //     .data(function(d){return d.datapoints})
      //     .enter()
      //     .append("circle")
      //     .attr("r", 1)
      //     .attr("cx", function(dd){return xScale(dd.date)})
      //     .attr("cy", function(d){return yScale(d.metric)})
      //     .attr("fill", function(d){return color(d.parentNode.__data__.name)})
      //     .attr("stroke", function(d){return color(d.parentNode.__data__.name)})
    makeLegend(metrics, chart1);
    createGraphAxis(chart1);
    addGraphMetrics(metrics, chart1);
    addMouse(metrics, chart1);

})

    // Define svg canvas
    var chart2 = d3.select("#chart2")
        .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Read in data
    d3.csv("data/sallyTotalnew.csv", function(error, data){
      if (error) throw error;

      // Set the color domain equal to the three product categories
    var sallyMetricsIncluded = d3.keys(data[0]).filter(function(key){return (key !== "timestamp") && (key !== "day")  && (key !== "airtemp")  && (key !== "calories") && (key !== "steps")&& (key !== "excitement")&& (key !== "happy")&& (key !== "calm")&& (key !== "anxious")&& (key !== "sad")&& (key !== "angry") && (key !== "tired")  && (key !== "hungry")  && (key !== "bored")  && (key !== "exercise") && (key !== "thesis") && (key !== "sarah")  && (key !== "barb")  && (key !== "sol")  && (key !== "work") && (key !== "home")  && (key !== "arash")&& (key !== "emoji"); });


      color.domain(sallyMetricsIncluded);
      // console.log(JSON.stringify(data, null, 2)) // to view the structure


      // Format the data field
      data.forEach(function(d){
        d["timestamp"] = parseDate(d["timestamp"])
      });

      // Filter the data to only include a single metric
      var subset = data.filter(function(el) { return (el.timestamp >= mindate) && (el.timestamp <= maxdate)});

      // var subset = data.filter(function(el) { return (el.timestamp >= mindate) && (el.timestamp <= maxdate)});
      // console.log(JSON.stringify(subset, null, 2))

      // making json
      var sallyMetrics = sallyMetricsIncluded.map(function(measurement){
        return {measurement: measurement, datapoints: subset.map(function(d){
          return {date: d["timestamp"],  emoji: d["emoji"], metric: +d[measurement]}
        })}
      })

      // console.log(JSON.stringify(sallyMetrics, null, 2)) // to view the structure

      // Set the domain of the axes
      xScale.domain(d3.extent(subset, function(d) {return d["timestamp"]; }));

      yScale.domain([0, 150]);
      // yScale.domain([0, 10]);

    makeLegend(sallyMetrics, chart2);
    createGraphAxis(chart2);
    addGraphMetrics(sallyMetrics, chart2);
    addMouse(sallyMetrics, chart2);
})

function plusDate() {
    date++;
}

function minusDate() {
    date--;
}

function makeLegend(metrics, chart){
    var legend = chart.selectAll('g')
        .data(metrics)
        .enter()
        .append('g')
        .attr('class', 'legend');

    legend.append('rect')
        .attr('x', 20)
        .attr('y', function(d, i){ return i *  15;})
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', function(d) {
        return color(d.measurement);
    });

    legend.append('text')
        .attr('x', 40)
        .attr('y', function(d, i){ return (i *  15) + 11;})
        .style('font-size', '1.2em' )
        .style('font-family', 'Roboto' )
        // .style('color',function(d) {
        // return color(d.measurement)})
        .text(function(d){ return d.measurement; });
}

function createGraphAxis(chart){
    chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .style('font-family', 'Roboto' )
          .style('font-weight', 'thin' )
          .style('font-size', '1.15em' )
          .call(xAxis);

    chart.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" +  width + ", 0)")
          .style('font-family', 'Roboto' )
          .style('font-weight', 'thin' )
          .style('font-size', '1.15em' )
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("y", 6)
          .attr("dy", ".71em")
          .attr("dx", ".71em")
          .style("text-anchor", "beginning")
         
          // .text("metric reading");
}

function addGraphMetrics(metrics, chart){
      var metric = chart.selectAll(".measurement")
            .data(metrics)
            .enter().append("g")
            .attr("class", "measurement");

      metric.append("path")
              .attr("class", "line")
              .attr("d", function(d) {return line(d.datapoints); })
              .style("stroke", function(d) {return color(d.measurement); });
}



function addMouse(metrics, chart){

    var mouseG = chart.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      // .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(metrics)
      .enter()
      .append("g")
      .attr("sth", function(d) {
        console.log(d)
      })
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 3)
      .style("stroke", function(d) {
        return color(d.measurement);
      })
      .style("fill", function(d) {
        return color(d.measurement);
      })
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .style('font-family', 'Roboto' )
      .style('font-weight', 'thin' )
      .style('font-size', '1.15em' )
      .attr("transform", "translate(15,-20)");

    mousePerLine.append('emoji')
        // .attr('symbol', 'smile')
        .attr("transform", "translate(-18,-18)")
        .attr('width', 30)
        .attr('height', 30)
              // function(d) { return "'" + d.emoji + "'"; })

              // function(d,i) { return "'" + d.emoji + "'"})
        // yScale.invert(pos.y) > 20 ? 'scream' : 'scream') // codes taken from http://www.emoji-cheat-sheet.com/ the enclosing :colons: aren't necessary
        // do all the standard d3 stuff



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
            // console.log(width/mouse[0])
            var xDate = xScale.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.datapoints, xDate);

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
              .text( d.measurement + ": "+ yScale.invert(pos.y).toFixed(2));
              // console.log(d.datapoints[idx].emoji)


              //console.log(d.datapoints[i].emoji)
            d3.select(this).select('emoji')
                    //.attr("symbol", d.datapoints[idx].emoji)
                    .attr('symbol', function(dd){
                      return d.datapoints[idx].emoji
                    })


            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });
}


// Define responsive behavior
function resize() {
  var width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
  height = parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;

  // Update the range of the scale with new width/height
  xScale.range([0, width]);
  yScale.range([height, 0]);

  // Update the axis and text with the new scale
  chart1.select('.x.axis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  chart1.select('.y.axis')
    .attr("transform", "translate(" +  width + ", 0)")
    .call(yAxis);

  // Force D3 to recalculate and update the line
  chart1.selectAll('.line')
    .attr("d", function(d) { return line(d.datapoints); });

  // Update the tick marks
  xAxis.ticks(Math.max(width/75, 2));
  yAxis.ticks(Math.max(height/50, 2));

};

    // Call the resize function whenever a resize event occurs
    d3.select(window).on('resize', resize);

    // Call the resize function
    resize();

