const margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// Parse the date / time
const parseDate = d3.time.format('%a %b %e %X %Z %Y').parse;

// Set the ranges
const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]);

// Define the axes
const xAxis = d3.svg
  .axis()
  .scale(x)
  .orient('bottom')
  .ticks(10);

const yAxis = d3.svg
  .axis()
  .scale(y)
  .orient('left')
  .ticks(10);

// Define the line
const valueline = d3.svg
  .line()
  .x(function(d) {
    return x(d.datetime);
  })
  .y(function(d) {
    return y(d.score);
  });

// Adds the svg canvas
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Get the data
d3.csv('data.csv', function(error, data) {
  data.forEach(function(d) {
    d.datetime = parseDate(d.datetime);
    d.score = d.score;
  });

  // Scale the range of the data
  x.domain(
    d3.extent(data, function(d) {
      return d.datetime;
    })
  );
  y.domain([
    // d3.min(data, function(d) {
    //   return d.score;
    // }),
    -6,
    d3.max(data, function(d) {
      return d.score;
    }),
  ]);

  // Add the valueline path.
  svg
    .append('path')
    .attr('class', 'line')
    .attr(
      'd',
      valueline(data, function(d) {
        return d;
      })
    );

  // Add the X Axis
  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(-6,' + height + ')')
    .call(xAxis);

  // Add the Y Axis
  svg
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  svg
    .append('text')
    .call(yAxis)
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.9em')
    .attr('text-anchor', 'end')
    .text('Sentiment score');
});
