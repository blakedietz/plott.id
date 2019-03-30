import * as d3 from "d3";

/*
 * References:
 * - http://www.tobiastoft.com/posts/an-intro-to-pen-plotters
 * - https://github.com/blakedietz/SymbolicDisarray/blob/master/SymbolicDisarray.pde
 * - 
 * This code was cribbed from the above source.
 */

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 *
 * @param start
 * @param maxNumberOfSquares
 * @param width
 * @param height
 */
export const render = (
    {
        maxNumberOfSquares = 50,
        height = 960,
        selector = "#symbolic-disarray",
        start = 1,
        width = 500,
        margin = .03,
        sideLength = 10,
        spacingX = 10,
        spacingY = 10
    } = {}) => {

    // const SQUARE_DIMENSION = Math.floor((height - margin) / maxNumberOfSquares);

    const range = d3.range(start, maxNumberOfSquares, 1);
    // Create the cartesian product to fill the grid uniformly
    const points = d3.cross(range, range);

    const svg = d3.select(selector)
        .attr("width", width)
        .attr("height", height);

    const xScale = d3.scaleLinear()
        .domain([start, maxNumberOfSquares])
        .range([0 + margin, width - margin]);

    const yScale = d3.scaleLinear()
        .domain([start, maxNumberOfSquares])
        .range([0 + margin, height - margin]);

    const rects = svg.selectAll("rect")
        .data(points);

    rects.exit().remove();

    rects
        .enter()
        .append("rect")
        .merge(rects)
        .attr("transform", ([row, column]) => {


            const φ = column > 2
                ? getRandomArbitrary(-column, column)
                : 0;

            return `rotate(${φ}, ${xScale(row)}, ${yScale(column)})`;
        })
        .attr("x", ([x, y]) => {
            return xScale(x);
        })
        .attr("y", ([x, y]) => {
            return yScale(y);
        })
        .attr("width", sideLength)
        .attr("height", sideLength)
        .style("stroke", "black")
        .style("fill", "none")
};
