import React, { memo, useState, useContext } from 'react';
import { getStoreAndDomain } from '../../services/helper';
import { Context as userContext } from '../../context/user';
import { Context as wishContext } from '../../context/wish';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { red, blue, indigo, green } from '@material-ui/core/colors';

import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteConfirmation from './delete-confimation-dialog';
import getGlobalStyles from '../../common/styles/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, styled } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NearMeIcon from '@material-ui/icons/NearMe';
import AddLinkForm from './add-form';
import TextField from '@material-ui/core/TextField';

const _red = red[700];
const _green = green[600];
const _indigo = indigo[400];
const _blue = blue[500];

const useStyles = makeStyles((theme) => ({
  actionsBtnWrapper: {
    display: 'flex',
    padding: '5px 0',
  },
  addBtn: {
    marginLeft: 5,
  },
}));

const DeleteButtonX = styled(DeleteIcon)({
  color: _red,
});

const VisibilityIconX = styled(VisibilityIcon)({
  color: _blue,
});

const CloudDoneIconX = styled(CloudDoneIcon)({
  color: _indigo,
});

const NearMeIconX = styled(NearMeIcon)({
  color: _green,
});

const WishList = memo(() => {
  const { currentUser, addWish, removeWish } = useContext(userContext);
  const { isLoading, onCheckProduct, getAfiliateLink } =
    useContext(wishContext);
  const history = useHistory();

  const [isVisibleAddForm, setIsVisibleAddForm] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [selectedLink, setSelectedLink] = useState();
  const [isVisibleDeleteDialog, setIsVisibleDeleteDialog] = useState(false);

  const classes = useStyles();
  const globalStyles = getGlobalStyles();

  const onRemoveLink = (id) => {
    removeWish(id);
  };
  const onGoToStore = (id) => {
    getAfiliateLink(id);
  };

  const onViewDetails = (id) => {
    history.push(`${window.location.pathname}/${id}`);
  };

  const _onCheckProduct = (wish) => {
    onCheckProduct(wish._id);
  };

  const options = {
    selectableRows: 'none',
  };

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
                currentElem.name.length > 60 ? '...' : ''
              }`
            : '';

          return <p>{text}</p>;
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
            <div>
              {currentElem.lastPrices && currentElem.lastPrices.length > 1 && (
                <span>{`${
                  currentElem.lastPrices[currentElem.lastPrices.length - 2]
                } ${currentElem.currency} >>> `}</span>
              )}
              <span>
                <strong>
                  {`${currentElem.currentPrice || ''} ${
                    currentElem.currency || ''
                  }`}
                </strong>
              </span>
            </div>
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
            <VisibilityIconX
              fontSize="small"
              onClick={() => onViewDetails(currentUser.wishes[rowIndex]._id)}
              className={globalStyles.btnAction}
            />
            <CloudDoneIconX
              fontSize="small"
              onClick={() => _onCheckProduct(currentUser.wishes[rowIndex])}
              className={globalStyles.btnAction}
            />
            <NearMeIconX
              fontSize="small"
              onClick={() => onGoToStore(currentUser.wishes[rowIndex]._id)}
              className={globalStyles.btnAction}
            />
            <DeleteButtonX
              fontSize="small"
              onClick={() => onOpenDialog(currentUser.wishes[rowIndex]._id)}
              className={clsx(globalStyles.btnAction, globalStyles.removeBtn)}
            />
          </div>
        ),
      },
    },
  ];

  const setAddFormVsibility = (value) => () => setIsVisibleAddForm(value);
  const _addWish = () => {
    if (newLink.length > 0) addWish({ url: newLink });

    setNewLink('');
  };
  const onChangeLink = (e) => setNewLink(e.target.value);

  const onAgreeDeleteDialog = () => {
    onCloseDeleteDialog();
    onRemoveLink(selectedLink);
  };

  const onOpenDialog = (clickedLink) => {
    setIsVisibleDeleteDialog(true);
    setSelectedLink(clickedLink);
  };
  const onCloseDeleteDialog = () => setIsVisibleDeleteDialog(false);

  return (
    <>
      {isLoading && (
        <div className={globalStyles.bgMask}>
          <CircularProgress className={globalStyles.fixedProgres} />
        </div>
      )}
      <AddLinkForm
        isVisible={isVisibleAddForm}
        onAdd={_addWish}
        onCancel={setAddFormVsibility(false)}
      />
      <DeleteConfirmation
        isOpen={isVisibleDeleteDialog}
        handleAgree={onAgreeDeleteDialog}
        handleClose={onCloseDeleteDialog}
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

export default WishList;
