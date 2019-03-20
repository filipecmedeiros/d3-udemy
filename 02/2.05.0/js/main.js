/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select("#chart-area").append("svg")
    .attr('width', 500)
    .attr('height', 400);

var line = svg.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 500)
    .attr('y2', 400)
    .attr('stroke', 'blue')
    .attr('stroke-width', 1);

var rect = svg.append('rect')
    .attr('x', 200)
    .attr('y', 10)
    .attr('width', 250)
    .attr('height', 50)
    .attr('fill', 'grey');

var ellipse = svg.append('ellipse')
    .attr('cx', 75)
    .attr('cy', 350)
    .attr('rx', 50)
    .attr('ry', 20)
    .attr('fill', 'yellow');

