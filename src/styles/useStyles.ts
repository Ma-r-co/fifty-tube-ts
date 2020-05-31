import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      flex: 1,
    },
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: theme.spacing(4),
      textAlign: "center",
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    header: {
      backgroundColor: theme.palette.primary.dark,
    }
  })
);

export default useStyles;
