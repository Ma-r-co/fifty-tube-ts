import { connect } from 'react-redux';
import VideoList from '../components/VideoList';
import * as actions from '../actions';


const mapStateToProps = state => ({
  queryWord: state.videoList.queryWord,
  videos: state.videoList.videos
})

const mapDispatchToProps = dispatch => ({
  onSubmit (queryWord) {
    dispatch(actions.fetchList(queryWord));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
