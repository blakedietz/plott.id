import * as d3 from "d3";
import {getRandomArbitrary} from "../algorithms";
import React from "react";

export const Visualization = (props) => {
    const {
        classes,
        debugMode = false,
        height = 2900,
        margin = .03,
        numberOfColumns = 13,
        numberOfRows = 22,
        points,
        sideLength = 150,
        start = 1,
        width = 2000
    } = props;

    const internalMargin = margin + (sideLength * 4);

    const xScale = d3.scaleLinear()
        .domain([start, numberOfColumns])
        .range([internalMargin, width - internalMargin]);

    const yScale = d3.scaleLinear()
        .domain([start, numberOfRows])
        .range([internalMargin, height - internalMargin]);

    return (
        <svg
            id="symbolic-disarray"
            height={height}
            width={width}
        >
            {
                points.map(([column, row, φ]) => {
                    const centerX = xScale(column);
                    const centerY = yScale(row);

                    const squareCenterX = centerX - (sideLength / 2);
                    const squareCenterY = centerY - (sideLength / 2);

                    return (
                        <rect
                            key={`${column}-${row}`}
                            x={squareCenterX + φ}
                            y={squareCenterY + φ}
                            transform={`rotate(${φ}, ${centerX}, ${centerY})`}
                            width={sideLength}
                            height={sideLength}
                            fill="none"
                            stroke="black"
                        />
                    );
                })
            }
            {
                debugMode &&
                points.map(([column, row]) => {
                    const φ = row > 2
                        ? getRandomArbitrary(-column, column)
                        : 0;

                    return (
                        <circle
                            key={`${column}-${row}`}
                            cx={xScale(column)}
                            cy={yScale(row)}
                            r={1}
                            fill="red"
                            stroke="red"
                        />
                    );
                })
            }
            <text
                className={classes.svgFont}
                x={xScale(0)}
                y={yScale(numberOfRows) + 200}
            >
                Symbolic Disarray
            </text>
        </svg>
    );
};
