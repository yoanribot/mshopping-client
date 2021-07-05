import React, { memo, useContext, useEffect } from 'react';
import { getStoreAndDomain } from 'services/helper';
import { Context as wishContext } from 'context/wish';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { red, blue, indigo, green } from '@material-ui/core/colors';
import getGlobalStyles from 'common/styles/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NearMeIcon from '@material-ui/icons/NearMe';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';

const _red = red[700];
const _green = green[600];
const _indigo = indigo[400];
const _blue = blue[500];

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

const NearMeIconX = styled(NearMeIcon)({
  color: _green,
});

const WishList = memo(() => {
  const globalStyles = getGlobalStyles();

  const { wishes, getWishes, removeWish, onCheckProduct, getAfiliateLink } =
    useContext(wishContext);
  const history = useHistory();

  useEffect(() => {
    getWishes();
  }, []);

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
    download: false,
    search: true,
    print: false,
    filter: false,
    viewColumns: true,
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        className: clsx({
          [globalStyles.highlightRow]: wishes[rowIndex].hasProblem,
          // [globalStyles.warningLight]:
          //   wishes[rowIndex].isOutOfStock,
        }),
      };
    },
  };

  const columns = [
    {
      name: '_id',
      label: 'DB ID (_id)',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: 'Product Name',
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const currentElem = wishes[dataIndex];
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
        display: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const currentElem = wishes[dataIndex];
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
      name: 'url',
      label: 'Url',
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: 'domain',
      label: 'Domain',
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const { store, domain } = getStoreAndDomain(wishes[dataIndex].url);

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
      label: 'Product ID',
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
        viewColumns: false,
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <div className={globalStyles.flex}>
            <VisibilityIconX
              fontSize="small"
              onClick={() => onViewDetails(wishes[dataIndex]._id)}
              className={globalStyles.btnAction}
            />
            <CloudDoneIconX
              fontSize="small"
              onClick={() => _onCheckProduct(wishes[dataIndex])}
              className={globalStyles.btnAction}
            />
            <NearMeIconX
              fontSize="small"
              onClick={() => onGoToStore(wishes[dataIndex]._id)}
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
    removeWish(wishes[dataIndex]._id);
  };

  return (
    <section>
      <MUIDataTable
        title={'Wishlist'}
        data={wishes}
        columns={columns}
        options={options}
      />
    </section>
  );
});

export default WishList;
