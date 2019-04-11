/* eslint-disable jsx-a11y/anchor-is-valid */

import AppContainer from '../components/layout';
import Drawer from '@material-ui/core/Drawer/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import Slider from '@material-ui/lab/Slider/index';
import Typography from '@material-ui/core/Typography/index';
import { render } from './algorithms';
import { saveSVG } from '../utilities/save-svg';
import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    textAlign: 'center',
  },

  // For the appbar
  grow: {
    flexGrow: 1,
  },

  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  grid: {
    padding: theme.spacing.unit * 2,
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
});

const initialState = {
  bubbleParams: {
    numberOfCircles: 50,
  },
  uiState: {
    drawerOpen: false,
    height: 500,
    speedDialOpen: false,
    width: 960,
  },
};

const ACTION_TYPES = {
  SET_ALGORITHM_PARAMS: 'SET_BUBBLE_PARAMS',
  SET_UI_STATE: 'SET_UI_STATE',
};

const ACTION_CREATORS = {
  setBubbleParams: params => ({
    type: ACTION_TYPES.SET_BUBBLE_PARAMS,
    payload: params,
  }),
  setUiState: params => ({ type: ACTION_TYPES.SET_UI_STATE, payload: params }),
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_BUBBLE_PARAMS:
      return { ...state, bubbleParams: { ...state.bubbleParams, ...payload } };
      break;
    case ACTION_TYPES.SET_UI_STATE:
      return { ...state, uiState: { ...state.uiState, ...payload } };
      break;
    default:
      return { ...initialState };
  }
};

const Bubbles = ({ classes }) => {
  const [
    {
      uiState: { height, width },
      bubbleParams: { numberOfCircles },
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    render({ END: numberOfCircles, WIDTH: width, HEIGHT: height });
  }, [numberOfCircles, width, height]);

  const setNumberOfCircles = value => {
    dispatch(
      ACTION_CREATORS.setBubbleParams({ numberOfCircles: Number(value) }),
    );
  };

  return (
    <div className={classes.root}>
      <AppContainer title={'Bubbles'}>
        <svg id="bubbles" />
      </AppContainer>
      <Drawer anchor="right" variant="permanent">
        <div className={classes.fullList}>
          <List>
            <ListItem>
              <div className={classes.sliderRoot}>
                <Typography id="num-circles">
                  Number of circles: {numberOfCircles}
                </Typography>
                <Slider
                  aria-labelledby="num-circles"
                  classes={{ container: classes.slider }}
                  max={50}
                  min={1}
                  onChange={(event, value) => {
                    setNumberOfCircles(value);
                  }}
                  step={1}
                  value={numberOfCircles}
                />
                <Typography id="width">Width: {width}</Typography>
                <Slider
                  aria-labelledby="width"
                  classes={{ container: classes.slider }}
                  max={1920}
                  min={1}
                  onChange={(event, value) => {
                    dispatch(ACTION_CREATORS.setUiState({ width: value }));
                  }}
                  step={1}
                  value={width}
                />
                <Typography id="width">Height: {height}</Typography>
                <Slider
                  aria-labelledby="width"
                  classes={{ container: classes.slider }}
                  max={1080}
                  min={1}
                  onChange={(event, value) => {
                    dispatch(ACTION_CREATORS.setUiState({ height: value }));
                  }}
                  step={1}
                  value={height}
                />
              </div>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

Bubbles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bubbles);
