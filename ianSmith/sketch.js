d3.queue()
	.defer(d3.json, "vizdata.json")
	//.defer(d3.json, "fullvizdata.json")
	.defer(d3.tsv, "nationalClean.tsv")
	.await(analyze)


var cl = ["#87A279",
"#6E6A4D",
"#405C1F",
"#9A8F7B",
"#584F40",
"#FFF4D9",
"#070705",
"#573E25",
"#EA3C00",
"#EAD900",
"#00EAB4",
"#7200EA",
"#EA7C00",
"#3BEA00",
"#EA00C0",
"#EAAA00",
"#007DEA",
"#EA001C",
"#C9EA00",
"#0009EA",
"#A2A5EA",
"#EAA2AB"];

//function analyze(error, res, oes, userInput="Statisticians"){
//function analyze(error, res, oes, userInput="Web Developers"){
//function analyze(error, res, oes, userInput="Actuaries"){
//function analyze(error, res, oes, userInput="Computer Programmers"){
//function analyze(error, res, oes, userInput="Biostatisticians"){
//function analyze(error, res, oes, userInput="Solar Photovoltaic Installers"){
//function analyze(error, res, oes, userInput="Art Directors"){
//function analyze(error, res, oes, userInput="Actors"){
//function analyze(error, res, oes, userInput="Mechatronics Engineers"){
//function analyze(error, res, oes, userInput="Landscape Architects"){
//function analyze(error, res, oes, userInput="Chemical Engineers"){
//function analyze(error, res, oes, userInput="Architects, Except Landscape and Naval"){
//function analyze(error, res, oes, userInput="Computer Operators"){
//function analyze(error, res, oes, userInput="Social Workers, All Other"){
//function analyze(error, res, oes, userInput="Sales Representatives, Wholesale and Manufacturing Technical and Scientific Products"){
function analyze(error, res, oes, userInput="Tax Examiners and Collectors, and Revenue Agents"){
//function analyze(error, res, oes, userInput="Landscape Architects"){

//____________________
//
//DROPDOWN
//
//____________________

//var Usearch = d3.select("#searchbox")
var dropd_Major = d3.select("#dropdown-major")
	.append("select")
	.attr("name","Major Categories")
	.selectAll("option")
	.data(oes)
	.enter()
	.filter(function(d,i){return parseInt(d.OCC_CODE.substring(3)) == 0 && i > 0})
	.append("option")
	.text(function(d){return d.OCC_TITLE})
	.attr("value", function (d) { return parseInt(d.OCC_CODE.substring(0,2)); });
	

d3.select("#dropdown-major select").on("change",updateMinor);


var dropd_Minor = d3.select("#dropdown-minor")
	.append("select")
	.attr("name","Minor Categories");


function updateMinor(){
	//d3.select("#dropdown-minor select")
		dropd_Minor.selectAll("option")
		//.exit()
		.remove()

	var selectedMajor = d3.event.target.value;
	console.log(selectedMajor)
	dropd_Minor.selectAll("option")
		.data(oes)
		.enter()
		.filter(function(d,i){console.log(selectedMajor);return parseInt(d.OCC_CODE.substring(3)) > 0 && parseInt(d.OCC_CODE.substring(0,2)) == selectedMajor})
		.append("option")
		.text(function(d){return d.OCC_TITLE})
		.attr("value", function (d) { return d.OCC_TITLE; });
		//.attr("value", function (d) { return d.OCC_CODE; });

		//d3.select("#dropdown-minor select").enter()
		//.filter(function(d,i){console.log(selectedMajor);return parseInt(d.OCC_CODE.substring(3)) > 0 && parseInt(d.OCC_CODE.substring(0,1)) == selectedMajor})
		//.append("option")
		//.text(function(d){return d.OCC_TITLE})
		//.attr("value", function (d) { return d.OCC_CODE; });

}




//d3.select("#dropdown-minor select").selectAll("option")
	//.datum(function(d){return d3.select(this).attr("value")})
	//.on("click",

//function analyze(error, res, oes, userInput="Bartenders"){
	console.log(res)
	console.log(oes)


	var userIn = userInput;

	var height = 1000;
	var width = 1800;

	var treeboundY = 900;
	var treeboundX = 1200;

	var margin = {left:20, right:20,top:20,bottom:20};

 originX = width/3;
 originXpost = width/3*2;
 originY = height/2

 priorcontrol = (height/16)*8.5
 postcontrol = (height/16)*7.5

 Hpriorcontrol = originX - 92
 Hpostcontrol = originX + 500


	transitionX = originX-72
	transitionY = postcontrol

	svg = d3.select('body')
		.append('svg')
		.attr('width',width)
		.attr('height',height)
		//.style("border","0.5px dotted #990000");
	centerGroup = svg.append('g')//.attr('transform', 'translate('+margin.left+','+margin.top+')')
		.attr("id", "focus");
	priorGroup = svg.append('g')//.attr('transform', 'translate('+margin.left+','+margin.top+')')
		.attr("id", "prior");
	postGroup = svg.append('g')//.attr('transform', 'translate('+margin.left+','+margin.top+')')
		.attr("id", "post");

d3.select("#dropdown-minor select").on("change", getTitleVal)

function getTitleVal(){
	userIn = d3.event.target.value;
	update(error, res, oes, userIn, false, transitionX, transitionY);
}





function update(err, res, oes, userInput, forward,transX,transY){
	first_pos = 0;
	current_pos = 0;


	yscale = d3.scaleLinear().domain([treeboundY,0]).range([0,treeboundY])
	//var priorScale = d3.scaleLinear().domain([
	//var postScale = d3.scaleLinear().domain([
	


	var t = d3.transition()
		.ease(d3.easeQuad)
		.duration(1500);
	var t2 = d3.transition()
		.delay(2250)
		.ease(d3.easeQuad)
		.duration(1500);
	


//___________________________________
//
// Call functions VvV
//
//_________________________________


	//var root = tree(d3.stratify(res));

	//var title = getuserInput();
	//var userIn = "Solar Photovoltaic Installers";
	//var userIn = "Computer Operators";
	//var userIn = "Tax Examiners and Collectors, and Revenue Agents";
	//var userIn = "Architects, Except Landscape and Naval";

		//lookup db code from key
	//var lookupCode = lookup(title, oes).split("-");

		//query db for resmues	
	//var data = getResumes(lookupCode);
	
	////for designing and testing interface VvV
	//
	var selection = get_resumes(userIn, res, oes);

		//calculate totals and split post and prior experience

	var total_post_prior = calcTotals(userIn, selection[0].data);
	var total = total_post_prior.presentCount;
	var avg_yrs_in_current = total_post_prior.present / total;

	selection.resumesFound = total;
	selection.avgyrs = avg_yrs_in_current;

	var prior_roles= prior_role_counter(total_post_prior.ppMatrix[0]);
	var post_roles = post_role_counter(total_post_prior.ppMatrix[1]);

	//var prior_percentages = percenter(prior_roles, total_post_prior.presentCount);
	//var post_percentages = percenter(post_roles, total_post_prior.presentCount);
	//var prior_percentages = percenter(prior_roles, total_post_prior.prior);
	//var post_percentages = percenter(post_roles, total_post_prior.post);




	//// OBJECT for d3 to visualize
	d3obj = [selection,prior_roles,post_roles]
	console.log(d3obj[0])
	console.log(d3obj[1])
	//var d3obj = {"position":userIn, "selection":selection, "resumesFound":total, "avgyrs":avg_yrs_in_current, "prior":{"priorData":prior_roles,"prior_percentages":prior_percentages}, "post":{"postData":post_roles,"post_percentages":post_percentages}}

//printit(prior_roles)



	
	//var prior_roles = prior_role_counter(total_post_prior.priorMatrix);
	//var post_roles = post_role_counter(total_post_prior.postMatrix);

//calculate prior and post job path statistics
	

//________________________________
//
// Define functions VvV
//
//_____________________________
	
//for(var i=0; i<total_post_prior.priorMatrix.length; i++){
//	total_post_prior.priorMatrix[i].length
//	for(var j=total_post_prior.priorMatrix[i].length; j>0; j--){
//		priorObjs.push(
//

//_________________________prototype functions  V

function get_resumes(job, resumeList, legend){
	var onetSamp = "";
	var onetSum = "";
	var data = [];
	//for(var n=0; n<resumeList.length; n++){
	for(var n in resumeList){
		for(var m=0; m<resumeList[n].tron_prediction[0].length; m++){
			if(resumeList[n].tron_prediction[0][m] == job){
				if(onetSum == "")
					onetSum = resumeList[n].summaries[m];
					onetSamp = resumeList[n].samplelist[m];
				if(!data.includes(resumeList[n]))
					data.push(resumeList[n]);
			}
		}
	}
	var emp;
	var emp_error;
	var annual;
	var hourly;
	var pay_error;
	for(var z=0; z<legend.length; z++){
		if(legend[z].OCC_TITLE == job){	
			emp = parseInt(legend[z].TOT_EMP)
			emp_error = parseFloat(legend[z].EMP_PRSE)
			//annual = parseInt(legend[z].A_MEAN)
			//hourly = parseInt(legend[z].H_MEAN)
			annual = parseFloat(legend[z].A_MEAN)
			hourly = parseFloat(legend[z].H_MEAN)
			pay_error = parseFloat(legend[z].MEAN_PRSE)
		}
	}
	return [{"current":userIn, "onetSum":onetSum, "onetSamp":onetSamp, "emp":emp, "emp_error":emp_error, "annual":annual, "hourly":hourly, "pay_error":pay_error, "data":data}];
}


	function printit(info){
		console.log("average years as a " + "Tax Examiner: " + avg_yrs_in_current)
		console.log("shortest time was " + total_post_prior.minyears + " years")
		console.log("longest time was " + total_post_prior.maxyears + " years")
		var arr = Object.keys(info)
		for(var g=0; g<arr.length; g++){
			if(arr[g] == 'undefined'){
				console.log("First job : %" + prior_percentages[g]);
			}else{
				console.log(arr[g] + " : %" + prior_percentages[g]);
			}
		}
	}

//_________________________prototype functions  ^




	function prior_role_counter(matrix){
		var objects = []
		var roleCounter = [];
		var colTracker = 1;
		for(var i=0; i<matrix.length; i++){
			for(var j=0; j<matrix[i].length; j++){
				if(roleCounter[matrix[i][j][matrix[i][j].length-1]] >= 1)
					roleCounter[matrix[i][j][matrix[i][j].length-1]] += 1;
				else
					roleCounter[matrix[i][j][matrix[i][j].length-1]] = 1;
			}
		}
		for(var k in roleCounter){
			objects.push({"Title":k,"count":roleCounter[k],"Percent":Math.round((roleCounter[k]/total_post_prior.presentCount)*100)})
		}
		return objects;
	}

	function post_role_counter(matrix){
		var objects = []
		var roleCounter = [];
		var colTracker = 1;
		for(var i=0; i<matrix.length; i++){
			for(var j=0; j<matrix[i].length; j++){
				if(roleCounter[matrix[i][j][0]] >= 1)
					roleCounter[matrix[i][j][0]] += 1;
				else
					roleCounter[matrix[i][j][0]] = 1;
			}
		}
		for(var k in roleCounter){
			objects.push({"Title":k,"count":roleCounter[k],"Percent":Math.round((roleCounter[k]/total_post_prior.presentCount)*100)})
		}
		return objects;
	}



	//_________Creates data object to be rendered by d3
	//// TODO Add functions to calculate percentages for prior and post roles
	//the 'prior' and 'post' elements of this object reflect the counts of resumes with "AT LEAST" one prior or post position
	//
	function calcTotals(jobT, resumes){
		var prior = 0;
		var post = 0
		var present = 0;
		var presentCount = 0;
		var durationArr = []
		var ppMatrix = [[],[]];
		//var priorMatrix = [];
		//var postMatrix = [];
		for(var i=0;i<resumes.length;i++){
			var priorList = [];
			var postList = [];
			for(var j=0;j<resumes[i].tron_prediction[0].length;j++){
			//for(var j=0;j<resumes[i].minor.length;j++){
				//if(resumes[i].minor[j] == minorCode){
				if(resumes[i].tron_prediction[0][j] == jobT){
					//yearSquasher(resumes[i].durations, j)
					//if(j>0 && j<resumes[i].tron_prediction[0].length){
						var listSplitter = []
						for (var x=0;x<j;x++){
							listSplitter.push(resumes[i].tron_prediction[0][x]);
						}
						priorList.push(listSplitter)
						var listSplitter2 = []
						for (var y=j+1;y<resumes[i].tron_prediction[0].length;y++){
							listSplitter2.push(resumes[i].tron_prediction[0][y]);
						}
						postList.push(listSplitter2)
						if(j>0)
							prior += 1
						if(j<resumes[i].tron_prediction[0].length-1)
							post+= 1
					//}
				//		if(j<resumes[i].tron_prediction[0].length){
				//			post+= 1
				//			for (var y=j+1;y<resumes[i].tron_prediction[0].length;y++){
				//				postList.push(resumes[i].tron_prediction[0][y]);
				//			}
				//		}
				//	}
					durationArr.push(resumes[i].durations[j])
					if(resumes[i].durations[j])
						present += resumes[i].durations[j]
					else
						present += 0
					presentCount += 1;
				}
			}
			//var yrsArr = [for (x of resumes[i].durations) x]
			////// "spread" operator "..." V same result as -> var maxyrs = Math.max.apply(null, yrsArr) 
			// TODO use median instead possible to better handle outliers and errors
			var maxyrs = Math.max(...durationArr)
			var minyrs = Math.min(...durationArr)
			if(priorList.length >0)
				ppMatrix[0].push(priorList);
			if(postList.length > 0)
				ppMatrix[1].push(postList);
			//priorMatrix.push(priorList);
			//postMatrix.push(postList);
		}
		return {"prior":prior,"present":present,"maxyears":maxyrs,"minyears":minyrs,"presentCount":presentCount,"post":post,"ppMatrix":ppMatrix}
		//return {"prior":prior,"present":present,"post":post,"priorMatrix":priorMatrix,"postMatrix":postMatrix}
	}

					

	/*
	 * ... Maybe later
	 * _________ implement function to flatten duration values for extending timeline
	 *
	function yearSquasher(durationList, currentIndex){
		var prior = 0;
		var post = 0
		var present = 0;
		if (currentIndex>0){
			for(var k=0;k<currentIndex;k++){
				prior += durationList[k]
			}
		}
		else if (currentIndex < durationList.length){
			for(var t=currentIndex+1;t<durationList.length;t++){
				post += durationList[t];
			}
		}
		else{
			present += durationsList[currentIndex]
		}
		return {"present":present, "post":post, "prior":prior}
	}
	*/
			


	//__________ TODO write db query using lookupcode
	//
	function getResumes(code){
		//db lookup Q
		//

		//return {data}
		return {"major":"##", "minor":"####"}

	}

	//__________ gets lookupcode from data key
	//
	//
	function lookup(val,table){
		for (var i=0;i<table.length;i++){
			if(table.keys[i] == val){
				return table.keys[i]
			}
		}
	}

	//d3 object refrence
	//
	//var d3obj = {"selection":[userIn,selection],"prior":[prior_roles,prior_percentages], "post":[post_roles,post_percentages]}
console.log(d3obj[1])
console.log(d3obj[1].children)

var present = d3.entries(d3obj[0])
var past = d3.entries(d3obj[1])
var future = d3.entries(d3obj[2])

	

	//__________________________________________________
	//
	// draw viz and interface VvV
	// HORIZONTAL
	//
	//__________________________________________________
	//
	//
	/**/


	//svg was here ! ;)
	


//
// display current focused position ____________________
//
//
//var center = centerGroup.selectAll("g")

var detailsShown = false;

// focus display bar v
//
// Title text 
var centerBar = centerGroup.selectAll("text")
	.data(d3obj[0])
var centerBarLine = centerGroup.selectAll("line")
	.data(d3obj[0])

centerBar.exit()
	.attr("class", "exit")
	.transition(t)
	.attr("y",originY-55)
	.attr("x",function(d){if(forward===true){
			return originX-200
		}else if(forward ===false){
			return originXpost
		}
		})
	.attr("fill-opacity",0)
	.remove();

centerGroup.selectAll("line")//.exit()
	.attr("class", "exit")
	.transition(t)
	.attr("y2",postcontrol)
	.attr("x2",function(d){if(forward===true){
			return originX-200
			//return originXpost
		}else if(forward ===false){
			return originXpost
		}
		})
	.attr("x1",function(d){if(forward===true){
			return originX-200
		}else if(forward ===false){
			return originXpost
			//return originX-200
		}
		})
	.attr("stroke-opacity",0)
	.remove();
//centerGroup.selectAll("line").remove();

centerBar.attr("class", "update")
	.attr("y",transY)
	.attr("x",transX)
	//.attr("y",originY-55)
	//.attr("x",function(d){if(forward===true){
	//		return originXpost
	//	}else if(forward===false){
	//		return originX-200
	//	}
	//	})
	.attr("fill-opacity", 1)
	.transition(t)
	.attr("y", originY-55)
	.attr("x", originX-72)
	.text(function(d){return d.current});


centerBar.enter()
	.append("g")
	.append("text")
	.attr("class", "enter")
	.attr("fill-opacity", 0)
	.attr("y",transY)
	.attr("x",transX)
	////.attr("y", originY)
	//.attr("x", originX-9)
	.transition(t)
	//.transition()
	//.delay(1000)
	//.duration(1500)
	.attr("x", originX-72)
	.attr("y", originY-55)
	.attr("font-size", 46)
	.attr("fill-opacity", 1)
	.text(function(d){return d.current});

var iw = d3.interpolateNumber(d3.max(d3obj[1],function(el){if(el.Title == "undefined"){ return 0} return el.Percent/2}),d3.max(d3obj[2],function(el){if(el.Title == "undefined"){return 0}  return el.Percent/2}));
var ix = d3.interpolateNumber(originX-72,originX+500);
//center line(s)
//Interpolator lines______
//
if(forward){
	for(var i=0;i<1;i+=0.01){
		centerGroup
		.append("line")
		.attr("x1", originX+500)
		.attr("y1", postcontrol)
		.attr("x2", originX+500)
		.attr("y2", postcontrol)
		.attr("stroke-opacity", 0)
		.transition(t)
		//.duration(1500)
		.attr("x1", ix(i))
		.attr("y1", postcontrol)
		.attr("x2", ix(i+0.01))
		.attr("y2", postcontrol)
		.attr("stroke-opacity", 1)
		.attr("stroke-width", iw(i))
		.attr("stroke", "black")
	}
}else{
	for(var i=0;i<1;i+=0.01){
		centerGroup
		.append("line")
		.attr("x1", originX-72)
		.attr("y1", postcontrol)
		.attr("x2", originX-72)
		.attr("y2", postcontrol)
		.attr("stroke-opacity", 0)
		.transition(t)
		//.duration(1500)
		.attr("x1", ix(i))
		.attr("y1", postcontrol)
		.attr("x2", ix(i+0.01))
		.attr("y2", postcontrol)
		.attr("stroke-opacity", 1)
		.attr("stroke-width", iw(i))
		.attr("stroke", "black")
	}
}


centerGroup.append("line")
		.attr("x1",-20000)
		.attr("y1", postcontrol)
		.attr("x2",-20000)
		.attr("y2", postcontrol)
		//.attr("stroke-opacity", 0)
		.transition(t)
		//.duration(1500)
		.attr("x1",-20000)
		.attr("y1", postcontrol)
		.attr("x2", width+20000)
		.attr("y2", postcontrol)
		.attr("stroke-opacity", 1)
		.attr("stroke-width", 0.5)
		.attr("stroke", "black")
	

//salary text
centerGroup.append("text")
	.attr("class", "detail-info")
//centerGroup.selectAll("g")
	//.data(d3obj[0])
	//.enter()
	//.append("g")
	//.append("text")
	.attr("y", originY-24)
	.attr("x", originX-70)
	.attr("fill-opacity", 0)
	.transition()
	.delay(1500)
	.duration(800)
	.attr("x", originX-70)
	.attr("y", originY+8)
	.attr("font-size", 28)
	.attr("fill-opacity", 1)
	//.text(function(d){console.log(d);return d.annual});
	.text("Average Annual Salary: $"+commaAdder(d3obj[0][0].annual))

//employment text
centerGroup.append("text")
	.attr("class", "detail-info")
//centerGroup.selectAll("g")
	//.data(d3obj[0])
	//.enter()
	//.append("g")
	//.append("text")
	.attr("y", originY)
	.attr("x", originX-70)
	.attr("fill-opacity", 0)
	.transition()
	.delay(1500)
	.duration(800)
	//.delay(3000)
	//.duration(1000)
	.attr("x", originX-70)
	.attr("y", originY+66)
	.attr("font-size", 28)
	.attr("fill-opacity", 1)
	//.text(function(d){console.log(d);return d.annual});
	.text("Total Annual employment: "+commaAdder(d3obj[0][0].emp))

//bottom job features lines
centerGroup.append("line")
	.attr("class", "detail-info")
	.attr("x1", originX-72)
	.attr("y1", postcontrol)
	.attr("x2", originX+250)
	.attr("y2", postcontrol)
	.transition()
	.delay(1500)
	.duration(800)
	//.delay(3000)
	//.duration(1000)
	.attr("x1", originX-72)
	.attr("y1", priorcontrol)
	.attr("x2", originX+250)
	.attr("y2", priorcontrol)
	.attr("stroke-width", "8")
	.attr("stroke", "black")

//bottom job features lines
centerGroup.append("line")
	.attr("class", "detail-info")
	.attr("x1", originX-72)
	.attr("y1", postcontrol)
	.attr("x2", originX+250)
	.attr("y2", postcontrol)
	.transition()
	.delay(1500)
	.duration(800)
	//.delay(3000)
	//.duration(1000)
	.attr("x1", originX-72)
	.attr("y1", priorcontrol+60)
	.attr("x2", originX+250)
	.attr("y2", priorcontrol+60)
	.attr("stroke-width", "8")
	.attr("stroke", "black")


//bottom job features lines
centerGroup.append("line")
	.attr("class", "detail-info")
	.attr("x1", originX-72)
	.attr("y1", postcontrol)
	.attr("x2", originX+250)
	.attr("y2", postcontrol)
	.transition()
	.delay(1500)
	.duration(800)
	//.delay(3000)
	//.duration(1000)
	.attr("x1", originX-72)
	.attr("y1", priorcontrol+120)
	.attr("x2", originX+250)
	.attr("y2", priorcontrol+120)
	.attr("stroke-width", "8")
	.attr("stroke", "black")
//
//bottom job features lines
centerGroup.append("line")
	.attr("class", "detail-info")
	.attr("x1", originX-72)
	.attr("y1", postcontrol)
	.attr("x2", originX+250)
	.attr("y2", postcontrol)
	.transition()
	.delay(1500)
	.duration(800)
	//.delay(3000)
	//.duration(1000)
	.attr("x1", originX-72)
	.attr("y1", priorcontrol+180)
	.attr("x2", originX+250)
	.attr("y2", priorcontrol+180)
	.attr("stroke-width", "8")
	.attr("stroke", "black")

//resumes found 
centerGroup.append("text")
	.attr("class", "detail-info")
//centerGroup.selectAll("g")
	//.data(d3obj[0])
	//.enter()
	//.append("g")
	//.append("text")
	.attr("y", originY)
	.attr("x", originX-70)
	.attr("fill-opacity", 0)
	.transition()
	.delay(1500)
	.duration(800)
	//.delay(3000)
	//.duration(1000)
	.attr("x", originX-70)
	.attr("y", originY+124)
	.attr("font-size", 28)
	.attr("fill-opacity", 1)
	//.text(function(d){console.log(d);return d.annual});
	.text("Resumes Found: "+commaAdder(d3obj[0].resumesFound))

//average years 
centerGroup.append("text")
	.attr("class", "detail-info")
//centerGroup.selectAll("g")
	//.data(d3obj[0])
	//.enter()
	//.append("g")
	//.append("text")
	.attr("y", originY)
	.attr("x", originX-70)
	.attr("fill-opacity", 0)
	.transition()
	.delay(1500)
	.duration(800)
	//.delay(3000)
	//.duration(1000)
	.attr("x", originX-70)
	.attr("y", originY+182)
	.attr("font-size", 28)
	.attr("fill-opacity", 1)
	//.text(function(d){console.log(d);return d.annual});
	.text(("Average Years in Position: "+d3obj[0].avgyrs+"").replace(/(\d{1,2}\.\d{2})(\d+)/, "$1"))

//Job summary
//centerGroup.append("text")
d3.select("#summary")
	.attr("class", "detail-info")
	.text(d3obj[0][0].onetSum)
	.style("color", "black")
	.style("font-size", "16px")
	.style("max-width", "500px")


//Potential roles
//centerGroup.append("text")
d3.select("#samples")
	.attr("class", "detail-info")
	.text(d3obj[0][0].onetSamp)
	.style("color", "black")
	.style("font-size", "16px")
	.style("max-width", "500px")

function commaAdder(num){
	n = num.toString();
	var wcomma = "";
	var counter = 0;
	for(var i=n.length-1;i>=0;i--){
		if(counter ==3){
			wcomma += ",";
			counter = 0;
		}
		wcomma += n[i]
		counter++;
	}
		//var re = /(\d{1,3}(?=\d{3}))([\d{3}]+)/g
		//var interim = re.exec(num);
		//console.log(interim)
	return wcomma.split('').reverse().join('');
}
//console.log(commaAdder(123456789));

//____________________
//
//PRIORJOBS
//vvvv
//____________________

var priordestX = []
var priordestY = []

var priorCurves = []

var priorScaleX = d3.scaleLinear().domain([0,d3.max(d3obj[1], function(el){return el.Percent})]).range([treeboundX/20,width/treeboundX])
var priorScaleY = d3.scaleLinear().domain([0,d3obj[1].length]).range([height, 0])

var prior = priorGroup.selectAll("text")
	.data(d3obj[1])

prior.exit()
	.attr("class", "exit")
	.transition(t)
	.attr("x",0)
	.attr("fill-opacity",0)
	.remove();

prior.attr("class", "update")
	.attr("y",postcontrol)
	.attr("x",originX-72)
	//.attr("y",originY-55)
	//.attr("x",function(d){if(forward===true){
	//		return originXpost
	//	}else if(forward===false){
	//		return originX-200
	//	}
	//	})
	.text(function(d){
		if(d.Percent == 0){
			d.Percent = 1;
			return "< 1% "+d.Title;
		}
		if(d.Title == "undefined"){
			 //d.Title = "Their first Job";
			first_pos = d.Percent;
			d.Percent = 0;
		}
		////BARTENDER ALTERATION
		//if(d.Title == "Bartenders"){
			//return d.Percent + "% Other/Unclassifiable"
		//}
		 return d.Percent + "%  " + d.Title
		 })
	.attr("font-size",function(d){
		if(d.Title == "undefined"){
			first_pos = d.Percent;
			d.Percent = 0;
			return 0;
		}else{
			return ((d.Percent+6))}
	})
	.attr("fill-opacity", 0)
	.transition(t)
	.transition()
	.delay(100*Math.random())
	.duration(1000)
	.attr("fill-opacity", function(d){return d.Percent/5})
	//.delay(2000)
	.attr("y", function(d,i){
		//if(i<=d3obj[1].length/2){
		//	var priorScaleY = d3.scaleLinear().domain([0,d3obj[1].length/2]).range([height - 90, (height/2)+90])
		//}else{
		//	var priorScaleY = d3.scaleLinear().domain([d3obj[1].length/2,d3obj[1].length]).range([(height/2)-90, 10])
		//};
			priordestY.push(priorScaleY(i))
			return priorScaleY(i)
		})
	.attr("x", function(d,i){
		var rand = Math.random()
		//priordestX.push(priorScaleX((d.Percent)))//-i*20);
		priordestX.push(priorScaleX(d.Percent)-rand*500);
		//return priorScaleX((d.Percent))
		return ((priorScaleX(d.Percent)-rand*500)-(this.getComputedTextLength()+3))//(d.Title.length*(d.Percent+6)))
		})

prior.enter()
	.append("g")
	.append("text")
	.attr("class", "enter")
	.text(function(d){
		if(d.Percent == 0){
			d.Percent = 1;
			return "< 1% "+d.Title;
		}
		if(d.Title == "undefined"){
			 //d.Title = "Their first Job";
			d.Percent = 0;
		}
		////BARTENDER ALTERATION
		//if(d.Title == "Bartenders"){
			//return d.Percent+"% Other/Unclassifiable"
		//}
		 return d.Percent + "%  " + d.Title
		 })
	.attr("font-size",function(d){
		if(d.Title == "undefined"){
			first_pos = d.Percent;
			d.Percent = 0;
			return 0;
		}else{
			return ((d.Percent+6))}
	})
	.attr("y", function(d,i){
		//if(i<=d3obj[1].length/2){
		//	var priorScaleY = d3.scaleLinear().domain([0,d3obj[1].length/2]).range([height - 90, (height/2)+90])
		//}else{
		//	var priorScaleY = d3.scaleLinear().domain([d3obj[1].length/2,d3obj[1].length]).range([(height/2)-90, 10])
		//};
			priordestY.push(priorScaleY(i))
			return priorScaleY(i)
		})
	.attr("x", function(d,i){
		var rand = Math.random()
		//priordestX.push(priorScaleX((d.Percent)))//-i*20);
		priordestX.push(priorScaleX(d.Percent)-rand*500);
		//return priorScaleX((d.Percent))
		return ((priorScaleX(d.Percent)-rand*500)-(this.getComputedTextLength()+3))//(d.Title.length*(d.Percent+6)))
		})
	//.attr("y", function(d,i){priordestY.push(d*15+i*Math.random(1)+height/2);return d*15+i*Math.random(1)+height/2})
	//.attr("font-size",function(d){return ((d.Percent+6))})
	.attr("fill-opacity",0)
	.transition(t)
	.transition()
	.delay(100*Math.random())
	.duration(1000)
	//.delay(4000)
	//.duration(1500)
	.attr("fill-opacity", function(d){return d.Percent/10})



//var priorbbox = prior.selectAll("text").node().getBBox();
//
//var pbbrect = priorGroup.selectAll("g").selectAll("text").append("rect")
//	.attr("x", priorbbox.x)
//	.attr("y", priorbbox.y)
//	.attr("width", priorbbox.width)
//    .attr("height", priorbbox.height)
//	.style("fill", "red");



	for(var i=0; i<priordestX.length; i++){
		priorCurves.push({x:priordestX[i],y:priordestY[i]})
	}
	console.log(priorCurves)


//var priorCurves = []
//	for(var i=0; i<priordestX.length; i++){
//		curveHolder = []
//		curveHolder.push({x:originX,y:priorcontrol})
//		curveHolder.push({x:originX,y:priorcontrol+162})
//		curveHolder.push({x:priordestX[i]-15,y:priordestY[i]-142})
//		curveHolder.push({x:priordestX[i]-12,y:priordestY[i]})
//		priorCurves.push(curveHolder)
//	}
//
//
//var path = d3.line()
//	.x(function(d,i){return d.x})
//	.y(function(d,i){return d.y})
//	//.curve(d3.curveBasis)
//	.curve(d3.curveCardinal)
	
priorGroup.selectAll("path")
	.attr("class", "exit")
	.transition(t)
	.attr("d", function(el,i){
		if(forward){
			if(i> d3obj[2].length/2){
				return "M"+(originX-72)+","+postcontrol+
					" Q"+(originX-22)+","+(postcontrol)+
					" "+(-500)+","+(postcontrol)+
					" T"+(-1000)+","+(postcontrol);
			}else{
				return "M"+(originX-72)+","+postcontrol+
					" Q"+(originX-22)+","+(postcontrol)+
					" "+(-500)+","+(postcontrol)+
					" T"+(-1000)+","+(postcontrol);
			}
		}else{
			if(i> d3obj[2].length/2){
				//return "M"+(originX-72)+","+postcontrol+
					//" Q"+(originX-22)+","+(postcontrol)+
				return "M"+(originX+500)+","+postcontrol+
					" Q"+(originX+500)+","+(postcontrol)+
					" "+(originX+500)+","+(postcontrol-500)+
					" T"+(originX)+","+(postcontrol-1200);
			}else{
				return "M"+(originX+500)+","+postcontrol+
					" Q"+(originX+500)+","+(postcontrol)+
					" "+(originX)+","+(postcontrol+500)+
					" T"+(originX)+","+(postcontrol+1200);
			}
		}
	})
	.attr("stroke-opacity", 0)
	.remove()


for(var i=0;i<d3obj[1].length;i++){

priorGroup.append("path")
	.attr("class","enter")
	.attr("fill","none")
	//.attr("stroke", "white")
	.attr("stroke-opacity", 0)
	//.attr("d", "M"+originX+","+priorcontrol+" L"+(originX+10)+","+(priorcontrol)+" L"+originX+","+(priorcontrol+10))
	.attr("d", "M"+(originX-72)+","+postcontrol+
				" Q"+(originX-22)+","+(postcontrol)+
				" "+(originX-72-10)+","+postcontrol+
				" T"+(originX-72-10)+","+(postcontrol+12))
	.transition(t)
	//.delay(3500)
	.transition()
	.delay(100*Math.random())
	.duration(1000)
	.attr("stroke","black")
	.attr("stroke-opacity", d3obj[1][i].Percent/8)//function(d){return d/25})
	.attr("stroke-width", d3obj[1][i].Percent/2)
	////.attr("d", path(priorCurves[i]))		//[{x:originX,y:d3obj.prior.prior_percentages[i]}]))
	//.attr("d", "M"+originX+","+(priorcontrol-10)
				//+" Q"+originX+","+(priorcontrol+(height/8))
				//+" "+((i+1)*50+((originX-((i+1)*50))/2))+","+(priorcontrol+((priorScaleY(d3obj[1][i].Percent)-priorcontrol)/2))
				//+" T"+(((i+1)*50)-12)+","+priorScaleY(d3obj[1][i].Percent))
	.attr("d", "M"+(originX-72)+","+(postcontrol)
				+" Q"+(originX-300)+","+(postcontrol)//+(height/8)-i*10)
				+" "+((((originX-92)+priorCurves[i].x))/2)+","+((postcontrol+priorCurves[i].y)/2)
				+" T"+(priorCurves[i].x)+","+(priorCurves[i].y-5))


}


//var priorScaleY = d3.scaleLinear().domain([0,d3.max(d3obj[1], function(el){return el.Percent})]).range([height - 90, 90])
//var postScaleY= d3.scaleLinear().domain([0,d3obj[2].length]).range([height-90,90])
//var priorScaleY= d3.scaleLinear().domain([0,d3.max(d3obj[1], function(el){return el.Percent})]).range([height - 90, 90])
var postScaleY= d3.scaleLinear().domain([0,d3obj[2].length]).range([0, height])


//var priorScaleX = d3.scaleLinear().domain([0,d3.max(d3obj[1], function(el){return el.Percent})]).range([width/20,0])
//var postScaleX = d3.scaleLinear().domain([0,d3.max(d3obj[2],function(el){return el.Percent})]).range([width-(width/20),width/5*4])

var postScaleX = d3.scaleLinear().domain([0,d3.max(d3obj[2],function(el){return el.Percent})]).range([width,treeboundX])

//____________________
//
//POSTJOBS
//vvvv
//____________________



var postdestX = []
var postdestY = []

var postCurves = []

var post = postGroup.selectAll("text")
	.data(d3obj[2])


post.exit()
	.attr("class", "exit")
	.transition(t)
	.attr("x",0)
	.attr("fill-opacity",0)
	.remove();

post.attr("class", "update")
	.attr("y",postcontrol)
	.attr("x",originX+500)
	//.attr("y",originY-55)
	//.attr("x",function(d){if(forward===true){
	//		return originXpost
	//	}else if(forward===false){
	//		return originX-200
	//	}
	//	})
	.text(function(d){
		if(d.Percent == 0){
			d.Percent = 1;
			return "< 1% "+d.Title;
		}
		if(d.Title == "undefined"){
			 //d.Title = "Their first Job";
			first_pos = d.Percent;
			d.Percent = 0;
		}
		////BARTENDER ALTERATION
		//if(d.Title == "Bartenders"){
			//return d.Percent+"% Other/Unclassifiable"
		//}
		 return d.Percent + "%  " + d.Title
		 })
	.attr("font-size",function(d){
		if(d.Title == "undefined"){
			first_pos = d.Percent;
			d.Percent = 0;
			return 0;
		}else{
			return ((d.Percent+6))}
	})
	.attr("fill-opacity", 0)
	.transition(t)
	.transition()
	.delay(100*Math.random())
	.duration(1000)
	.attr("fill-opacity", function(d){return d.Percent/5})
	.attr("y", function(d,i){
		//if(i<=d3obj[2].length/2){
		//	var postScaleY = d3.scaleLinear().domain([0,d3obj[2].length/2]).range([height - 90, (height/2)+90])
		//}else{
		//	var postScaleY = d3.scaleLinear().domain([d3obj[2].length/2,d3obj[2].length]).range([(height/2)-90, 10])
		//};
			postdestY.push(postScaleY(i))
			return postScaleY(i)
		})
	.attr("x", function(d,i){
		var rand = Math.random()
		postdestX.push(postScaleX(d.Percent)+rand*500)
		return postScaleX(d.Percent)+rand*500
		})

post.enter()
	.append("g")
	.append("text")
	.attr("class", "enter")
	.text(function(d){
		if(d.Percent == 0){
			d.Percent = 1;
			return "< 1% "+d.Title;
		}
		if(d.Title == "undefined"){
			 //d.Title = "Their first Job";
			first_pos = d.Percent;
			d.Percent = 0;
		}
		////BARTENDER ALTERATION
		//if(d.Title == "Bartenders"){
			//return d.Percent + "% Other/Unclassifiable"
		//}
		return d.Percent +"%  "+ d.Title
	})
	.attr("font-size",function(d){
		if(d.Title == "undefined"){
			current_pos = d.Percent;
			d.Percent = 0;
			return 0;
		}else{
			return d.Percent+6}
	})
	.attr("y", function(d,i){
	//	if(i<=d3obj[2].length/2){
	//		//var postScaleY = d3.scaleLinear().domain([0,d3obj[2].length/2]).range([height - 90, (height/2)+90])
	//		var postScaleY = d3.scaleLinear().domain([0,d3obj[2].length/2]).range([ (height/2)+90,height - 90,])
	//	}else{
	//		//var postScaleY = d3.scaleLinear().domain([d3obj[2].length/2,d3obj[2].length]).range([(height/2)-90, 10])
	//		var postScaleY = d3.scaleLinear().domain([d3obj[2].length/2,d3obj[2].length]).range([ 10,(height/2)-90,])
	//	};
			postdestY.push(postScaleY(i));
			return postScaleY(i);
		})
	.attr("x", function(d,i){
		var rand = Math.random()
		postdestX.push(postScaleX(d.Percent)+rand*500)
		return postScaleX(d.Percent)+rand*500
		//postdestX.push(postScaleX((d.Percent))+((i+(10*rand))*20)-(d.Percent))//*rand+(i*20))
		//return postScaleX((d.Percent))+((i+(10*rand))*20)-(d.Percent)//*rand+(i*20)
		//
		//postdestX.push((postScaleX(d.Percent)+(i+1)*(rand*20)))
		//return (postScaleX(d.Percent)+(i+1)*(rand*20))

		//postdestX.push(postScaleX(d.Percent));
		//return postScaleX(d.Percent)
		//postdestX.push(postScaleX(d.Percent)*rand);
		//return postScaleX(d.Percent)*rand
		//postdestX.push(postScaleX(d.Percent+i/10));
		//return postScaleX(d.Percent+i/10)
	})
	.attr("fill-opacity",0)
	.transition(t)
	.transition()
	.delay(100*Math.random())
	.duration(1000)
	//.delay(4000)
	//.duration(1500)
	.attr("fill-opacity", function(d){return d.Percent/5})

	
	for(var i=0; i<postdestX.length; i++){
		postCurves.push({x:postdestX[i],y:postdestY[i]})
	}
	console.log(postCurves)

	

postGroup.selectAll("path")
	.attr("class", "exit")
	.transition(t)
	.attr("d", function(el,i){
		if(!forward){
			if(i> d3obj[2].length/2){
				return "M"+(originX-72)+","+postcontrol+
					" Q"+(originX+400)+","+(postcontrol)+
					" "+(width+500)+","+(postcontrol)+
					" T"+(width+2000)+","+(postcontrol);
			}else{
				return "M"+(originX-72)+","+postcontrol+
					" Q"+(originX+400)+","+(postcontrol)+
					" "+(width+500)+","+(postcontrol)+
					" T"+(width+2000)+","+(postcontrol);
			}
		}else{
			if(i> d3obj[2].length/2){
				return "M"+(originX-72)+","+postcontrol+
					" Q"+(originX+550)+","+(postcontrol)+
					" "+(originX)+","+(postcontrol+500)+
					" T"+(originX)+","+(postcontrol+1200);
			}else{
				return "M"+(originX-72)+","+postcontrol+
					" Q"+(originX+550)+","+(postcontrol)+
					" "+(originX)+","+(postcontrol-500)+
					" T"+(originX)+","+(postcontrol-1200);
			}
		}
	})
	.attr("stroke-opacity", 0)
	.remove()


for(var i=0;i<d3obj[2].length;i++){
postGroup.append("path")
	.attr("fill","none")
	//.attr("stroke", "white")
	.attr("stroke-opacity", 0)
	//.attr("d", "M"+originX+","+postcontrol+" L"+(originX+10)+","+(postcontrol)+" L"+originX+","+(postcontrol+10))
	.attr("d", "M"+(originX+500)+","+postcontrol+
				" Q"+(originX+450)+","+(postcontrol)+
				" "+(originX+490)+","+postcontrol+
				" T"+(originX+490)+","+(postcontrol+12))
	.transition(t)
	//.delay(3500)
	.transition()
	.delay(100*Math.random())
	.duration(1000)
	.attr("stroke","black")
	.attr("stroke-opacity", d3obj[2][i].Percent/8)//function(d){return d/25})
	.attr("stroke-width", d3obj[2][i].Percent/2)
	////.attr("d", path(postCurves[i]))		//[{x:originX,y:d3obj.post.post_percentages[i]}]))
	//.attr("d", "M"+originX+","+(postcontrol+10)
				//+" Q"+originX+","+(postcontrol-(height/8))
				//+" "+((i+1)*50+((originX-((i+1)*50))/2))+","+(postcontrol+((postScaleY(d3obj[2][i].Percent)-postcontrol)/2))
				//+" T"+(((i+1)*50)-12)+","+postScaleY(d3obj[2][i].Percent))
	.attr("d", "M"+(originX+500)+","+(postcontrol)
				//quadratic curve
				//+" Q"+(originX+700)+","+(postcontrol)
				//+" "+((((originXpost-92)+postCurves[i].x))/2)+","+((postcontrol+postCurves[i].y)/2)
				//+" T"+(postCurves[i].x+20)+","+(postCurves[i].y))

				//cubic curve
				+" C"+(originX+1000)+","+(postcontrol)
				+" "+(postCurves[i].x-280)+","+(postCurves[i].y)
				+" "+(postCurves[i].x)+","+(postCurves[i].y-5))


}
				//+" "+((i+1)*50+((originX-((i+1)*50))/2))+","+(postcontrol+((postScaleY(d3obj[2][i].Percent)-postcontrol)/2)+i*10)
				//+" T"+(((i+1)*50)-12)+","+postCurves[i].y)

//____________________
//
//MOUSEEVENTS vvvv
//
//____________________

	priorGroup.selectAll("text").on("mouseover",function(d,i){
		priorGroup.selectAll("path")
			.filter(function(d,t){return t===i})
			.transition()
			.duration(440)
			.attr("stroke-opacity",1)
			//.attr("stroke-width", 15)
	.attr("d", "M"+(originX-72)+","+(postcontrol)
				+" Q"+(originX-350)+","+(postcontrol)//+(height/8)-i*10)
				+" "+((((originX-92)+priorCurves[i].x))/2)+","+((postcontrol+priorCurves[i].y)/2)
				+" T"+(priorCurves[i].x)+","+(priorCurves[i].y-20))
		d3.select(this)
			.transition()
			.duration(440)
			//.attr("stroke-width", 20)
			.attr("font-size",36)
			//.attr("font-size",function(d){return d.Percent+7})
			//.attr("font-weight","bold")
			.attr("fill-opacity",1)
			.attr("y", priorScaleY(i)-20)//function(d,i){
	})

	priorGroup.selectAll("text").on("mouseout",function(d,i){
		priorGroup.selectAll("path")
			.filter(function(el,z){return z===i})
			.transition()
			.duration(440)
			.attr("stroke-opacity", d3obj[1][i].Percent/8)
			.attr("stroke-width", d3obj[1][i].Percent/2)
	.attr("d", "M"+(originX-72)+","+(postcontrol)
				+" Q"+(originX-300)+","+(postcontrol)//+(height/8)-i*10)
				+" "+((((originX-92)+priorCurves[i].x))/2)+","+((postcontrol+priorCurves[i].y)/2)
				+" T"+(priorCurves[i].x)+","+(priorCurves[i].y-5))
		d3.select(this)
			.transition()
			.duration(440)
			.attr("font-size",function(d){return d.Percent+6})
	.attr("font-size",function(d){
		if(d.Title == "undefined"){
			current_pos = d.Percent;
			d.Percent = 0;
			return 0;
		}else{
		return d.Percent+6}
	})
			.attr("fill-opacity", function(d){return d.Percent/8})
			.attr("y", priorScaleY(i))//function(d,i){
	})
	postGroup.selectAll("text").on("mouseover",function(d,i){
		postGroup.selectAll("path")
			.filter(function(d,t){return t===i})
			.transition()
			.duration(440)
			.attr("stroke-opacity",1)
			//.attr("stroke-width", 15)
			.attr("d", "M"+(originX+500)+","+(postcontrol)
				+" C"+(originX+1050)+","+(postcontrol)
				+" "+(postCurves[i].x-280)+","+(postCurves[i].y)
				+" "+(postCurves[i].x)+","+(postCurves[i].y-20));
		d3.select(this)
			.transition()
			.duration(440)
			.attr("font-size",36)
			//.attr("font-size",function(d){return d.Percent+7})
			//.attr("font-weight","bold")
			.attr("fill-opacity",1)
			.attr("y", postScaleY(i)-15)//function(d,i){
	})

	postGroup.selectAll("text").on("mouseout",function(d,i){
		postGroup.selectAll("path")
			.filter(function(el,z){return z===i})
			.transition()
			.duration(440)
			.attr("stroke-opacity", d3obj[2][i].Percent/8)
			.attr("stroke-width", d3obj[2][i].Percent/2)
			.attr("d", "M"+(originX+500)+","+(postcontrol)
				+" C"+(originX+1000)+","+(postcontrol)
				+" "+(postCurves[i].x-280)+","+(postCurves[i].y)
				+" "+(postCurves[i].x)+","+(postCurves[i].y-5));
		d3.select(this)
			.transition()
			.duration(440)
			.attr("font-size",function(d){return d.Percent+6})
	.attr("font-size",function(d){
		if(d.Title == "undefined"){
			current_pos = d.Percent;
			d.Percent = 0;
			return 0;
		}else{
		return d.Percent+6}
	})
			.attr("fill-opacity", function(d){return d.Percent/8})
			.attr("y", postScaleY(i))//function(d,i){
				//postdestY.push(postScaleY(i));
				//return postScaleY(i);
			//})
	})

//update function close paren
//	update(error,res,oes,userInput)


	priorGroup.selectAll("text").on("click",function(d,i){
		var obj = d3.select(this);
		transitionX = obj._groups[0][0].attributes.x.nodeValue;
		transitionY = obj._groups[0][0].attributes.y.nodeValue;
		userIn = d.Title
		update(error,res,oes,userIn,false,transitionX,transitionY)
	})
		

	postGroup.selectAll("text").on("click",function(d){
		var obj = d3.select(this);
		transitionX = obj._groups[0][0].attributes.x.nodeValue;
		transitionY = obj._groups[0][0].attributes.y.nodeValue;
		userIn = d.Title
		update(error,res,oes,userIn,true,transitionX,transitionY)
	})

	}
	//update close paren
	update(error,res,oes,userInput,true,transitionX,transitionY)

//____________________
//
//ZOOM
//
//____________________

var transform = d3.zoomIdentity;
var zoom = d3.zoom();

svg.call(d3.zoom()
	.on("zoom", zoomed) 
	.scaleExtent([1 / 2, 2]));

function zoomed() {
	postGroup.attr("transform", d3.event.transform);
	priorGroup.attr("transform", d3.event.transform);
	centerGroup.attr("transform", d3.event.transform);
}

//redraw();

/*
svg.on("mousemove", function() {
    var mouse = d3.mouse(this);
    xFisheye.focus(mouse[0]);
    yFisheye.focus(mouse[1]);
    //redraw();
  });

function redraw(){
	post.attr("x", xFisheye);
	post.attr("y", yFisheye);

	prior.attr("x", xFisheye);
	prior.attr("y", yFisheye);
}

*/





/*

	//__________________________________________________
	//
	// draw viz and interface VvV
	// VERTICLE
	//
	//__________________________________________________

	var height = 1800;
	var width = 1000;
	var margin = {left:20, right:20,top:20,bottom:20};


	var yscale = d3.scaleLinear().domain([height,0]).range([0,height])
	//var priorScale = d3.scaleLinear().domain([
	//var postScale = d3.scaleLinear().domain([
	
	var svg = d3.select('body')
		.append('svg')
		.attr('width',width)
		.attr('height',height)
		.style("border","0.5px dotted #990000");

	var centerGroup = svg.append('g').attr('transform', 'translate('+margin.left+','+margin.top+')')
		.attr("id", "focus");
	//var focusGroup = svg.append('g').attr('transform', 'translate('+margin.left+','+margin.top+')');
	var priorGroup = svg.append('g').attr('transform', 'translate('+margin.left+','+margin.top+')')
		.attr("id", "prior");
	var postGroup = svg.append('g').attr('transform', 'translate('+margin.left+','+margin.top+')')
		.attr("id", "post");



//
// display current focused position ____________________
//
//
//var center = centerGroup.selectAll("g")

var originX = width/2;
var originY = height/2

// focus display bar v
centerGroup.selectAll("g")
	.data(d3obj[0])
	.enter()
	.append("g")
	.append("text")
	.attr("x", originX+9)
	.attr("y", originY)
	.attr("font-size", 16)
	.text(function(d){console.log(d);return d.current})

centerGroup.append("line")
	.attr("x1", originX)
	.attr("y1", (height/2)+26)
	.attr("x2", 942)
	.attr("y2", (height/2)+26)
	.attr("stroke-width", "3")
	.attr("stroke", "black")
centerGroup.append("line")
	.attr("x1", originX)
	.attr("y1", (height/2)-42)
	.attr("x2", 942)
	.attr("y2", (height/2)-42)
	.attr("stroke-width", "3")
	.attr("stroke", "black")

// focus display bar ^

// search icond vv

centerGroup.append("line")
	.attr("x1", originX-20)
	.attr("y1", (height/2)+26)
	.attr("x2", originX-92)
	.attr("y2", (height/2)+26)
	.attr("stroke-width", "3")
	.attr("stroke", "black")
centerGroup.append("line")
	.attr("x1", originX-20)
	.attr("y1", (height/2)-42)
	.attr("x2", originX-92)
	.attr("y2", (height/2)-42)
	.attr("stroke-width", "3")
	.attr("stroke", "black")

centerGroup.append("circle")
	.attr("cx", originX-71)
	.attr("cy", (height/2)-20)
	.attr("r", 14)
	.attr("fill", "none")
	.attr("stroke", "black")
	.attr("stroke-width", 3)

centerGroup.append("line")
	.attr("x1", originX-56)
	.attr("y1", (height/2)-6)
	.attr("x2", originX-36)
	.attr("y2", (height/2)+13)
	.attr("stroke-width", 3)
	.attr("stroke", "black")


//// ^ search icon

var priorcontrol = (height/16)*9
var postcontrol = (height/16)*7
centerGroup.append("line")
	.attr("x1", originX)
	.attr("y1", postcontrol)
	.attr("x2", originX)
	.attr("y2", priorcontrol)
	.attr("stroke-width", "5")
	.attr("stroke", "black")


//
//
//display prior paths ____________________
//
var priorScaleY = d3.scaleLinear().domain([0,d3.max(d3obj[1], function(el){return el.Percent})]).range([(height/4)*3,height-90])
var postScaleY = d3.scaleLinear().domain([0,d3.max(d3obj[2],function(el){return el.Percent})]).range([height/4,90])


console.log(typeof(d3obj))
console.log(d3obj[1])
function rando(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


var priordestX = []
var priordestY = []
var prior = priorGroup.selectAll("g")
	//.data(d3.values(d3obj.prior.prior_percentages))
	.data(d3obj[1])
	//.data(d3.entries(d3obj[1]))
	//.data(d3.entries(d3obj.prior))
	//.data(d3obj.prior)
	.enter()
	.append("g")
	.append("text")
	.attr("x", function(d,i){
		console.log(d[1]);
		priordestX.push((i+1)*50);
		return (i+1)*50
		})
	.attr("y", function(d,i){
		priordestY.push(priorScaleY(d.Percent)-i*20);
		return priorScaleY(d.Percent)-i*20
		})
	//.attr("y", function(d,i){priordestY.push(d*15+i*Math.random(1)+height/2);return d*15+i*Math.random(1)+height/2})
	.attr("font-size",function(d){return d.Percent*3})
	.attr("fill-opacity", function(d){return d.Percent/25})
	.text(function(d){
		console.log(d.Percent);
		if(d.Title == "undefined") d.Title = "Their first Job";
		 return d.Percent + "% : " + d.Title
		 });

var priorCurves = []
	for(var i=0; i<priordestX.length; i++){
		priorCurves.push({x:priordestX[i],y:priordestY[i]})
	}
	console.log(priorCurves)


//var priorCurves = []
//	for(var i=0; i<priordestX.length; i++){
//		curveHolder = []
//		curveHolder.push({x:originX,y:priorcontrol})
//		curveHolder.push({x:originX,y:priorcontrol+162})
//		curveHolder.push({x:priordestX[i]-15,y:priordestY[i]-142})
//		curveHolder.push({x:priordestX[i]-12,y:priordestY[i]})
//		priorCurves.push(curveHolder)
//	}
//
//
//var path = d3.line()
//	.x(function(d,i){return d.x})
//	.y(function(d,i){return d.y})
//	//.curve(d3.curveBasis)
//	.curve(d3.curveCardinal)
	


for(var i=0;i<d3obj[1].length;i++){
priorGroup.append("path")
	.attr("fill","none")
	//.attr("stroke", "white")
	.attr("stroke-opacity", 0)
	//.attr("d", "M"+originX+","+priorcontrol+" L"+(originX+10)+","+(priorcontrol)+" L"+originX+","+(priorcontrol+10))
	.attr("d", "M"+originX+","+priorcontrol+" Q"+(originX)+","+(priorcontrol-142)+" "+(originX-10)+","+priorcontrol+" T"+(originX-10)+","+(priorcontrol-12))
	.transition()
	.delay(i*100*Math.random())
	.duration(2000)
	.attr("stroke","black")
	.attr("stroke-opacity", d3obj[1][i].Percent/25)//function(d){return d/25})
	.attr("stroke-width", d3obj[1][i].Percent/5)
	////.attr("d", path(priorCurves[i]))		//[{x:originX,y:d3obj.prior.prior_percentages[i]}]))
	//.attr("d", "M"+originX+","+(priorcontrol-10)
				//+" Q"+originX+","+(priorcontrol+(height/8))
				//+" "+((i+1)*50+((originX-((i+1)*50))/2))+","+(priorcontrol+((priorScaleY(d3obj[1][i].Percent)-priorcontrol)/2))
				//+" T"+(((i+1)*50)-12)+","+priorScaleY(d3obj[1][i].Percent))
	.attr("d", "M"+originX+","+(priorcontrol-10)
				+" Q"+originX+","+(priorcontrol+(height/8)-i*10)
				+" "+((i+1)*50+((originX-((i+1)*50))/2))+","+(priorcontrol+((priorScaleY(d3obj[1][i].Percent)-priorcontrol)/2)-i*10)
				+" T"+(((i+1)*50)-12)+","+priorCurves[i].y)


}


//
//
//display post paths ____________________
//

var postdestX = []
var postdestY = []
var post = postGroup.selectAll("g")
	//.data(d3.values(d3obj.post.post_percentages))
	.data(d3obj[2])
	//.data(d3.entries(d3obj.post))
	//.data(d3obj.post)
	.enter()
	.append("g")
	.append("text")
	.attr("x", function(d,i){postdestX.push((i+1)*50);return (i+1)*50})
	.attr("y", function(d,i){
		//if(i%2 == 0)
			postdestY.push(postScaleY(d.Percent)+i*20);
		//else
			//postdestY.push(postScaleY(d.Percent)-i*20);
		//if(i%2 == 0)
			return postScaleY(d.Percent)+i*20;
		//else
			//return postScaleY(d.Percent)-i*20;	
		})
	.attr("font-size",function(d){return d.Percent*3})
	.attr("fill-opacity", function(d){return d.Percent/25})
	.text(function(d){
		console.log(d.Percent);
		if(d.Title == "undefined") d.Title = "Their current Job";
		return d.Percent +"% : "+ d.Title
		});
	
var postCurves = []
	for(var i=0; i<postdestX.length; i++){
		postCurves.push({x:postdestX[i],y:postdestY[i]})
	}
	console.log(postCurves)


for(var i=0;i<d3obj[2].length;i++){
postGroup.append("path")
	.attr("fill","none")
	//.attr("stroke", "white")
	.attr("stroke-opacity", 0)
	//.attr("d", "M"+originX+","+postcontrol+" L"+(originX+10)+","+(postcontrol)+" L"+originX+","+(postcontrol+10))
	.attr("d", "M"+originX+","+postcontrol+" Q"+(originX)+","+(postcontrol+142)+" "+(originX-10)+","+postcontrol+" T"+(originX-10)+","+(postcontrol+12))
	.transition()
	.delay(i*100*Math.random())
	.duration(2000)
	.attr("stroke","black")
	.attr("stroke-opacity", d3obj[2][i].Percent/25)//function(d){return d/25})
	.attr("stroke-width", d3obj[2][i].Percent/5)
	////.attr("d", path(postCurves[i]))		//[{x:originX,y:d3obj.post.post_percentages[i]}]))
	//.attr("d", "M"+originX+","+(postcontrol+10)
				//+" Q"+originX+","+(postcontrol-(height/8))
				//+" "+((i+1)*50+((originX-((i+1)*50))/2))+","+(postcontrol+((postScaleY(d3obj[2][i].Percent)-postcontrol)/2))
				//+" T"+(((i+1)*50)-12)+","+postScaleY(d3obj[2][i].Percent))

	.attr("d", "M"+(originX+i/10)+","+(postcontrol+10)
				+" Q"+originX+","+((postcontrol-(height/8))+i*10)
				+" "+((i+1)*50+((originX-((i+1)*50))/2))+","+(postcontrol+((postScaleY(d3obj[2][i].Percent)-postcontrol)/2)+i*10)
				+" T"+(((i+1)*50)-12)+","+postCurves[i].y)

}


*/

}

