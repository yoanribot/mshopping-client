import React, { memo, useState, useContext } from 'react';
import { getStoreAndDomain } from '../../services/helper';
import { Context as userContext } from '../../context/user';
import { Context as wishContext } from '../../context/wish';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { red, blue, indigo, green, yellow } from '@material-ui/core/colors';

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
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ErrorIcon from '@material-ui/icons/Error';
import NotificationForm from './notifcation-form';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import Tooltip from '@material-ui/core/Tooltip';

const _yellow = yellow[700];
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

const PauseCircleFilledIconX = styled(PauseCircleFilledIcon)({
  color: _yellow,
  verticalAlign: 'middle',
  marginRight: '10px',
});

const ErrorIconX = styled(ErrorIcon)({
  color: _red,
  verticalAlign: 'middle',
  marginRight: '10px',
});

const DeleteButtonX = styled(DeleteIcon)({
  color: _red,
});

const VisibilityIconX = styled(VisibilityIcon)({
  color: _blue,
});

const CloudDoneIconX = styled(CloudDoneIcon)({
  color: _indigo,
});

const NotificationsActiveIconX = styled(NotificationsActiveIcon)({
  color: _indigo,
});

const NotificationsOffIconX = styled(NotificationsOffIcon)({
  color: _red,
});

const NearMeIconX = styled(NearMeIcon)({
  color: _green,
});

const WishList = memo(() => {
  const {
    currentUser,
    isLoading: isLoadingUserData,
    addWish,
    updateWish,
    removeWish,
  } = useContext(userContext);
  const { isLoading, onCheckProduct, getAfiliateLink } =
    useContext(wishContext);
  const history = useHistory();

  const [isVisibleAddForm, setIsVisibleAddForm] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [currentWish, setCurrentWish] = useState({});
  const [isVisibleDeleteDialog, setIsVisibleDeleteDialog] = useState(false);
  const [isVisibleNotificationDialog, setIsVisibleNotificationDialog] =
    useState(false);

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

  const onShowNotificationForm = (wish) => {
    setIsVisibleNotificationDialog(true);
    setCurrentWish(wish);
  };

  const onHideNotificationForm = () => {
    setIsVisibleNotificationDialog(false);
  };

  const onUpdateNotification = ({ notification, maxPrice }) => {
    updateWish({
      ...currentWish,
      notification,
      maxPrice,
    });
  };

  const options = {
    selectableRows: 'none',
    download: false,
    search: true,
    print: false,
    filter: false,
    viewColumns: false,
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        className: clsx({
          [globalStyles.highlightRow]: currentUser.wishes[rowIndex].hasProblem,
          // [globalStyles.warningLight]:
          //   currentUser.wishes[rowIndex].isOutOfStock,
        }),
      };
    },
  };

  const columns = [
    {
      name: 'name',
      label: 'Product Name',
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const currentElem = currentUser.wishes[dataIndex];
          const text = !!currentElem.name
            ? `${currentElem.name.substring(0, 60)} ${
                currentElem.name.length > 60 ? '...' : ''
              }`
            : '';

          return (
            <Tooltip
              title="There are some problems with the availability of the product"
              arrow
            >
              <span>
                {currentElem.hasProblem && <ErrorIconX />}
                {/* {currentElem.isOutOfStock && <PauseCircleFilledIconX />} */}
                {text}
              </span>
            </Tooltip>
          );
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
          const currentElem = currentUser.wishes[dataIndex];
          const lastPrice =
            currentElem.lastPrices && currentElem.lastPrices.length > 1
              ? currentElem.lastPrices[currentElem.lastPrices.length - 2]
              : 0.0;
          const currentPrice = currentElem.currentPrice;

          // parseFloat(amount).toFixed(2)

          return (
            <div>
              {currentElem.lastPrices && currentElem.lastPrices.length > 1 && (
                <span>{`${parseFloat(lastPrice).toFixed(2)} ${
                  currentElem.currency
                } >>> `}</span>
              )}
              <span>
                <strong>
                  {`${parseFloat(currentPrice).toFixed(2) || ''} ${
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
            currentUser.wishes[dataIndex].url,
          );

          return (
            <>
              {!!store && (
                <FontAwesomeIcon
                  icon={['fab', store]}
                  style={{ fontSize: 25 }}
                />
              )}
              <span>({domain})</span>
            </>
          );
        },
      },
    },
    {
      name: 'productId',
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
              onClick={() => onViewDetails(currentUser.wishes[dataIndex]._id)}
              className={globalStyles.btnAction}
            />
            <CloudDoneIconX
              fontSize="small"
              onClick={() => _onCheckProduct(currentUser.wishes[dataIndex])}
              className={globalStyles.btnAction}
            />
            {currentUser.wishes[dataIndex].notification ? (
              <NotificationsActiveIconX
                fontSize="small"
                onClick={() =>
                  onShowNotificationForm(currentUser.wishes[dataIndex])
                }
                className={globalStyles.btnAction}
              />
            ) : (
              <NotificationsOffIconX
                fontSize="small"
                onClick={() =>
                  onShowNotificationForm(currentUser.wishes[dataIndex])
                }
                className={globalStyles.btnAction}
              />
            )}
            <NearMeIconX
              fontSize="small"
              onClick={() => onGoToStore(currentUser.wishes[dataIndex]._id)}
              className={globalStyles.btnAction}
            />
            <DeleteButtonX
              fontSize="small"
              onClick={() => onRemoveWish(dataIndex)}
              className={clsx(globalStyles.btnAction, globalStyles.removeBtn)}
            />
          </div>
        ),
      },
    },
  ];

  const onRemoveWish = (dataIndex) => {
    if (localStorage.getItem('showConfirmDeleteWish') !== 'true') {
      onOpenDialog(currentUser.wishes[dataIndex]);
    } else {
      onRemoveLink(currentWish._id);
    }
  };

  const setAddFormVsibility = (value) => () => setIsVisibleAddForm(value);
  const _addWish = () => {
    if (newLink.length > 0) addWish({ url: newLink });

    setNewLink('');
  };
  const onChangeLink = (e) => setNewLink(e.target.value);

  const onAgreeDeleteDialog = () => {
    onCloseDeleteDialog();
    onRemoveLink(currentWish._id);
  };

  const onOpenDialog = (selectedWish) => {
    setIsVisibleDeleteDialog(true);
    setCurrentWish(selectedWish);
  };
  const onCloseDeleteDialog = () => setIsVisibleDeleteDialog(false);

  return (
    <section>
      {(isLoading || isLoadingUserData) && (
        <div className={globalStyles.bgMask}>
          <CircularProgress className={globalStyles.fixedProgres} />
        </div>
      )}
      {isVisibleNotificationDialog && (
        <NotificationForm
          isVisible={isVisibleNotificationDialog}
          hasNotification={currentWish.notification}
          maxPrice={currentWish.maxPrice}
          actualPrice={currentWish.currentPrice}
          currency={currentWish.currency}
          onChange={onUpdateNotification}
          onCancel={onHideNotificationForm}
        />
      )}
      <AddLinkForm
        isVisible={isVisibleAddForm}
        onAdd={_addWish}
        onCancel={setAddFormVsibility(false)}
      />
      {isVisibleDeleteDialog &&
        localStorage.getItem('showConfirmDeleteWish') !== 'true' && (
          <DeleteConfirmation
            isOpen={isVisibleDeleteDialog}
            showConfirmDeleteWish={localStorage.getItem(
              'showConfirmDeleteWish',
            )}
            handleAgree={onAgreeDeleteDialog}
            handleClose={onCloseDeleteDialog}
          />
        )}
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
    </section>
  );
});

export default WishList;
