/* eslint-disable jsx-a11y/anchor-is-valid */

import ComputePointsWorker from './compute-points.worker';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import Slider from '@material-ui/lab/Slider';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { ACTION_CREATORS, initialState, reducer } from './squiggles.store';
import { Button } from '@material-ui/core';
import { Visualization } from './components';
import { convertImageToCanvasBlob } from '../utilities/convert-image-to-pixels';
import { saveSVG } from '../utilities/save-svg';
import { withStyles } from '@material-ui/core/styles';
import AppContainer from '../components/layout/index';

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
  dividerRoot: {
    width: 300,
  },
  divider: {
    marginBottom: theme.spacing.unit * 2,
  },

  emptyView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  emptyViewText: {
    maxWidth: '50%',
  },
});

const Index = ({ classes }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    uiState: { drawerOpen, debugMode, imageUri, scale, loadedImage },
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
      width,
    },
    fileBlob,
    squiggles,
    webWorker,
  } = state;

  const { algorithmParams, uiState } = state;

  useEffect(() => {
    const worker = new ComputePointsWorker();
    dispatch(ACTION_CREATORS.setWebWorker(worker));
    worker.addEventListener('message', ({ data }) => {
      // This should probably be the vis output instead of pixels
      dispatch(ACTION_CREATORS.setSquiggles(data.squiggles));
    });

    return function cleanUp() {
      worker.terminate();
      dispatch(ACTION_CREATORS.setWebWorker(null));
    };
  }, []);

  useEffect(
    () => {
      if (webWorker) {
        webWorker.postMessage({ ...algorithmParams });
      }
    },
    [algorithmParams],
  );

  useEffect(
    () => {
      if (fileBlob) {
        convertImageToCanvasBlob(fileBlob).then(
          ({ pixelData, width, height }) => {
            dispatch(
              ACTION_CREATORS.setAlgorithmParams({
                pixels: pixelData,
                width,
                height,
              }),
            );
          },
        );
      }
    },
    [fileBlob],
  );

  const Content = () =>
    squiggles.length ? (
      <div className={classes.emptyView}>
        <Visualization
          className={classes.emptyViewText}
          black={black}
          height={height}
          width={width}
          strokeWidth={2}
          squiggles={squiggles}
        />
      </div>
    ) : (
      <div className={classes.emptyView}>
        <Typography className={classes.emptyViewText} variant="h2">
          Load an image
        </Typography>
      </div>
    );

  return (
    <div className={classes.root}>
      <AppContainer
        title="Pixels to Squiggles"
        appbarComponent={() => {
          return (
            <IconButton
              onClick={() => {
                dispatch(ACTION_CREATORS.setUiState({ drawerOpen: true }));
              }}
              color="inherit"
            >
              <EditIcon />
            </IconButton>
          );
        }}
      >
        <Content />
      </AppContainer>
      <Drawer
        anchor="right"
        variant="permanent"
        open={drawerOpen}
        ModalProps={{ BackdropProps: { invisible: true } }}
        onClose={() => {
          dispatch(ACTION_CREATORS.setUiState({ drawerOpen: false }));
        }}
      >
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
                onChange={element => {
                  const [file, other] = element.target.files;

                  dispatch(
                    ACTION_CREATORS.setUiState({
                      imageUri: element.target.value,
                    }),
                  );
                  dispatch(ACTION_CREATORS.setFileBlob(file));
                }}
                value={imageUri}
              />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => saveSVG('#pixels-squiggles', 'pixels-squiggles')}
              >
                Save as SVG
              </Button>
            </ListItem>
            <ListItem>
              <div className={classes.dividerRoot}>
                <Divider className={classes.divider} />
                <Typography variant="h6">Image options</Typography>
              </div>
            </ListItem>
            <ListItem>
              <Typography id="brightness">Brightness: {brightness}</Typography>
              <Slider
                aria-labelledby="brightness"
                classes={{ container: classes.slider }}
                max={100}
                min={-100}
                onChange={(event, value) => {
                  dispatch(
                    ACTION_CREATORS.setAlgorithmParams({ brightness: value }),
                  );
                }}
                step={1}
                value={brightness}
              />
            </ListItem>
            <ListItem>
              <Typography id="contrast">Contrast: {contrast}</Typography>
              <Slider
                aria-labelledby="contrast"
                classes={{ container: classes.slider }}
                max={100}
                min={-100}
                onChange={(event, value) => {
                  dispatch(
                    ACTION_CREATORS.setAlgorithmParams({ contrast: value }),
                  );
                }}
                step={1}
                value={contrast}
              />
            </ListItem>
            <ListItem>
              <Typography id="min-brightness">
                Min Brigthness: {minBrightness}
              </Typography>
              <Slider
                aria-labelledby="contrast"
                classes={{ container: classes.slider }}
                min={255}
                min={0}
                onChange={(event, value) => {
                  dispatch(
                    ACTION_CREATORS.setAlgorithmParams({
                      minBrightness: value,
                    }),
                  );
                }}
                step={1}
                value={minBrightness}
              />
            </ListItem>
            <ListItem>
              <Typography id="max-brightness">
                Max Brigthness: {maxBrightness}
              </Typography>
              <Slider
                aria-labelledby="contrast"
                classes={{ container: classes.slider }}
                max={255}
                min={0}
                onChange={(event, value) => {
                  dispatch(
                    ACTION_CREATORS.setAlgorithmParams({
                      maxBrightness: value,
                    }),
                  );
                }}
                step={1}
                value={maxBrightness}
              />
            </ListItem>
            <ListItem>
              <div className={classes.dividerRoot}>
                <Divider className={classes.divider} />
                <Typography variant="h6">Squiggle parameters</Typography>
              </div>
            </ListItem>
            <ListItem>
              <Typography id="lineCount">Line Count: {lineCount}</Typography>
              <Slider
                aria-labelledby="lineCount"
                classes={{ container: classes.slider }}
                max={200}
                min={10}
                onChange={(event, value) => {
                  dispatch(
                    ACTION_CREATORS.setAlgorithmParams({ lineCount: value }),
                  );
                }}
                step={1}
                value={lineCount}
              />
            </ListItem>
            <ListItem>
              <Typography id="frequency">Frequency: {frequency}</Typography>
              <Slider
                aria-labelledby="frequency"
                classes={{ container: classes.slider }}
                max={256}
                min={5}
                onChange={(event, value) => {
                  dispatch(
                    ACTION_CREATORS.setAlgorithmParams({ frequency: value }),
                  );
                }}
                step={1}
                value={frequency}
              />
            </ListItem>
            <ListItem>
              <Typography id="amplitude">Amplitude: {amplitude}</Typography>
              <Slider
                aria-labelledby="amplitude"
                classes={{ container: classes.slider }}
                max={5}
                min={0.1}
                onChange={(event, value) => {
                  dispatch(
                    ACTION_CREATORS.setAlgorithmParams({ amplitude: value }),
                  );
                }}
                step={0.1}
                value={amplitude}
              />
            </ListItem>
            <ListItem>
              <Typography id="spacing">Spacing: {spacing}</Typography>
              <Slider
                aria-labelledby="spacing"
                classes={{ container: classes.slider }}
                max={2.9}
                min={0.5}
                onChange={(event, value) => {
                  dispatch(
                    ACTION_CREATORS.setAlgorithmParams({ spacing: value }),
                  );
                }}
                step={0.1}
                value={spacing}
              />
            </ListItem>
            <ListItem>
              <div className={classes.dividerRoot}>
                <Divider className={classes.divider} />
                <Typography variant="h6">Debug</Typography>
              </div>
            </ListItem>
            <ListItem>
              <Typography id="debug">Debug mode</Typography>
              <Switch
                checked={debugMode}
                onChange={() => {
                  dispatch(
                    ACTION_CREATORS.setUiState({ debugMode: !debugMode }),
                  );
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

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
