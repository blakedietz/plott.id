const SVGLine = ({points}) => {
    const path = points.reduce((path, point, index) => {
        if (index === 0) {
            path += `M ${point[0]},${point[1]}`;
        } else {
            path += `L${Math.round(point[0] * 100) / 100},${Math.round(point[1]*100)/100}`
        }

        return path;
    }, "");

return (<path d={path} fill="black" stroke="rgb(0,0,0)" strokeWidth="2px"/>);

};
export {SVGLine};