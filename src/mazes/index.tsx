/* eslint-disable jsx-a11y/anchor-is-valid */

import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {binaryTree} from "./algorithm/binary-tree";
import {Grid as GridModel} from "./grid";
import {Maze} from "./components/maze";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        textAlign: 'center',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    drawer: {
        width: '400px',
    },
});

const Index = ({ classes }) => {
    const [{grid}, setState] = useState({grid: (new GridModel({rows: 4, columns: 4}))});

    return (
        <div>
            <Maze grid={grid} width={400} height={400} />
            <button onClick={() => {
                const binaryGrid = binaryTree((new GridModel({rows: 4, columns: 4})));
                setState({grid: binaryGrid});
            }}></button>
        </div>
    );
};

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
