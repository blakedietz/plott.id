import * as d3 from "d3";

/*
 * References:
 * - http://www.tobiastoft.com/posts/an-intro-to-pen-plotters
 * - https://github.com/blakedietz/SymbolicDisarray/blob/master/SymbolicDisarray.pde
 * - 
 * This code was cribbed from the above source.
 */


/**
 *
 * @param START
 * @param END
 * @param WIDTH
 * @param HEIGHT
 */
export const render = ({START = 1, END = 50, WIDTH = 500, HEIGHT = 960 } = {}) => {

    const margin = .03 * WIDTH;
    const SQUARE_DIMENSION = Math.floor((HEIGHT - margin) /  END);

    const range = d3.range(START, END, 1);
    // Create the cartesian product to fill the grid uniformly
    const points = d3.cross(range, range);

    const svg = d3.select("body").append("svg")
        .attr("width", WIDTH )
        .attr("height", HEIGHT);

    const xScale = d3.scaleLinear()
        .domain([START, END])
        .range([0 + margin, WIDTH - margin]);

    const yScale = d3.scaleLinear()
        .domain([START, END])
        .range([ HEIGHT - margin, 0 + margin]);

    const sideLength = 20;

    svg.selectAll("rect")
        .data(points)
        .enter()
        .append("rect")
        .attr("transform", ([x, y]) => {

            const φ = Math.random(0) * x;

            return `rotate(${φ}, ${xScale(x)}, ${yScale(y)})`;
        })
        .attr("x", ([x, y]) => {
            return xScale(x);
        })
        .attr("y", ([x, y]) => {
            return yScale(y);
        })
        .attr("width", SQUARE_DIMENSION)
        .attr("height", SQUARE_DIMENSION)
        .style("stroke", "black")
        .style("fill", "none")

    function toDegrees(rad) {
        return rad * (180/Math.PI);
    }

};
