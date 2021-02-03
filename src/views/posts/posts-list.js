import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context as PostContext } from '../../context/post';
import { useHistory, useRouteMatch } from "react-router-dom";
import moment from 'moment';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
    button: {
      float: 'right',
      margin: 20,
    },
    rowBtnWrapper: {
      alignItems: 'center',
      cursor: 'pointer',
    },
    rowBtn: {
      fontSize: 20,
    },
  });

const PostsList = memo(({ }) => {
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { posts, getPosts } = useContext(PostContext);
    const history = useHistory();
    let match = useRouteMatch();

    useEffect(() => {
      getPosts();
    }, [])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);


    const goToNewPostForm = () => history.push(`${match.url}/new`);
    const goToPost = postId => history.push(`${match.url}/${postId}`);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onView = postId => goToPost(postId);
    const onDelete = () => {};

    return (
        <TableContainer component={Paper}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={goToNewPostForm}
            >
              <AddIcon /> Create Post
            </Button>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableBody>
                {(rowsPerPage > 0
                    ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : posts
                ).map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row">
                          {row.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.content}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                          {`${row.author.name} ${row.author.lastname}`}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                          {moment(row.date).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell style={{ width: 20 }} className={classes.rowBtnWrapper}>
                          <VisibilityIcon onClick={() => onView(row.id)} className={classes.rowBtn} />
                      </TableCell>
                      <TableCell style={{ width: 20 }} className={classes.rowBtnWrapper}>
                          <DeleteIcon onClick={onDelete} className={classes.rowBtn} />
                      </TableCell>
                    </TableRow>
                ))}

                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={posts.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                          inputProps: { 'aria-label': 'rows per page' },
                          native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
});

PostsList.propTypes = {

};

PostsList.defaultProps = {

};

export default PostsList;