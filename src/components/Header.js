import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import useStyles from '../styles/useStyles';


export default function header () {
  const classes = makeStyles(useStyles)();

  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <Typography variant="h6">
          Top 50 in Youtube 
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
