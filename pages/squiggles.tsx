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
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import ComputePointsWorker from "../src/squiggles/compute-points.worker";
import {Visualization} from "../src/squiggles/components";
import {IPixelToSquiggleParams} from "../src/squiggles/algorithms/squiggile-visualization";
import {SVGLine} from "../src/squiggles/components/svg-line";

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

interface ISquigglesState {
    uiState: {
        imageUri: string,
        loadedImage: string,
        drawerOpen: boolean,
        debugMode: boolean
    },
    visParams: IPixelToSquiggleParams,
    squiggles: []
    webWorker: Object | null
}

let initialState: ISquigglesState = {
    uiState: {
        imageUri: "",
        loadedImage: "",
        drawerOpen: false,
        debugMode: false,
    },
    visParams: {
        amplitude: 1,
        black: true,
        brightness: 0,
        contrast: 0,
        frequency: 150,
        height: 0,
        lineCount: 500,
        maxBrightness: 255,
        minBrightness: 0,
        pixels: [],
        spacing: 1,
        width: 0,
    },
    squiggles: [],
    webWorker: null
};

const ACTION_TYPES = {
    SET_VIS_PARAMS: "SET_VIS_PARAMS",
    SET_UI_STATE: "SET_UI_STATE",
    SET_WEB_WORKER: "SET_WEB_WORKER",
    SET_SQUIGGLES: "SET_SQUIGGLES"
};

const ACTION_CREATORS = {
    setvisParams: (params) => ({type: ACTION_TYPES.SET_VIS_PARAMS, payload: params}),
    setUiState: (params) => ({type: ACTION_TYPES.SET_UI_STATE, payload: params}),
    setWebWorker: (webWorker) => ({type: ACTION_TYPES.SET_WEB_WORKER, payload: {webWorker}}),
    setSquiggles: (squiggles) => ({type: ACTION_TYPES.SET_SQUIGGLES, payload: {squiggles}}),
};

const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.SET_VIS_PARAMS:
            return {...state, visParams: {...state.visParams, ...payload}};
            break;
        case ACTION_TYPES.SET_UI_STATE:
            return {...state, uiState: {...state.uiState, ...payload}};
            break;
        case ACTION_TYPES.SET_WEB_WORKER:
            return {...state, webWorker: payload.webWorker};
            break;
        case ACTION_TYPES.SET_SQUIGGLES:
            return {...state, squiggles: payload.squiggles};
            break;
        default:
            return {...initialState};
    }
};

const Squiggles = ({classes}) => {
    const [
        state,
        dispatch
    ] = useReducer(reducer, initialState);

    const {
        uiState: {
            drawerOpen,
            debugMode,
            imageUri,
            loadedImage,
        },
        visParams: {
            ampltude,
            black,
            brightness,
            contrast,
            frequency,
            height,
            lineCount,
            maxBrightness,
            minBrightNess,
            pixels,
            width,
        },
        squiggles,
        webWorker,
    } = state;

    const {visParams, uiState} = state;

    useEffect(() => {
        const worker = new ComputePointsWorker();
        dispatch(ACTION_CREATORS.setWebWorker(worker));
        worker.addEventListener('message', ({data}) => {
            // This should probably be the vis output instead of pixels
            dispatch(ACTION_CREATORS.setSquiggles(data.squiggles));
        });

        return function cleanUp() {
            worker.terminate();
            dispatch(ACTION_CREATORS.setWebWorker(null));
        }
    }, []);

    useEffect(() => {
        if (webWorker) {
            webWorker.postMessage({...visParams})
        }
    }, [pixels]);

    return (
        <div className={classes.root}>
            <AppBar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Pixels to Squiggles
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
                            <TextField
                                id="file"
                                label="File"
                                type="file"
                                onChange={(element) => {
                                    const [file, other] = element.target.files;


                                    const canvas = document.createElement("canvas");
                                    const context = canvas.getContext('2d');

                                    const img = new Image();
                                    img.addEventListener('load', ({target: {naturalWidth, naturalHeight}}) => {
                                        canvas.width = naturalWidth;
                                        canvas.height = naturalHeight;
                                        context.drawImage(img, 0, 0);
                                        const pixelData = context.getImageData(0, 0, naturalWidth, naturalHeight);
                                        dispatch(ACTION_CREATORS.setvisParams({
                                            pixels: pixelData,
                                            width: naturalWidth,
                                            height: naturalHeight
                                        }));
                                    });

                                    const reader = new FileReader();

                                    reader.addEventListener('load', () => {
                                        dispatch(ACTION_CREATORS.setUiState({loadedImage: reader.result}));
                                        img.src = reader.result;
                                    });
                                    reader.readAsDataURL(file);

                                    dispatch(ACTION_CREATORS.setUiState({imageUri: element.target.value}));
                                }}
                                value={imageUri}
                            />
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
                        {/*<img src={loadedImage}/>*/}
                        <svg width={width} height={height}>
                            {squiggles.map((points, index) => <SVGLine key={index} points={points}/>)}
                        </svg>
                        {/*<Visualization*/}
                        {/*{...{*/}
                        {/*debugMode,*/}
                        {/*height,*/}
                        {/*pixels,*/}
                        {/*width,*/}
                        {/*classes*/}
                        {/*}}*/}
                        {/*/>*/}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

Squiggles.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Squiggles);
