const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 167];
//const dataset = [4, 6, 1, 8, 5];
const svgWidth = 500,
  svgHeight = 300;
//barPadding = 5;
//const barWidth = svgWidth / dataset.length;

const svg = d3
  .select('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, svgWidth]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([svgHeight, 0]);

const x_axis = d3.axisBottom().scale(xScale);

const y_axis = d3.axisLeft().scale(yScale);

svg
  .append('g')
  .attr('transform', 'translate(50, 10)')
  .call(y_axis);

const xAxisTranslate = svgHeight - 20;
svg
  .append('g')
  .attr('transform', 'translate(50, ' + xAxisTranslate + ')')
  .call(x_axis);
// const barChart = svg
//   .selectAll('rect')
//   .data(dataset)
//   .enter()
//   .append('rect')
//   .attr('y', function(d) {
//     return svgHeight - yScale(d);
//   })
//   .attr('height', function(d) {
//     return yScale(d);
//   })
//   .attr('width', barWidth - barPadding)
//   .attr('transform', function(d, i) {
//     let translate = [barWidth * i, 0];
//     return 'translate(' + translate + ')';
//   });

// const text = svg
//   .selectAll('text')
//   .data(dataset)
//   .enter()
//   .append('text')
//   .text(function(d) {
//     return d;
//   })
//   .attr('y', function(d, i) {
//     return svgHeight - d - 2;
//   })
//   .attr('x', function(d, i) {
//     return barWidth * i;
//   })
//   .attr('fill', 'rgb(178,34,34)');
