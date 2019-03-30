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
        maxNumberOfSquares: 50
    },
    uiState: {
        drawerOpen: false,
        height: 500,
        margin: .03,
        speedDialOpen: false,
        width: 960,
        sideLength: 10
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
            }
        },
        dispatch
    ] = useReducer(reducer, initialState);

    useEffect(() => {
        render({maxNumberOfSquares, width, height, sideLength, margin});
    }, [
        height,
        margin,
        maxNumberOfSquares,
        sideLength,
        width,
    ]);

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
                                <Typography id="num-circles">Number of squares: {maxNumberOfSquares}</Typography>
                                <Slider
                                    aria-labelledby="num-circles"
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
                                <Typography id="width">Height: {height}</Typography>
                                <Slider
                                    aria-labelledby="width"
                                    classes={{container: classes.slider}}
                                    max={1080}
                                    min={1}
                                    onChange={(event, value) => {
                                        dispatch(ACTION_CREATORS.setUiState({height: value}));
                                    }}
                                    step={1}
                                    value={height}
                                />
                                <Typography id="width">Margin: {margin}</Typography>
                                <Slider
                                    aria-labelledby="width"
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
                            </div>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <Grid className={classes.grid} container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <svg width={width} height={height} id="symbolic-disarray"></svg>
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