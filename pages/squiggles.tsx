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
import Slider from '@material-ui/lab/Slider';
import ComputePointsWorker from "../src/squiggles/compute-points.worker";
import Divider from "@material-ui/core/Divider";
import {Visualization} from "../src/squiggles/components/index";
import {IPixelToSquiggleAlgorithmParams} from "../src/squiggles/algorithms/pixels-to-squiggles";
import {convertImageToCanvasBlob} from "../src/utilities/images";
import {Button} from "@material-ui/core";
import {saveSVG} from "../src/utilities/save-svg";

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
        debugMode: boolean,
        scale: number
    },
    algorithmParams: IPixelToSquiggleAlgorithmParams,
    squiggles: []
    webWorker: Object | null
}

let initialState: ISquigglesState = {
    uiState: {
        imageUri: "",
        loadedImage: "",
        drawerOpen: false,
        debugMode: false,
        scale: 100,
    },
    algorithmParams: {
        amplitude: 1,
        black: false,
        brightness: 0,
        contrast: 0,
        frequency: 150,
        height: 0,
        lineCount: 50,
        maxBrightness: 255,
        minBrightness: 0,
        pixels: [],
        spacing: 1,
        width: 0,
    },
    squiggles: [],
    fileBlob: Object | null,
    webWorker: null
};

const ACTION_TYPES = {
    SET_ALGORITHM_PARAMS: "SET_ALGORITHM_PARAMS",
    SET_SQUIGGLES: "SET_SQUIGGLES",
    SET_UI_STATE: "SET_UI_STATE",
    SET_VIS_PARAMS: "SET_VIS_PARAMS",
    SET_WEB_WORKER: "SET_WEB_WORKER",
    SET_FILE_BLOB: "SET_FILE_BLOB"
};

const ACTION_CREATORS = {
    setAlgorithmParams: (params) => ({type: ACTION_TYPES.SET_ALGORITHM_PARAMS, payload: params}),
    setSquiggles: (squiggles) => ({type: ACTION_TYPES.SET_SQUIGGLES, payload: {squiggles}}),
    setUiState: (params) => ({type: ACTION_TYPES.SET_UI_STATE, payload: params}),
    setWebWorker: (webWorker) => ({type: ACTION_TYPES.SET_WEB_WORKER, payload: {webWorker}}),
    setFileBlob: (fileBlob) => ({type: ACTION_TYPES.SET_FILE_BLOB, payload: {fileBlob}}),
    setvisParams: (params) => ({type: ACTION_TYPES.SET_VIS_PARAMS, payload: params}),
};

const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.SET_ALGORITHM_PARAMS:
            return {...state, algorithmParams: {...state.algorithmParams, ...payload}};
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
        case ACTION_TYPES.SET_FILE_BLOB:
            return {...state, fileBlob: payload.fileBlob};
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
            scale,
            loadedImage,
        },
        algorithmParams: {
            amplitude,
            black,
            brightness,
            contrast,
            frequency,
            height,
            lineCount,
            maxBrightness,
            minBrightness,
            pixels,
            spacing,
            width
        },
        fileBlob,
        squiggles,
        webWorker,
    } = state;

    const {algorithmParams, uiState} = state;

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
            webWorker.postMessage({...algorithmParams})
        }
    }, [algorithmParams]);

    useEffect(() => {
        if (fileBlob) {
            convertImageToCanvasBlob(fileBlob,)
                .then(({pixelData, width, height}) => {
                    dispatch(ACTION_CREATORS.setAlgorithmParams({
                        pixels: pixelData,
                        width,
                        height
                    }));
                });
        }

    }, [fileBlob]);

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
            <Grid className={classes.grid} container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Visualization
                            black={black}
                            height={height}
                            width={width}
                            strokeWidth={2}
                            squiggles={squiggles}/>
                    </Paper>
                </Grid>
            </Grid>
            <Drawer
                anchor="right"
                variant="permanent"
                open={drawerOpen}
                ModalProps={{BackdropProps: {invisible: true}}}
                onClose={() => {
                    dispatch(ACTION_CREATORS.setUiState({drawerOpen: false}));
                }}>
                <div className={classes.fullList}>
                    <List>
                        <ListItem>
                            <Typography variant="h6">Load an Image</Typography>
                        </ListItem>
                        <ListItem>
                            <TextField
                                id="file"
                                label="File"
                                type="file"
                                onChange={(element) => {
                                    const [file, other] = element.target.files;

                                    dispatch(ACTION_CREATORS.setUiState({imageUri: element.target.value}));
                                    dispatch(ACTION_CREATORS.setFileBlob(file));
                                }}
                                value={imageUri}
                            />
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={() => saveSVG('#pixels-squiggles', 'pixels-squiggles')}>
                                Save as SVG
                            </Button>
                        </ListItem>
                        <ListItem>
                            <div className={classes.dividerRoot}>
                                <Divider className={classes.divider}/>
                                <Typography variant="h6">Image options</Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <Typography id="brightness">Brightness: {brightness}</Typography>
                            <Slider
                                aria-labelledby="brightness"
                                classes={{container: classes.slider}}
                                max={100}
                                min={-100}
                                onChange={(event, value) => {
                                    dispatch(ACTION_CREATORS.setAlgorithmParams({brightness: value}));
                                }}
                                step={1}
                                value={brightness}
                            />
                        </ListItem>
                        <ListItem>
                            <Typography id="contrast">Contrast: {contrast}</Typography>
                            <Slider
                                aria-labelledby="contrast"
                                classes={{container: classes.slider}}
                                max={100}
                                min={-100}
                                onChange={(event, value) => {
                                    dispatch(ACTION_CREATORS.setAlgorithmParams({contrast: value}));
                                }}
                                step={1}
                                value={contrast}
                            />
                        </ListItem>
                        <ListItem>
                            <Typography id="min-brightness">Min Brigthness: {minBrightness}</Typography>
                            <Slider
                                aria-labelledby="contrast"
                                classes={{container: classes.slider}}
                                min={255}
                                min={0}
                                onChange={(event, value) => {
                                    dispatch(ACTION_CREATORS.setAlgorithmParams({minBrightness: value}));
                                }}
                                step={1}
                                value={minBrightness}
                            />
                        </ListItem>
                        <ListItem>
                            <Typography id="max-brightness">Max Brigthness: {maxBrightness}</Typography>
                            <Slider
                                aria-labelledby="contrast"
                                classes={{container: classes.slider}}
                                max={255}
                                min={0}
                                onChange={(event, value) => {
                                    dispatch(ACTION_CREATORS.setAlgorithmParams({maxBrightness: value}));
                                }}
                                step={1}
                                value={maxBrightness}
                            />
                        </ListItem>
                        <ListItem>
                            <div className={classes.dividerRoot}>
                                <Divider className={classes.divider}/>
                                <Typography variant="h6">Squiggle parameters</Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <Typography id="lineCount">Line Count: {lineCount}</Typography>
                            <Slider
                                aria-labelledby="lineCount"
                                classes={{container: classes.slider}}
                                max={200}
                                min={10}
                                onChange={(event, value) => {
                                    dispatch(ACTION_CREATORS.setAlgorithmParams({lineCount: value}));
                                }}
                                step={1}
                                value={lineCount}
                            />
                        </ListItem>
                        <ListItem>
                            <Typography id="frequency">Frequency: {frequency}</Typography>
                            <Slider
                                aria-labelledby="frequency"
                                classes={{container: classes.slider}}
                                max={256}
                                min={5}
                                onChange={(event, value) => {
                                    dispatch(ACTION_CREATORS.setAlgorithmParams({frequency: value}));
                                }}
                                step={1}
                                value={frequency}
                            />
                        </ListItem>
                        <ListItem>
                            <Typography id="amplitude">Amplitude: {amplitude}</Typography>
                            <Slider
                                aria-labelledby="amplitude"
                                classes={{container: classes.slider}}
                                max={5}
                                min={.1}
                                onChange={(event, value) => {
                                    dispatch(ACTION_CREATORS.setAlgorithmParams({amplitude: value}));
                                }}
                                step={.1}
                                value={amplitude}
                            />
                        </ListItem>
                        <ListItem>
                            <Typography id="spacing">Spacing: {spacing}</Typography>
                            <Slider
                                aria-labelledby="spacing"
                                classes={{container: classes.slider}}
                                max={2.9}
                                min={.5}
                                onChange={(event, value) => {
                                    dispatch(ACTION_CREATORS.setAlgorithmParams({spacing: value}));
                                }}
                                step={.1}
                                value={spacing}
                            />
                        </ListItem>
                        <ListItem>
                            <div className={classes.dividerRoot}>
                                <Divider className={classes.divider}/>
                                <Typography variant="h6">Debug</Typography>
                            </div>
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
        </div>
    );
};

Squiggles.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Squiggles);
