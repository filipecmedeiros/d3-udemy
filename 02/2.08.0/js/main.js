/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/
var svg = d3.select('#chart-area')
    .append('svg')
        .attr('width', 500)
        .attr('height', 500);

d3.json('data/buildings.json').then(function(data){
    data.forEach(function (d){
        d.height = +d.height
    });
    console.log(data);

    var rect = svg.selectAll("rect")
        .data(data);

    rect.enter()
        .append('rect')
            .attr('x', (d, i)=> (i*75)+50)
            .attr('y', 0)
            .attr('width', 50)
            .attr('height', d=>d.height)
            .attr('fill', 'grey');

}).catch(function(error){
    console.log(error);
});