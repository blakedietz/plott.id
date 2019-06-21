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
import {binaryTree} from "./algorithm/maze-generation/binary-tree";
import {ACTION_CREATORS, ALGORIGHTMS, initialState, reducer} from "./mazes.store";
import {saveSVG} from '../utilities/save-svg';
import {withStyles} from '@material-ui/core/styles';
import {sideWinder} from "./algorithm/maze-generation/sidewinder";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

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
    const [{grid, rows, columns, algorithm, debug}, dispatch] = useReducer(reducer, initialState);

    return (
        <div className={classes.root}>
            <AppContainer title="Mazes">
                <Maze
                    grid={grid}
                    width={400}
                    height={400}
                    debug={debug}
                />
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
                        <form autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="algorithm">Algorithm</InputLabel>
                                <Select
                                    value={algorithm}
                                    onChange={({ target: { value } }) => {
                                        dispatch(
                                            ACTION_CREATORS.setMazeParams({
                                                algorithm: value,
                                            }),
                                        );
                                    }}
                                    inputProps={{
                                        name: 'algorithm',
                                        id: 'algorithm',
                                    }}
                                >
                                    {Object.keys(ALGORIGHTMS).map(algorithm=> {
                                        return (
                                            <MenuItem key={algorithm} value={algorithm}>
                                                {algorithm}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </form>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                let grid;
                                if (ALGORIGHTMS.BINARY_TREE) {
                                    grid = binaryTree(new GridModel({rows, columns}));
                                }
                                else {

                                    grid = sideWinder(new GridModel({rows, columns}));
                                }

                                dispatch(ACTION_CREATORS.setMazeParams({grid}));
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
                    <ListItem>
                        <div className={classes.dividerRoot}>
                            <Divider className={classes.divider} />
                            <Typography variant="h6">Debug</Typography>
                        </div>
                    </ListItem>
                    <ListItem>
                        <Typography id="debug">Distance from root</Typography>
                        <Switch
                            checked={debug.displayDistancesFromRoot}
                            onChange={() => {
                                dispatch(
                                    ACTION_CREATORS.setMazeParams({ debug: {...debug, displayDistancesFromRoot: !debug.displayDistancesFromRoot}}),
                                );
                            }}
                            color="primary"
                        />
                    </ListItem>
                    <ListItem>
                        <Typography id="debug">Distance from solution</Typography>
                        <Switch
                            checked={debug.displaySolutionDistances}
                            onChange={() => {
                                dispatch(
                                    ACTION_CREATORS.setMazeParams({ debug: {...debug, displaySolutionDistances: !debug.displaySolutionDistances}}),
                                );
                            }}
                            color="primary"
                        />
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
