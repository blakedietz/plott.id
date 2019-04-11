/* eslint-disable jsx-a11y/anchor-is-valid */

import AppContainer from "../components/layout";
import Button from '@material-ui/core/Button/index';
import Divider from '@material-ui/core/Divider/index';
import Drawer from '@material-ui/core/Drawer/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import PropTypes from 'prop-types';
import React, {useReducer} from 'react';
import Switch from '@material-ui/core/Switch/index';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography/index';
import {ACTION_CREATORS, initialState, reducer} from "./symbolic-disarray.store";
import {Visualization} from "./components/visualization";
import {createVisData} from "./algorithms";
import {saveSVG} from "../utilities/save-svg";
import {withStyles} from '@material-ui/core/styles/index';

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

    dividerRoot: {
        width: 300,
    },
    divider: {
        marginBottom: theme.spacing.unit * 2,
    }
});


const SymbolicDisarray = ({classes}) => {
    const [
        {
            uiState: {
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
            <AppContainer
                title="Symbolic Disarray"
            >
                <Visualization
                    {...{
                        classes,
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
                    }}
                />
            </AppContainer>
            <Drawer
                anchor="right"
                variant="permanent"
            >
                <div >
                    <List>
                        <ListItem>
                            <Typography variant="h6">Parameters</Typography>
                        </ListItem>
                        <ListItem>
                            <form autoComplete="off">
                                <TextField
                                    id="outlined-number-of-rows"
                                    type="number"
                                    step="1"
                                    min="1"
                                    max="50"
                                    label="Number of rows"
                                    value={numberOfRows}
                                    onChange={(event) => {
                                        dispatch(ACTION_CREATORS.setvisParams({
                                            numberOfRows: event.target.value,
                                            points: createVisData(event.target.value, numberOfRows)
                                        }));
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </form>
                        </ListItem>
                        <ListItem>
                            <form autoComplete="off">
                                <TextField
                                    id="outlined-number-of-columns"
                                    type="number"
                                    step="1"
                                    min="1"
                                    max="50"
                                    label="Number of columns"
                                    value={numberOfColumns}
                                    onChange={(event) => {
                                        dispatch(ACTION_CREATORS.setvisParams({
                                            numberOfColumns: event.target.value,
                                            points: createVisData(numberOfColumns, event.target.value)
                                        }));
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </form>
                        </ListItem>
                        <ListItem>
                            <form autoComplete="off">
                                <TextField
                                    id="outlined-width"
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="10000"
                                    label="Width"
                                    value={width}
                                    onChange={(event) => {
                                        dispatch(ACTION_CREATORS.setvisParams({width: event.target.value}));
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </form>
                        </ListItem>
                        <ListItem>
                            <form autoComplete="off">
                                <TextField
                                    id="outlined-height"
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="10000"
                                    label="Height"
                                    value={height}
                                    onChange={(event) => {
                                        dispatch(ACTION_CREATORS.setvisParams({height: event.target.value}));
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </form>
                        </ListItem>
                        <ListItem>
                            <form autoComplete="off">
                                <TextField
                                    id="outlined-margin"
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="10000"
                                    label="Margin"
                                    value={margin}
                                    onChange={(event) => {
                                        dispatch(ACTION_CREATORS.setvisParams({margin: event.target.value}));
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </form>
                        </ListItem>
                        <ListItem>
                            <form autoComplete="off">
                                <TextField
                                    id="outlined-side-length"
                                    type="number"
                                    step="1"
                                    min="1"
                                    max="1080"
                                    label="Side Length"
                                    value={sideLength}
                                    onChange={(event) => {
                                        dispatch(ACTION_CREATORS.setvisParams({sideLength: event.target.value}));
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </form>
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
        </div>
    );
};

SymbolicDisarray.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SymbolicDisarray);
