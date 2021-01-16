var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import data from csv
d3.csv("assets/data/data.csv").then(function(dataVar) {
  console.log(dataVar)
    //Parse Data/Cast as numbers
    dataVar.forEach(function(data){
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });
  
  //Create linear scale functions
  var xLinearScale = d3.scaleLinear()
    .domain([9, d3.max(dataVar, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([4, d3.max(dataVar, d => d.healthcare)])
    .range([height, 0]);
  
  //Create axis functions 
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //Append axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  //Create circles for the states
  var circlesGroup = chartGroup.selectAll("circle")
    .data(dataVar)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

  
});
