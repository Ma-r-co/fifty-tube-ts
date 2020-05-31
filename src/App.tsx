import * as React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import VideoList from './containers/VideoList';
import Header from './components/Header';
import Footer from './components/Footer';
import useStyles from './styles/useStyles';


const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} className={classes.main}>
        <VideoList />
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
