import * as React from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core';
import VideoTable from './VideoTable';
import { Videos } from '../store/videoList/types';


interface VideoListProps {
  queryWord: string | undefined;
  videos: Videos | undefined;
  error: boolean
  onSubmit: (arg: string) => void;
};

const VideoList: React.FC<VideoListProps> = ({queryWord, onSubmit, error=false, videos}) => {
  const [inputWord, setInputWord] = React.useState('');

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputWord(e.target.value);
  }, []);


  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputWord);
  }, [onSubmit, inputWord]);

  return (
    <div>
      <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="queryWord" margin="normal" label="Please Input words" onChange={handleChange}/>
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


export default VideoList