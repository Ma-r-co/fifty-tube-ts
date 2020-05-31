import { connect } from 'react-redux';
import VideoList from '../components/VideoList';
import * as actions from '../actions/videoList';
import { RootState } from '../store/setupStore';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../store/actions';

const mapState = (state: RootState) => ({
  queryWord: state.videoList.queryWord,
  videos: state.videoList.videos,
  error: state.videoList.error,
})

const mapDispatch = (dispatch: ThunkDispatch<RootState, null, Actions>)  => ({
  onSubmit (queryWord: string) {
    dispatch(actions.fetchList(queryWord));
  }
});

export default connect(mapState, mapDispatch)(VideoList);
