function drawMap(figure) {
    /* 
       plot the state map!

       drawMap(figure,geoJson,stateHapps);
         -figure is a d3 selection
         -geoJson is the loaded us-states file
         -stateHapps is the loaded csv (state,val)
    */

    //Width and height
    var w = 800;
    var h = 600;

    //Define map projection
    var projection = d3.geo.albersUsa()
	.translate([w/2, h/2])
	.scale(1000);

    //Define path generator
    var path = d3.geo.path()
	.projection(projection);

    //Define quantize scale to sort data values into buckets of color
    var color = d3.scale.quantize()
	.range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
    //Colors taken from colorbrewer.js, included in the D3 download

    // remove an old figure if it exists
    figure.select(".canvas").remove();

    //Create SVG element
    var canvas = figure
	.append("svg")
	.attr("class", "canvas")
	.attr("width", w)
	.attr("height", h);
    
    //Set input domain for color scale
    color.domain([
	d3.min(allData, function(d) { return d.avhapps; }), 
	d3.max(allData, function(d) { return d.avhapps; })
    ]);

    stateFeatures = topojson.feature(geoJson,geoJson.objects.states).features;

    //Bind data and create one path per GeoJSON feature
    var states = canvas.selectAll("path")
	.data(stateFeatures);
    
    states.enter()
	.append("path")
	.attr("d", function(d,i) { return path(d.geometry); } )
	.attr("id", function(d,i) { return d.properties.name; } )
	.attr("class", "state")
        .on("mousedown",state_clicked)
        .on("mouseover",state_hover)
        .on("mouseout",state_unhover);

    states.exit().remove();

    states
         .style("fill", function(d,i) {
	    // need to get the variable map right
    	    var value = allData[i].avhapps;
	    var numWords = d3.sum(allData[i].freq); // d3.sum(d.properties.freq);
    	    if (numWords > 10000) {
    		return color(value);
    	    } else {
    		return "#ccc";
    	    }
    	});

    function state_clicked(d,i) { 
	// next line verifies that the data and json line up
	// console.log(d.properties.name); console.log(allData[i].name); 

	// toggle the reference
	if (shiftRef !== i) {
	    console.log("reference "+allData[i].name);
	    shiftRef = i;
	    d3.selectAll(".state").attr("stroke","none");
	    d3.select(this).attr("stroke","black")
	        .attr("stroke-width",3);
	}
	else { 
	    console.log("reference everything");
	    shiftRef = 51;
	    d3.select(this).attr("stroke","none");
	        //.attr("stroke-width",3);
	}
	
	if (shiftRef !== shiftComp) {
	    shiftObj = shift(allData[shiftRef].freq,allData[shiftComp].freq,lens,words);
	    plotShift(d3.select('#shift01'),shiftObj.sortedMag.slice(0,200),
		      shiftObj.sortedType.slice(0,200),
		      shiftObj.sortedWords.slice(0,200),
		      shiftObj.sumTypes,
		      shiftObj.refH,
		      shiftObj.compH);
	}
    }

    function state_hover(d,i) { 
	// next line verifies that the data and json line up
	// console.log(d.properties.name); console.log(allData[i].name); 
	shiftComp = i;
	d3.select(this).style("fill","red");

	if (shiftRef !== shiftComp) {
	    shiftObj = shift(allData[shiftRef].freq,allData[shiftComp].freq,lens,words);
	    plotShift(d3.select('#shift01'),shiftObj.sortedMag.slice(0,200),
		      shiftObj.sortedType.slice(0,200),
		      shiftObj.sortedWords.slice(0,200),
		      shiftObj.sumTypes,
		      shiftObj.refH,
		      shiftObj.compH);
	}
	if (shiftRef !== shiftComp) { 
	    console.log("comparison "+allData[shiftComp].name);
	    //shift(); 
	}
    }

    function state_unhover(d,i) { 
	// next line verifies that the data and json line up
	// console.log(d.properties.name); console.log(allData[i].name); 
	shiftComp = i;
	d3.select(this)
         .style("fill", function() {
	    // need to get the variable map right
    	    var value = allData[i].avhapps;
	    var numWords = d3.sum(allData[i].freq); // d3.sum(d.properties.freq);
    	    if (numWords > 10000) {
    		return color(value);
    	    } else {
    		return "#ccc";
    	    }
    	});
    }

};








