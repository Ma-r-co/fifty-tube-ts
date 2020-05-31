import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
import * as actions from '../store/videoList/actions';
import { Actions } from '../store/actions';
import { RootState } from '../store/setupStore';
import { ThunkAction } from 'redux-thunk';
import * as utils from '../utils/apiKeys';

const API_URL = "https://www.googleapis.com/youtube/v3/search";
const API_URL2 ="https://www.googleapis.com/youtube/v3/videos";
const arr = [
  65,  74, 124, 100,  87, 126,  73,  97,  61,
  94, 130, 108,  92,  86, 111,  88,  87, 101,
  69, 105,  76, 118,  91, 130, 110, 103,  78,
 142,  81,  96, 151, 148, 103, 122,  83,  80,
 139, 153, 149
];
const KEY = utils.convert(arr)

type SearchResponse = {
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items:
    {
      kind: string,
      etag: string,
      id: {
        kind: string,
        videoId: string
      }
    }[],
}

type VideosResponseItem = {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    tags: string[];
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
};

type VideosResponse = {
  items: VideosResponseItem[];
}

const fetchVideoId = async (queryWord: string) => {
  const queryString = qs.stringify({
    key: KEY,
    q: queryWord,
    type: "video",
    part: "id",
    order: "viewCount",
    maxResults: 50,
  })

  let response = await fetchJsonp(`${API_URL}?${queryString}`);
  let searchResponse: SearchResponse = await response.json();
  let rst = searchResponse.items.map(item => item.id.videoId)
  return rst
}

const composeVideoRecord = ({id, snippet, contentDetails, statistics}: VideosResponseItem) => {
  return {
    id,
    publishedAt: snippet.publishedAt,
    title: snippet.title,
    tags: snippet.tags,
    duration: contentDetails.duration,
    ...statistics
  };
}

const fetchVideoDetails = async (videoIds: string[]) => {
  const queryString = qs.stringify({
    key: KEY,
    part: ["id", "snippet", "contentDetails", "statistics"],
    id: videoIds,
    fields: "items(id, snippet(publishedAt,title,tags), contentDetails(duration), statistics)",
    maxResults: 50,
  }, {
    arrayFormat: 'comma'
  });

  let response = await fetchJsonp(`${API_URL2}?${queryString}`);
  let videosResponse: VideosResponse = await response.json();
  let videos = videosResponse.items.map((item) => composeVideoRecord(item));
  return videos;
}


export const fetchList = (queryWord: string): ThunkAction<void, RootState, null, Actions> => {
  return async dispatch => {
    dispatch(actions.startRequest(queryWord));

    try {
      let videoIds = await fetchVideoId(queryWord);
      let videos = await fetchVideoDetails(videoIds);
      dispatch(actions.receiveData(queryWord, false, videos));
    } catch (err) {
      dispatch(actions.receiveData(queryWord, err));
    }

    dispatch(actions.finishRequest(queryWord));
  };
};