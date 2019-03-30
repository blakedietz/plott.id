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
import SaveIcon from '@material-ui/icons/Save';
import Slider from '@material-ui/lab/Slider';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import {render} from "../src/symbolic-disarray/symbolic-dissarray"
import {saveSVG} from "../src/save-svg";
import {withStyles} from '@material-ui/core/styles';
import * as d3 from "d3";

const styles = theme => ({
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

    speedDialWrapper: {
        height: 380,
        top: 30,
        right: 30,
        position: 'fixed',
    },
    speedDial: {
        position: 'absolute',
        '&$directionUp': {
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 3,
        }
    },
    directionUp: {},
});

const initialState = {
    visParams: {
        maxNumberOfSquares: 5,
        sideLength: 100,
        translateX: 0,
        translateY: 0,
        rotate: 0

    },
    uiState: {
        drawerOpen: false,
        height: 500,
        margin: .03,
        speedDialOpen: false,
        width: 960,
        sideLength: 150
    },
};

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

const Visualization = (props) => {
    const {
        maxNumberOfSquares = 50,
        height = 960,
        start = 1,
        width = 500,
        margin = .03,
        sideLength = 150,
        spacingX = 10,
        spacingY = 10,
        translateX = 0,
        translateY = 0,
        rotate=0
    } = props;

    /*
     * References:
     * - http://www.tobiastoft.com/posts/an-intro-to-pen-plotters
     * - https://github.com/blakedietz/SymbolicDisarray/blob/master/SymbolicDisarray.pde
     * -
     * This code was cribbed from the above source.
     */

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    const range = d3.range(start, maxNumberOfSquares, 1);
    // Create the cartesian product to fill the grid uniformly
    const points = d3.cross(range, range);

    const xScale = d3.scaleLinear()
        .domain([start, maxNumberOfSquares])
        .range([0 + margin, width - margin]);

    const yScale = d3.scaleLinear()
        .domain([start, maxNumberOfSquares])
        .range([0 + margin, height - margin]);

    const rectangles = points.map(([column, row]) => {
        const φ = row > 2
            ? getRandomArbitrary(-column, column)
            : 0;

        return (
                <rect
                    key={`${column}-${row}`}
                    x={xScale(column)}
                    y={yScale(row)}
                    // transform={`rotate(${φ}, ${xScale(row)}, ${yScale(column)})`}
                    width={sideLength}
                    height={sideLength}
                    fill="none"
                    stroke="black"
                ></rect>
        );

    });
    return (
        <svg
            id="symbolic-disarray"
            height={height}
            width={width}
        >
            {
                points.map(([column, row]) => {
                    const φ = row > 2
                        ? getRandomArbitrary(-column, column)
                        : 0;

                    return (
                        <rect
                            key={`${column}-${row}`}
                            x={xScale(column) - sideLength/2}
                            y={yScale(row) - sideLength/2}
                            // transform={`rotate(${rotate}) translate(${translateX}, ${translateY})`}
                            transform={`rotate(${rotate}, ${xScale(column)}, ${yScale(row)})`}
                            width={sideLength}
                            height={sideLength}
                            fill="none"
                            stroke="black"
                        ></rect>
                    );
                })
            }
            {
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
                        ></circle>
                    );
                })
            }

        </svg>
    );
};

const actions = [
    {
        icon: <SaveIcon/>, name: 'Save', onClick: () => {
            saveSVG('#symbolic-disarray', 'symbolic-disarray')
        }
    },
];

const SymbolicDisarray = ({classes}) => {
    const [

        {
            uiState: {
                drawerOpen,
                height,
                margin,
                speedDialOpen,
                width,
            },
            visParams: {
                maxNumberOfSquares,
                sideLength,
                translateX,
                translateY,
                rotate
            }
        },
        dispatch
    ] = useReducer(reducer, initialState);

    const speedDialClassName = classNames(
        classes.speedDial,
        classes[`directionUp`],
    );

    const handleXorDial = () => {
        dispatch(ACTION_CREATORS.setUiState({speedDialOpen: !speedDialOpen}))
    };

    const handleOpenDial = () => {
        dispatch(ACTION_CREATORS.setUiState({speedDialOpen: true}))
    };

    const handleCloseDial = () => {
        dispatch(ACTION_CREATORS.setUiState({speedDialOpen: false}))
    };

    const setmaxNumberOfSquares = (value) => {
        dispatch(ACTION_CREATORS.setvisParams({maxNumberOfSquares: Number(value)}));
    };

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
                                <Typography id="num-squares">Number of squares: {maxNumberOfSquares}</Typography>
                                <Slider
                                    aria-labelledby="num-squares"
                                    classes={{container: classes.slider}}
                                    max={50}
                                    min={1}
                                    onChange={(event, value) => {
                                        setmaxNumberOfSquares(value)
                                    }}
                                    step={1}
                                    value={maxNumberOfSquares}
                                />
                                <Typography id="width">Width: {width}</Typography>
                                <Slider
                                    aria-labelledby="width"
                                    classes={{container: classes.slider}}
                                    max={1920}
                                    min={1}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setUiState({width: value}));
                                    }}
                                    step={1}
                                    value={width}
                                />
                                <Typography id="hegiht">Height: {height}</Typography>
                                <Slider
                                    aria-labelledby="height"
                                    classes={{container: classes.slider}}
                                    max={1080}
                                    min={1}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setUiState({height: value}));
                                    }}
                                    step={1}
                                    value={height}
                                />
                                <Typography id="margin">Margin: {margin}</Typography>
                                <Slider
                                    aria-labelledby="margin"
                                    classes={{container: classes.slider}}
                                    max={1080}
                                    min={0}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setUiState({margin: value}));
                                    }}
                                    value={margin}
                                />
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
                                <Typography id="translateX">Translate X: {translateX}</Typography>
                                <Slider
                                    aria-labelledby="translateX"
                                    classes={{container: classes.slider}}
                                    max={1080}
                                    min={-1080}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({translateX: value}));
                                    }}
                                    value={translateX}
                                />
                                <Typography id="translateY">Translate Y: {translateY}</Typography>
                                <Slider
                                    aria-labelledby="sideLength"
                                    classes={{container: classes.slider}}
                                    max={1080}
                                    min={-1080}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({translateY: value}));
                                    }}
                                    value={translateY}
                                />
                                <Typography id="rotate">Rotate: {rotate}</Typography>
                                <Slider
                                    aria-labelledby="rotate"
                                    classes={{container: classes.slider}}
                                    max={1080}
                                    min={-1080}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setvisParams({rotate: value}));
                                    }}
                                    value={rotate}
                                />
                            </div>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <Grid className={classes.grid} container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Visualization
                            {...{maxNumberOfSquares, height, width, margin, sideLength,translateY, translateX, rotate}}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <SpeedDial
                ariaLabel="Actions"
                color="secondary"
                className={speedDialClassName}
                direction="up"
                hidden={false}
                icon={<SpeedDialIcon/>}
                onBlur={handleCloseDial}
                onClick={handleXorDial}
                onClose={handleCloseDial}
                onFocus={handleOpenDial}
                onMouseEnter={handleOpenDial}
                onMouseLeave={handleCloseDial}
                open={speedDialOpen}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        icon={action.icon}
                        key={action.name}
                        onClick={() => {
                            handleCloseDial();
                            action.onClick()
                        }}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

SymbolicDisarray.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SymbolicDisarray);