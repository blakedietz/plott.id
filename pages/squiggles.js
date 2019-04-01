/* eslint-disable jsx-a11y/anchor-is-valid */

import AppBar from "../src/components/appbar";
import Drawer from '@material-ui/core/Drawer';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import {saveSVG} from "../src/save-svg";
import {withStyles} from '@material-ui/core/styles';
import * as d3 from "d3";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';

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

    // For the appbar
    grow: {
        flexGrow: 1
    },

    paper: {
        color: theme.palette.text.secondary,
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
    },
    grid: {
        padding: theme.spacing.unit * 2
    },

    fullList: {
        width: 'auto',
    },
    sliderRoot: {
        width: 300,
    },
    slider: {
        padding: '22px 0px',
    },
    dividerRoot: {
        width: 300,
    },
    divider: {
        marginBottom: theme.spacing.unit * 2,
    },
    svgFont: {
        font: "bold 20px serif"
    }
});

let initialState = {
    visParams: {
        height: 2900,
        margin: .03,
        numberOfColumns: 13,
        numberOfRows: 22,
        points: [],
        rotate: 0,
        sideLength: 100,
        start: 1,
        translateX: 0,
        translateY: 0,
        width: 2000,
    },
    uiState: {
        drawerOpen: false,
        debugMode: false,
    },
};

initialState.visParams.points = createVisData(initialState.visParams.numberOfColumns, initialState.visParams.numberOfRows);

const ACTION_TYPES = {
    SET_VIS_PARAMS: "SET_VIS_PARAMS",
    SET_UI_STATE: "SET_UI_STATE",
};

const ACTION_CREATORS = {
    setvisParams: (params) => ({type: ACTION_TYPES.SET_VIS_PARAMS, payload: params}),
    setUiState: (params) => ({type: ACTION_TYPES.SET_UI_STATE, payload: params})
};

const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.SET_VIS_PARAMS:
            return {...state, visParams: {...state.visParams, ...payload}};
            break;
        case ACTION_TYPES.SET_UI_STATE:
            return {...state, uiState: {...state.uiState, ...payload}};
            break;
        default:
            return {...initialState};
    }
};

/*
 * References:
 * - http://www.tobiastoft.com/posts/an-intro-to-pen-plotters
 * - https://github.com/blakedietz/SymbolicDisarray/blob/master/SymbolicDisarray.pde
 * -
 * This code was cribbed from the above source.
 */

function createVisData() {
};

const Visualization = (props) => {
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

const SymbolicDisarray = ({classes}) => {
    const [
        {
            uiState: {
                drawerOpen,
                debugMode,
            },
            visParams: {
                height,
                margin,
                numberOfColumns,
                numberOfRows,
                points,
                rotate,
                sideLength,
                translateX,
                translateY,
                width,
            }
        },
        dispatch
    ] = useReducer(reducer, initialState);

    return (
        <div className={classes.root}>
            <AppBar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Symbolic Disarray
                </Typography>
                <IconButton onClick={() => {
                    dispatch(ACTION_CREATORS.setUiState({drawerOpen: true}));
                }}
                            color="inherit">
                    <EditIcon></EditIcon>
                </IconButton>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                ModalProps={{BackdropProps: {invisible: true}}}
                onClose={() => {
                    dispatch(ACTION_CREATORS.setUiState({drawerOpen: false}));
                }}>
                <div className={classes.fullList}>
                    <List>
                        <ListItem>
                            <div className={classes.sliderRoot}>
                                <Typography variant="h6">Parameters</Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={classes.sliderRoot}>
                                <Typography id="num-columns">Number of columns: {numberOfColumns}</Typography>
                                <Slider
                                    aria-labelledby="num-columns"
                                    classes={{container: classes.slider}}
                                    max={50}
                                    min={1}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({
                                            numberOfColumns: value,
                                            points: createVisData(value, numberOfRows)
                                        }));
                                    }}
                                    step={1}
                                    value={numberOfColumns}
                                />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={classes.sliderRoot}>
                                <Typography id="num-rows">Number of rows: {numberOfRows}</Typography>
                                <Slider
                                    aria-labelledby="num-rows"
                                    classes={{container: classes.slider}}
                                    max={50}
                                    min={1}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({
                                            numberOfRows: value,
                                            points: createVisData(numberOfColumns, value)
                                        }));
                                    }}
                                    step={1}
                                    value={numberOfRows}
                                />

                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={classes.sliderRoot}>
                                <Typography id="width">Width: {width}</Typography>
                                <Slider
                                    aria-labelledby="width"
                                    classes={{container: classes.slider}}
                                    max={10000}
                                    min={1}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({width: value}));
                                    }}
                                    step={1}
                                    value={width}
                                />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={classes.sliderRoot}>
                                <Typography id="hegiht">Height: {height}</Typography>
                                <Slider
                                    aria-labelledby="height"
                                    classes={{container: classes.slider}}
                                    max={10000}
                                    min={1}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({height: value}));
                                    }}
                                    step={1}
                                    value={height}
                                />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={classes.sliderRoot}>
                                <Typography id="margin">Margin: {margin}</Typography>
                                <Slider
                                    aria-labelledby="margin"
                                    classes={{container: classes.slider}}
                                    max={10000}
                                    min={0}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({margin: value}));
                                    }}
                                    value={margin}
                                />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={classes.sliderRoot}>
                                <Typography id="sideLength">Side Length: {sideLength}</Typography>
                                <Slider
                                    aria-labelledby="sideLength"
                                    classes={{container: classes.slider}}
                                    max={1080}
                                    min={0}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({sideLength: value}));
                                    }}
                                    value={sideLength}
                                />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={classes.dividerRoot}>
                                <Divider className={classes.divider}/>
                                <Typography variant="h6">Other</Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={() => saveSVG('#symbolic-disarray', 'symbolic-disarray')}>
                                Save as SVG
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" color="primary" className={classes.button} onClick={() => {
                                dispatch(ACTION_CREATORS.setvisParams({points: createVisData(numberOfColumns, numberOfRows)}));
                            }}>
                                Regenerate
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Typography id="debug">Debug mode</Typography>
                            <Switch
                                checked={debugMode}
                                onChange={() => {
                                    dispatch(ACTION_CREATORS.setUiState({debugMode: !debugMode}));
                                }}
                                color="primary"
                            />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <Grid className={classes.grid} container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Visualization
                            {...{
                                debugMode,
                                height,
                                margin,
                                numberOfColumns,
                                numberOfRows,
                                points,
                                rotate,
                                sideLength,
                                translateX,
                                translateY,
                                width,
                                classes
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

SymbolicDisarray.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SymbolicDisarray);
