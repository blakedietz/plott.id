import React from "react";
import {styles} from "./index.style";
import {withStyles} from "@material-ui/core";

export const App = ({classes}) => {
    const {
        app,
        holyGrail,
        holyGrailAds,
        holyGrailBody,
        holyGrailContent,
        holyGrailFooter,
        holyGrailHeader,
        holyGrailNav
    } = classes;

    return (
        <div className={app}>
            <header className={holyGrailHeader}>header</header>
            <div className={holyGrail}>
                <div className={holyGrailBody}>
                    <nav className={holyGrailNav}>Nav</nav>
                    <main className={holyGrailContent}>Content</main>
                    <aside className={holyGrailAds}>Side bar</aside>
                </div>
            </div>
            <footer className={holyGrailFooter}>footer</footer>
        </div>
    );
};

export default withStyles(styles)(App);
