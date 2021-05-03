import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getStoreAndDomain } from '../../services/helper';
import { Context as userContext } from '../../context/user';
import { useHistory } from "react-router-dom";

import getGlobalStyles from '../../common/styles/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import NearMeIcon from '@material-ui/icons/NearMe';
import AddLinkForm from './add-form';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  actionsBtnWrapper: {
    display: 'flex',
    padding: '5px 0',
  },
  addBtn: {
    marginLeft: 5,
  }
}));

const WishList = memo(({ }) => {
  const { currentUser, addWish, removeWish } = useContext(userContext);
  const history = useHistory();

  const [isVisibleAddForm, setIsVisibleAddForm] = useState(false);
  const [newLink, setNewLink] = useState('https://www.amazon.fr/gp/product/B08FD3L3MP?pf_rd_r=7BXNPZ1THJ6R61QTT9EV&pf_rd_p=ed1ef413-005c-474d-837a-434c7d76d0d9&pd_rd_r=0978967d-15ef-4943-9447-e5684739cae5&pd_rd_w=YNP6p&pd_rd_wg=SHm7q&ref_=pd_gw_unk');
  const classes = useStyles();
  const globalStyles = getGlobalStyles();

  const options = {
    onRowClick: (rowData, rowMeta) =>  history.push(`${window.location.pathname}/${currentUser.wishes[rowMeta.rowIndex]._id}`)
  };

  const onRemoveLink = () => console.log('TODO onRemoveLink ...');
  const onGoToStore = () => console.log('TODO onGoToStore ...');

  const columns = [
    {
      name: "name",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "url",
      label: "Link",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "domain",
      label: "Domain",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const { store, domain } = getStoreAndDomain(currentUser.wishes[rowIndex].url);

          return (
            <>
              {!!store && <FontAwesomeIcon icon={["fab", store ]} />}
              <span>({domain})</span>
            </>
          );
        },
      }
    },
    {
      name: "asin",
      label: "ASIN code",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <div className={globalStyles.flex}>
            <IconButton color={'secondary'} aria-label="menu" onClick={onGoToStore}>
              <NearMeIcon fontSize='small' />
            </IconButton>
            <IconButton className={globalStyles.removeBtn} aria-label="menu" onClick={onRemoveLink}>
              <DeleteIcon fontSize='small' />
            </IconButton>
          </div>
        )
      }
    },
  ];

  useEffect(() => {
  }, []);

  const setAddFormVsibility = value => () => setIsVisibleAddForm(value);
  const _addWish = () => addWish({ url: newLink });
  const onChangeLink = e => setNewLink(e.target.value)

  console.log('currentUser', currentUser);

  return (
    <>
      <AddLinkForm isVisible={isVisibleAddForm} onAdd={_addWish} onCancel={setAddFormVsibility(false)} />
      <div className={classes.actionsBtnWrapper}>
        <TextField name="link" fullWidth label="Add new link to your wishlist" size={'small'} variant="outlined" value={newLink} onChange={onChangeLink} />
        <IconButton color="primary" edge="start" aria-label="add link" onClick={_addWish} className={classes.addBtn}>
          <AddIcon />
        </IconButton>
      </div>
      <MUIDataTable
        title={"Wishlist"}
        data={currentUser.wishes}
        columns={columns}
        options={options}
      />
    </>
    );
  });

  WishList.propTypes = {

  };

  WishList.defaultProps = {

  };

  export default WishList;