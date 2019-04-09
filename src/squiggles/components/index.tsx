import React from "react";
import {SVGLine} from "./svg-line";

interface ISquiggleVisualizationProps {
    black: boolean,
    height: number,
    width: number,
    strokeWidth: number,
    squiggles: []
}

export const Visualization = ({
                                  black,
                                  height,
                                  width,
                                  strokeWidth,
                                  squiggles
                              }: ISquiggleVisualizationProps) => {

    const stroke = !black ? "black" : "white";

    return (
        <svg
            id="pixels-squiggles"
            height={height}
            width={width}
        >
            {squiggles.map((points, index) => (<SVGLine
                fill="none"
                key={index}
                points={points}
                stroke={stroke}
                strokeWidth={`${strokeWidth}px`}
            />))
            }
        </svg>
    );
};