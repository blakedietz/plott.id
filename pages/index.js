/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

function Index(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        <Link href="/oriented">
          <a>Oriented</a>
        </Link>
      </Typography>
      <Typography variant="h4" gutterBottom>
        <Link href="/squiggles">
          <a>Pixels to squiggles</a>
        </Link>
      </Typography>
      <Typography variant="h4" gutterBottom>
        <Link href="/bubbles">
          <a>Bubbles</a>
        </Link>
      </Typography>
      <Typography variant="h4" gutterBottom>
        <Link href="/symbolic-disarray">
          <a>Symbolic disarray</a>
        </Link>
      </Typography>
    </div>
  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
