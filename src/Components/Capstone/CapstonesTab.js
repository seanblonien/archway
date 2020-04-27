import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CapstonesList from './CapstonesList';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function CapstonesTab(props) {
  const {capstones} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState('current');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange}>
          <Tab value='current' label='Current'/>
          <Tab value='past' label='Past'/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index='current'>
        <CapstonesList capstones={capstones} current='True'/>
      </TabPanel>
      <TabPanel value={value} index='past'>
        <CapstonesList capstones={capstones} current='False'/>
      </TabPanel>
    </div>
  );
}

CapstonesTab.propTypes = {
  capstones: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};
