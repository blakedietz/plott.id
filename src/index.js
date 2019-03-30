import React from "react";
import ReactDOM from "react-dom";
// import {render as renderCircle } from "./circle/circle";
// import {render as renderSymbolicDissarray} from "./symbolic-disarray/symbolic-dissarray";
import App from "./containers/app";
// renderCircle({END: 20});
// renderSymbolicDissarray({END: 5});

ReactDOM.render(
    <App></App>,
    document.getElementById("app")
);
