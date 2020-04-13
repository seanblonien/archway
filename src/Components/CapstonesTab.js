import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DepartmentCapstones from './DepartmentCapstones';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CapstonesTab(props) {
  const {department} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState('current');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            value='current'
            label='Current'
            wrapped
          />
          <Tab value='past' label='Past'/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index='current'>
        <DepartmentCapstones department={department} current='True'/>
      </TabPanel>
      <TabPanel value={value} index='past'>
        <DepartmentCapstones department={department} current='False'/>
      </TabPanel>
    </div>
  );
}

CapstonesTab.propTypes = {
  department: PropTypes.objectOf(PropTypes.object).isRequired,
};