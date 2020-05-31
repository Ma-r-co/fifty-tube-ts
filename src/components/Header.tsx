import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import useStyles from '../styles/useStyles';


const Header: React.FC = () => {
  const classes = useStyles();

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

export default Header;