/**
 * main.js
 * Filipe Cordeiro de Medeiros Azevedo
 * Cis-Element visualization by promoter
*/

var margin = {'left': 100, 'right': 120, 'top': 10, 'bottom': 100};

var width = 1020 - margin.left - margin.right;
var height = 1000 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left 
                + ", " + margin.top + ")")

d3.json("data/dataset.json").then(function(data){
    console.log(data);
    
    data.forEach(function(d) {
        d.upstream = JSON.parse(d.upstream);
        d.downstream = JSON.parse(d.downstream);
    });
    console.log(data);

    var y = d3.scaleBand()
        .domain(data.map(function(d){
            return d.promoter_id;
        }))
        .range([0, height])
        .paddingInner(0)
        .paddingOuter(1);

    var x = d3.scaleLinear()
        .domain([0,1000])
        .range([0,width]);
    
    var color = d3.scaleSequential(d3.interpolateRainbow);
    var motif = d3.scaleBand()
        .domain(data.map(function(d){
            return d.tf;
        }))
        .range([0,1]);

    var line = g.selectAll("line")
        .data(data);

    line.enter()
        .append('line')
            .attr('x1', 0)
            .attr('y1', (d,i)=>y(d.promoter_id)-1)
            .attr('x2', width)
            .attr('y2', (d,i)=>y(d.promoter_id)-1)
            .attr('stroke-width', 1)
            .attr('stroke', 'black');


    var circleGroups = g.selectAll("g.circles")
    .data(data)
        .enter()
        .append("g")
        .attr("class", "circles");


    var circle = circleGroups.selectAll("circle")
            .data(getCircleDataUp)
        .enter()
            .append("circle")
            .attr("cy", function(d){
                return y(d.promoter_id)-1
            })
            .attr("cx", function(d){
            return x(d.upstream)
            })
            .attr("r", 5)
            .attr("fill", function(d) {
                return color(motif(d.tf));
            })
            .attr("stroke-width", 1)
            .attr("stroke", "black");
    
    var circle = circleGroups.selectAll("circle")
            .data(getCircleDataDown)
        .enter()
            .append("circle")
            .attr("cy", function(d){
                return y(d.promoter_id)-1
            })
            .attr("cx", function(d){
            return x(d.downstream)
            })
            .attr("r", 5)
            .attr("fill", function(d) {
                return color(motif(d.tf));
            })
            .attr("stroke-width", 1)
            .attr("stroke", "black");

    function getCircleDataUp(d) {
        var cdata = d.upstream.map (function(ele) { 
            return {upstream: ele, promoter_id: d.promoter_id, tf:d.tf};
        });

        return cdata; 
    }

    function getCircleDataDown(d) {
        var cdata = d.downstream.map (function(ele) { 
            return {downstream: ele, promoter_id: d.promoter_id, tf:d.tf};
        });

        return cdata; 
    }

    var yAxisGroup = d3.selectAll('svg').append('g')
                           .attr('class','yAxis')
                           .attr('transform','translate(' + margin.left + ', 0)');
    var yAxis = d3.axisLeft(y);
    yAxisGroup.call(yAxis);


    var xAxisGroup = d3.selectAll('svg').append('g')
                           .attr('class','xAxis')
                           .attr('transform','translate('+margin.left+','+height+')');
    var xAxis = d3.axisBottom(x);
    xAxisGroup.call(xAxis);

    var legendScale = d3.scaleBand()
                        .domain(data.map(d=>d.tf))
                        .range([0, height]);

    var legend = d3.selectAll('svg').append("g")
        .attr("class", "legend")
        .attr("x", width+margin.left + 15)
        .attr("y", 50)
        .attr("height", height)
        .attr("width", 100);
    
    var legend = legend.selectAll(".legend")
                .data(data)
                .enter();

    legend.append("circle")
            .attr("cx", width + margin.left + 25)
            .attr("cy", d=>legendScale(d.tf)+25)
            .attr("r", 5)
            .style("fill", function(d) {
                return color(motif(d.tf));
            });
    
    legend.append("text")
        .attr("x", width + margin.left + 45)
        .attr("y", d=>legendScale(d.tf)+30)
        .text(d=>d.tf)
        .attr("font-weight", "bold");
    });