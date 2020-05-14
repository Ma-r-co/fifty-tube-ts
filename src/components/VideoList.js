import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, LinearProgress } from '@material-ui/core';
import VideoTable from './VideoTable';


export default class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    this.setState({queryWord: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.onSubmit(this.state.queryWord);
  }

  render () {
    const { queryWord, videos, error } = this.props;
    return (
      <div>
        <div>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField id="queryWord" margin="normal" label="Please Input words" onChange={this.handleChange}/>
            <div>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </div>
          </form>
        </div>
        <div>

        </div>

        <p> QueryWord: {queryWord} </p>
        {(() => {
          if (typeof queryWord === 'undefined') {
            return 
          } else if (error) {
            return <p>Error. Please retry it.</p> 
          } else if (typeof videos === 'undefined') {
            return (
              <div>
                <p>Loading...</p>
                <LinearProgress/>
              </div>
            )
          } else {
            return <VideoTable />
          }
        })()}
      </div>
    )
  }
}

VideoList.propTypes = {
  queryWord: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

