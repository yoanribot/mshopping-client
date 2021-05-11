import React, { memo, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getStoreAndDomain } from '../../services/helper';
import { Context as userContext } from '../../context/user';
import { Context as wishContext } from '../../context/wish';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import getGlobalStyles from '../../common/styles/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import NearMeIcon from '@material-ui/icons/NearMe';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddLinkForm from './add-form';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  actionsBtnWrapper: {
    display: 'flex',
    padding: '5px 0',
  },
  addBtn: {
    marginLeft: 5,
  },
}));

const WishList = memo(({}) => {
  const { currentUser, addWish, removeWish } = useContext(userContext);
  const { onCheckProduct } = useContext(wishContext);
  const history = useHistory();

  const [isVisibleAddForm, setIsVisibleAddForm] = useState(false);
  const [newLink, setNewLink] = useState();
  const classes = useStyles();
  const globalStyles = getGlobalStyles();

  const onRemoveLink = () => console.log('TODO onRemoveLink ...');
  const onGoToStore = (url) => window.open(url, '_blank');
  const onViewDetails = (id) =>
    history.push(`${window.location.pathname}/${id}`);

  const _onCheckProduct = (wish) => {
    console.log('wish', wish);
    onCheckProduct(wish._id);
  };

  const options = {};

  const columns = [
    {
      name: 'name',
      label: 'Product Name',
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const currentElem = currentUser.wishes[rowIndex];
          const text = !!currentElem.name
            ? `${currentElem.name.substring(0, 60)} ${
                currentElem.name.length > 60 && '...'
              }`
            : '';

          return <span> {text} </span>;
        },
      },
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const currentElem = currentUser.wishes[rowIndex];

          return (
            <span>{`${currentElem.currentPrice || ''} ${
              currentElem.currency || ''
            }`}</span>
          );
        },
      },
    },
    {
      name: 'domain',
      label: 'Domain',
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const { store, domain } = getStoreAndDomain(
            currentUser.wishes[rowIndex].url,
          );

          return (
            <>
              {!!store && <FontAwesomeIcon icon={['fab', store]} />}
              <span>({domain})</span>
            </>
          );
        },
      },
    },
    {
      name: 'asin',
      label: 'ASIN code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: '',
      label: '',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <div className={globalStyles.flex}>
            <VisibilityIcon
              fontSize="small"
              onClick={() => onViewDetails(currentUser.wishes[rowIndex]._id)}
              className={globalStyles.btnAction}
            />
            <CloudDoneIcon
              fontSize="small"
              onClick={() => _onCheckProduct(currentUser.wishes[rowIndex])}
              className={globalStyles.btnAction}
            />
            <NearMeIcon
              fontSize="small"
              onClick={() => onGoToStore(currentUser.wishes[rowIndex].url)}
              className={globalStyles.btnAction}
            />
            <DeleteIcon
              fontSize="small"
              onClick={onRemoveLink}
              className={clsx(globalStyles.btnAction, globalStyles.removeBtn)}
            />
          </div>
        ),
      },
    },
  ];

  const setAddFormVsibility = (value) => () => setIsVisibleAddForm(value);
  const _addWish = () => addWish({ url: newLink });
  const onChangeLink = (e) => setNewLink(e.target.value);

  return (
    <>
      <AddLinkForm
        isVisible={isVisibleAddForm}
        onAdd={_addWish}
        onCancel={setAddFormVsibility(false)}
      />
      <div className={classes.actionsBtnWrapper}>
        <TextField
          name="link"
          fullWidth
          label="Add new link to your wishlist"
          size={'small'}
          variant="outlined"
          value={newLink}
          onChange={onChangeLink}
        />
        <IconButton
          color="primary"
          edge="start"
          aria-label="add link"
          onClick={_addWish}
          className={classes.addBtn}
        >
          <AddIcon />
        </IconButton>
      </div>
      <MUIDataTable
        title={'Wishlist'}
        data={currentUser.wishes}
        columns={columns}
        options={options}
      />
    </>
  );
});

WishList.propTypes = {};

WishList.defaultProps = {};

export default WishList;
