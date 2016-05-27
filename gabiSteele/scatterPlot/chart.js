var body = d3.select('body'),
	menu = d3.select("#menu"),
	margin = { top: 0, right: 0, bottom: 30, left: 40 },
	height = 600 - margin.top - margin.bottom,
	width = 650 - margin.left - margin.right,
	formatNumber = d3.format(',.1f'),
	formatCurrency = d3.format('$,.0f'),
	tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

d3.csv('motionGraph_data_neg1.csv',function (data) {


	var xVars = [{"variable":"Parent Child Relationship Score"},{"variable":"Parent Level of Support for Child"},{"variable":"Child Level of Positive Emotion"}];
	var yVars = [{"variable":"Parent ACE Score"},{"variable":"Child ACE Score"},{"variable":"Parent Stress Level"}];


	
	//  // Set the color domain equal to the three product categories
    // var metricsIncluded = d3.keys(data[0]).filter(function(key){return (key !== "timestamp") && (key !== "weekday") && (key !== "month") && (key !== "hour") && (key !== "min") &&  (key !== "excitement")&& (key !== "happy")&& (key !== "calm")&& (key !== "anxious")&& (key !== "sad")&& (key !== "angry") && (key !== "tired")  && (key !== "hungry")  && (key !== "bored")  && (key !== "exercise") && (key !== "thesis") && (key !== "sally")  && (key !== "barb")  && (key !== "sol")  && (key !== "work") && (key !== "home")  && (key !== "arash") && (key !== "emoji")  && (key !== "exhaca")  && (key !== "ansaan")  && (key !== "exha")  && (key !== "haca") && (key !== "anan") && (key !== "ansa")  && (key !== "calories")  && (key !== "airtemp")  && (key !== "steps"); });


	menu.append('span')
		.text('X-axis: ');

	menu.append('select')
		.on('change',xChange)
		.selectAll('option')
		.data(xVars)
		.enter()
		.append('option')
		.attr('value', function (d) { return d.variable })
		.text(function (d) { return d.variable ;});

	menu.append('br');

	menu.append('span')
		.text('Y-axis: ');

	menu.append('select')
		.on('change',yChange)
		.selectAll('option')
		.data(yVars)
		.enter()
		.append('option')
		.attr('id', function (d) { return d.variable })
		.attr('value', function (d) { return d.variable })
		.text(function (d) { return d.variable ;});

	d3.select("[id='Parent ACE Score']")
		.attr("selected", "selected");

	var xScale = d3.scale.linear()
		.domain([d3.min(data,function (d) { return 0.93*d['Parent Child Relationship Score']}),d3.max(data,function (d) { return 1.07*d['Parent Child Relationship Score']})])
		.range([0,width]);

	var yScale = d3.scale.linear()
		.domain([d3.min(data,function (d) { return 0.98*d['Parent ACE Score']}),d3.max(data,function (d) { return 1.02*d['Parent ACE Score']})])
		.range([height,0]);


	var svg = d3.select("#chart").append('svg')
		.attr('height',1.01*height + margin.top + margin.bottom)
		.attr('width',width + margin.left + margin.right)
		.append('g')
		.attr('transform','translate(' + margin.left + ',' + margin.top + ')');

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.tickFormat(d3.format(',.0f'))
		.ticks(5)
		.orient('bottom')
		.tickSize(-height);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.tickFormat(d3.format(',.0f'))
		.ticks(5)
		.orient('left')
		.tickSize(-width - margin.left - margin.right);


	svg.append('g')
		.attr('class','axis')
		.attr('id','xAxis')
		.attr('transform', 'translate(-1,' + height + ')')
		.call(xAxis)
		.append('text')
			.attr('id','xAxisLabel')
			.attr("dy", "2em")
    		.attr("dx", width/1.6)
			.style('text-anchor','end')
			.text('');

	svg.append('g')
		.attr('class','axis')
		.attr('id','yAxis')
		.call(yAxis)
		.append('text')
			.attr('id', 'yAxisLabel')
			.attr('transform','rotate(-90)')
			.attr("dy", "-1.6em")
			.attr("dx", -height/2.5)
			.style('text-anchor','end')
			.text('Parent ACE Score');

	var circles = svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.style("opacity", .6)




			.attr('cx',function (d) { return xScale(d['Parent Child Relationship Score'])})
			.attr('cy',function (d) { return yScale(d['Parent ACE Score']) })
			.attr("visibility", function(d,i){
    			if(d['Parent Child Relationship Score'] == -1 ||  d['Parent ACE Score'] == -1) return "hidden"; // hides the nulls
    			if(d['Child ACE Score'] == -1 ) return "hidden"; // hides the nulls
    			
			})
			// gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi gabi 
	
			.attr('r','5')
		.on("mouseover", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 1)
			tooltip.html(
	          "<p><strong>Parent ACE Score:  </strong>" + d['Parent ACE Score'] + "/10" +
	          "<p><strong>Child ACE Score:  </strong>" + (d['Child ACE Score']) + "/10" +
	          "<p><strong>Parent-Child Releationship Score:  </strong>" + d['Parent Child Relationship Score'] + "/5 " +
	          "<p><strong>Child Ethnicity:  </strong>" + d['ChildEthnicity'] + " " +
	          "<p><strong>Child Age:  </strong>" + d['ChildAge'] + " months " +
	          "<p><strong>Parent Age:  </strong>" + d['Parent Age'] + " years" +
	          "<p><strong>Language Spoken at Home:  </strong>" + d['Language Spoken at Home'] +
	          "<p><strong>Parent Education Level:  </strong>" + d['Parent Education Level'] +
	          "<p><strong>Parent Employment Status:  </strong>" + d['Parent Employment Status'] +
	           "<p><strong>Family Housing Status:  </strong>" + d['Family Housing Status'] +
	          "<p><strong>Group:  </strong>" + d['Group'] + ""
	          
	    	// "<p><strong>Mother's Employment Status: </strong>" +d['Mothers_Employment_Status'] +
			)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		});


	function xChange() {

		var value = this.value;
		xScale.domain([d3.min(data,function (d) { return 0.93*d[value]}),d3.max(data,function (d) { return 1.07*d[value]})]);
		xAxis.scale(xScale);

	// if (this.value == "") {
	// 		append.text('No Data');
	// 	}

		d3.select('#xAxis')
			.transition()
			.duration(750)
			.call(xAxis);

		d3.select('#xAxisLabel')
			.text(value);

		d3.selectAll('circle')
			.transition()
			.duration(750)
			.attr('cx',function (d) { return xScale(d[value]) })
	};

	function yChange() {

		var value = this.value;
		yScale.domain([d3.min(data,function (d) { return 0.98*d[value]}),d3.max(data,function (d) { return 1.02*d[value]})]);
		yAxis.scale(yScale);

		d3.select('#yAxis')
			.transition()
			.duration(750)
			.call(yAxis);

		d3.select('#yAxisLabel')
			.text(value);

		d3.selectAll('circle')
			.transition()
			.duration(750)
			.attr('cy',function (d) { return yScale(d[value]) });
	}
});

d3.select(self.frameElement).style("height", "715px");