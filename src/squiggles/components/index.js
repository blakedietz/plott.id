import React from "react";

export const Visualization = (props) => {
    const {
        debugMode = false,
        points,
        numberOfColumns = 13,
        numberOfRows = 22,
        height = 2900,
        start = 1,
        width = 2000,
        margin = .03,
        sideLength = 150,
        spacingX = 10,
        spacingY = 10,
        translateX = 0,
        translateY = 0,
        rotate = 0,
        classes
    } = props;

    return (
        <svg
            id="symbolic-disarray"
            height={height}
            width={width}
        >
        </svg>
    );
};