import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

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
});

let AppContainer = ({children, classes, title, appbarComponent = null}) => {
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
            {appbarComponent}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
      <Grid className={classes.grid} container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

AppContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  appBarComponents: PropTypes.object.isRequired
};

export default withStyles(styles)(AppContainer);
