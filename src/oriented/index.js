/* eslint-disable jsx-a11y/anchor-is-valid */

import {A_SERIES_PAPER, PAPER_SIZES} from "../utilities/paper-size";
import AppContainer from "../components/layout";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import {Button} from "@material-ui/core";
import {saveSVG} from "../utilities/save-svg";
import {withStyles} from '@material-ui/core/styles';
import {ACTION_CREATORS, initialState, reducer} from "./oriented.store";
import {orientedAlgorithm} from "./algorithms";
import {SVGLine} from "../squiggles/components/svg-line";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography"
import Switch from "@material-ui/core/Switch"

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

    fullList: {
        width: 'auto',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    drawer: {
        width: "400px"
    }

});

const Index = ({classes}) => {
    const [
        state,
        dispatch
    ] = useReducer(reducer, initialState);

    const {
        visParams: {
            lines
        },
        uiState: {
            paperSize,
            width,
            height,
            portrait
        },
        algorithmParams: {},
    } = state;

    return (
        <div className={classes.root}>
            <AppContainer
                title="Oriented"
            >
                <svg
                    width={width}
                    height={height}
                    id="oriented"
                >
                    {
                        lines.map((points, index) => <SVGLine
                            fill="none"
                            key={index}
                            points={points}
                            strokeWidth="1px"
                            stroke="black"
                        ></SVGLine>)
                    }
                </svg>
            </AppContainer>
            <Drawer
                anchor="right"
                variant="permanent"
                className={classes.drawer}
            >
                <List>
                    <ListItem>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => saveSVG('#oriented', 'oriented')}>
                            Save as SVG
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => {
                                    const results = orientedAlgorithm(100, width, height);
                                    dispatch(ACTION_CREATORS.setvisParams({lines: results}));
                                }}>
                            Run
                        </Button>
                    </ListItem>
                    <ListItem>
                        <form autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="paper-size">Paper Size</InputLabel>
                                <Select
                                    value={paperSize}
                                    onChange={({target: {value}}) => {
                                        const {width, height} = portrait ? PAPER_SIZES.get(value) : PAPER_SIZES.get(value).landscape();
                                        dispatch(ACTION_CREATORS.setUiState({paperSize: value, width, height}))
                                    }}
                                    inputProps={{
                                        name: 'paper-size',
                                        id: 'paper-size',
                                    }}
                                >
                                    {Object.keys(A_SERIES_PAPER).map(paperSize => {
                                        return <MenuItem key={paperSize} value={paperSize}>{paperSize}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </form>
                    </ListItem>
                    <ListItem>
                        <Typography id="portrait">Portrait</Typography>
                        <Switch
                            checked={portrait}
                            onChange={() => {
                                const {width, height} = !portrait ?  PAPER_SIZES.get(paperSize).landscape() : PAPER_SIZES.get(paperSize) ;
                                dispatch(ACTION_CREATORS.setUiState({portrait: !portrait, width, height}));
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
