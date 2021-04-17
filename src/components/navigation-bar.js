import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const NavigationBar = memo(({ tabs }) => {
  const history = useHistory();

  const [value, setValue] = useState(0);

  const _onChange = (event, tabIndex) => {
    setValue(tabIndex);
    history.push(tabs[tabIndex].url);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={_onChange}
      showLabels
    >
      {tabs.map(tab => (
        <BottomNavigationAction key={tab.label} label={tab.label} />
      ))}
    </BottomNavigation>
    );
  });

  NavigationBar.propTypes = {
    tabs: PropTypes.array,
  };

  NavigationBar.defaultProps = {
    tabs: [],
  };

  export default NavigationBar;