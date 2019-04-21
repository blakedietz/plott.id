/* eslint-disable jsx-a11y/anchor-is-valid */

import AppContainer from '../components/layout';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React, {useReducer} from 'react';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import {Grid as GridModel} from "./grid";
import {Maze} from "./components/maze";
import {binaryTree} from "./algorithm/binary-tree";
import {reducer, ACTION_CREATORS, initialState} from "./mazes.store";
import {saveSVG} from '../utilities/save-svg';
import {withStyles} from '@material-ui/core/styles';

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

const Index = ({classes}) => {
    const [{grid, rows, columns}, dispatch] = useReducer(reducer, initialState);

    return (
        <div className={classes.root}>
            <AppContainer title="Mazes">
                <Maze grid={grid} width={400} height={400}/>
            </AppContainer>
            <Drawer anchor="right" variant="permanent" className={classes.drawer}>
                <List>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => saveSVG('#mazes', 'mazes')}
                        >
                            Save as SVG
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                const binaryGrid = binaryTree((new GridModel({rows, columns})));
                                dispatch(ACTION_CREATORS.setMazeParams({grid: binaryGrid}));
                            }}
                        >
                            Generate maze
                        </Button>
                    </ListItem>
                    <ListItem>
                        <form autoComplete="off">
                            <TextField
                                id="rows"
                                type="number"
                                step="1"
                                min="1"
                                max="10000"
                                label="Rows"
                                value={rows}
                                onChange={event => {
                                    dispatch(
                                        ACTION_CREATORS.setMazeParams({
                                            rows: Number(event.target.value),
                                        }),
                                    );
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                        </form>
                    </ListItem>
                    <ListItem>
                        <form autoComplete="off">
                            <TextField
                                id="rows"
                                type="number"
                                step="1"
                                min="1"
                                max="10000"
                                label="Columns"
                                value={columns}
                                onChange={event => {
                                    dispatch(
                                        ACTION_CREATORS.setMazeParams({
                                            columns: Number(event.target.value),
                                        }),
                                    );
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                        </form>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
