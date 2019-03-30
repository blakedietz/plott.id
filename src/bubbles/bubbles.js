import * as d3 from "d3";

function wiggle(range, point) {
    return Math.sin(Math.random()) + point;
    // if (point < (range / 2) ) {
    //     return point;
    // }
    // else {
    //     const isNegative = Math.random() >= .50;
    //     const wiggleRoom =  (Math.random());
    //
    //     return isNegative ? -wiggleRoom + point : wiggleRoom + point;
    // }
}

function randomScale(point) {
    return Math.sqrt(point ^ 2 / (Math.PI + (Math.random() * point)));
}

export const render = (
    {
        START = 1,
        END = 50,
        WIDTH = 960,
        HEIGHT = 500,
        SELECTOR = "#bubbles"
    } = {}
) => {
    const margin = .03 * WIDTH;

    const range = d3.range(START, END, 1);
    // Create the cartesian product to fill the grid uniformly
    const points = d3.cross(range, range);

    const svg = d3.select(SELECTOR)
        .attr("width", WIDTH)
        .attr("height", HEIGHT);

    const xScale = d3.scaleLinear()
        .domain([START, END])
        .range([0 + margin, WIDTH - margin]);

    const yScale = d3.scaleLinear()
        .domain([START, END])
        .range([HEIGHT - margin, 0 + margin]);

    // Join data
    const bubbles = svg.selectAll("circle")
        .data(points);

    // Remove elements
    bubbles.exit().remove();

    // Add and update elements
    bubbles
        .enter()
        .append("circle")
        .merge(bubbles)
        .attr("cx", ([x, y]) => {
            return xScale(wiggle(range, x));
        })
        .attr("cy", ([x, y]) => {
            return yScale(wiggle(range, y));
        })
        .attr("r", ([x, y]) => {
            return 3 + ((y * Math.random()) * .50);
        })
        .style("stroke", "black")
        .style("fill", "none")
};
