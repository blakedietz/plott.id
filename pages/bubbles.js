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
import {render} from "../src/bubbles/bubbles"
import {saveSVG} from "../src/utilities/save-svg";
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
        position: 'relative',
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
    bubbleParams: {
        numberOfCircles: 50
    },
    uiState: {
        drawerOpen: false,
        height: 500,
        speedDialOpen: false,
        width: 960,
    },
};

const ACTION_TYPES = {
    SET_ALGORITHM_PARAMS: "SET_BUBBLE_PARAMS",
    SET_UI_STATE: "SET_UI_STATE",
};

const ACTION_CREATORS = {
    setBubbleParams: (params) => ({type: ACTION_TYPES.SET_BUBBLE_PARAMS, payload: params}),
    setUiState: (params) => ({type: ACTION_TYPES.SET_UI_STATE, payload: params})
};

const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.SET_BUBBLE_PARAMS:
            return {...state, bubbleParams: {...state.bubbleParams, ...payload}};
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
            saveSVG('#bubbles', 'bubbles')
        }
    },
];

const Bubbles = ({classes}) => {
    const [

        {
            uiState: {
                drawerOpen,
                height,
                speedDialOpen,
                width,
            },
            bubbleParams: {
                numberOfCircles,
            }
        },
        dispatch
    ] = useReducer(reducer, initialState);

    useEffect(() => {
        render({END: numberOfCircles, WIDTH: width, HEIGHT: height});
    }, [numberOfCircles, width, height]);

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

    const setNumberOfCircles = (value) => {
        dispatch(ACTION_CREATORS.setBubbleParams({numberOfCircles: Number(value)}));
    };

    return (
        <div className={classes.root}>
            <AppBar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Bubbles
                </Typography>
                <IconButton onClick={() => {
                    dispatch(ACTION_CREATORS.setUiState({drawerOpen: true}));
                }}
                            color="inherit">
                    <EditIcon></EditIcon>
                </IconButton>
            </AppBar>
            <Drawer anchor="bottom" open={drawerOpen} ModalProps={{BackdropProps: {invisible: true}}} onClose={() => {
                dispatch(ACTION_CREATORS.setUiState({drawerOpen: false}));
            }}>
                <div className={classes.fullList}>
                    <List>
                        <ListItem>
                            <div className={classes.sliderRoot}>
                                <Typography id="num-circles">Number of circles: {numberOfCircles}</Typography>
                                <Slider
                                    aria-labelledby="num-circles"
                                    classes={{container: classes.slider}}
                                    max={50}
                                    min={1}
                                    onChange={(event, value) => {
                                        setNumberOfCircles(value)
                                    }}
                                    step={1}
                                    value={numberOfCircles}
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
                            </div>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <Grid className={classes.grid} container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <svg id="bubbles"></svg>
                    </Paper>
                </Grid>
            </Grid>
            <div className={classes.speedDialWrapper}>
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
        </div>
    );
};

Bubbles.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bubbles);