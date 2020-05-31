import * as React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';
import { connect } from 'react-redux';
import { Videos, Video } from '../store/videoList/types';
import { RootState } from '../store/setupStore';

const styles = (theme: Theme) => 
  createStyles({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      '& .ReactVirtualized__Table__headerRow': {
        flip: false,
        paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
  });

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}

interface Row {
  index: number;
}

interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
  columns: ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => Video;
  rowHeight?: number;
}

class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
    rowCount: 0,
  };

  getRowClassName = ({ index }: Row) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight!}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

// MuiVirtualizedTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       dataKey: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//       numeric: PropTypes.bool,
//       width: PropTypes.number.isRequired,
//     }),
//   ).isRequired,
//   headerHeight: PropTypes.number,
//   onRowClick: PropTypes.func,
//   rowHeight: PropTypes.number,
// };

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// interface Data {
//   id: string;
//   title: string;
//   duration: string;
//   publishedAt: string;
//   viewCount: number;
//   likeCount: number;
//   dislikeCount: number;
//   favoriteCount: number;
//   commentCount: number;
// }

// ---

// const sample = [
//   ['Frozen yoghurt', 159, 6.0, 24, 4.0],
//   ['Ice cream sandwich', 237, 9.0, 37, 4.3],
//   ['Eclair', 262, 16.0, 24, 6.0],
//   ['Cupcake', 305, 3.7, 67, 4.3],
//   ['Gingerbread', 356, 16.0, 49, 3.9],
// ];

// function createData(id, dessert, calories, fat, carbs, protein) {
//   return { id, dessert, calories, fat, carbs, protein };
// }

// const rows = [];

interface ReactVirtualizedTableProps {
  videos: Videos | undefined;
}

const ReactVirtualizedTable: React.FC<ReactVirtualizedTableProps> = ({videos=[]}) => {
  let rows = videos;

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 120,
            label: 'ID',
            dataKey: 'id',
          },
          {
            width: 320,
            label: 'タイトル',
            dataKey: 'title',
          },
          {
            width: 120,
            label: '再生時間',
            dataKey: 'duration',
          },
          {
            width: 200,
            label: 'アップロード日時',
            dataKey: 'publishedAt',
          },
          {
            width: 120,
            label: '再生回数',
            dataKey: 'viewCount',
            numeric: true,
          },
          {
            width: 120,
            label: '高評価数',
            dataKey: 'likeCount',
            numeric: true,
          },
          {
            width: 120,
            label: '低評価数',
            dataKey: 'dislikeCount',
            numeric: true,
          },
          {
            width: 120,
            label: 'お気に入り数',
            dataKey: 'favoriteCount',
            numeric: true,
          },
          {
            width: 120,
            label: 'コメント数',
            dataKey: 'commentCount',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}

function mapState (state: RootState) {
  return {
    videos: state.videoList.videos
  };
}

export default connect(mapState)(ReactVirtualizedTable);
