/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", "400")
        .attr("height", "400");

d3.json("data/test.json").then(function(data){

    data.forEach(d => {
        d.upstream = +d.upstream;
    });
    console.log(data);

    var y = d3.scaleBand()
        .domain(data.map(function(d){
            return d.promoter;
        }))
        .range([0, 400])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    var x = d3.scaleLinear()
        .domain([0,1000])
        .range([0,400]);

    var line = svg.selectAll("line")
        .data(data);
    
    line.enter()
        .append('line')
            .attr('x1', 0)
            .attr('y1', (d,i)=>y(d.promoter))
            .attr('x2', 400)
            .attr('y2', (d,i)=>y(d.promoter))
            .attr('stroke-width', 1)
            .attr('stroke', 'black');


    var circle = svg.selectAll("circle")
            .data(data)
        .enter()
            .append("circle")
            .attr("cy", function(d){
                return y(d.promoter)
            })
            .attr("cx", function(d){
               return x(d.upstream)
            })
            .attr("r", 5)
            .attr("fill", function(d) {
                return "black";
            });
    

}).catch(function(error){
    console.log(error)
    });



