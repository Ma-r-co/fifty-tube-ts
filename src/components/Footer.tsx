import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import useStyles from '../styles/useStyles';


const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Ma-r-co">
        Ma-r-co
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const StickyFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">Thanks for dropping by this site.</Typography>
        <Typography variant="body2" color="textSecondary">Last update: 31 May 2020</Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

export default StickyFooter;