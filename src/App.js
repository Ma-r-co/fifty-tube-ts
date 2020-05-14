import React from 'react';
import { Container, CssBaseline, withStyles } from '@material-ui/core';
import VideoList from './containers/VideoList';
import Header from './components/Header';
import Footer from './components/Footer';
import useStyles from './styles/useStyles';


class App extends React.Component {
  render(){
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <Header />
        <Container maxWidth={false} className={this.props.classes.main}>
          <VideoList />
        </Container>
        <Footer/>
      </div>
    );
  };
}

export default withStyles(useStyles)(App);
