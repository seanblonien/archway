import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {imageURL} from '../../utils/utils';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';


const styles = (theme) => ({
  paper:{
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    outline: 'none',
  },
  image:{
    height: '100%',
    width: '100%',
  },
  pad:{
    padding: theme.spacing(2),
  }
});

const ResultCapstone = ({classes, capstone}) => {

  const goToCapstone = () => {
    history.push(routes.viewcapstone.genPath(capstone.id));
  };

  return (
    <Paper className={classes.paper} onClick={goToCapstone}>
      <Grid container direction='row'>
        <Grid item xs={2}>
          <img src={imageURL.capstone(capstone.thumbnail)} alt='Capstone' className={classes.image}/>
        </Grid>
        <Grid item xs={10} container direction='column' className={classes.pad}>
          <Grid item>
            <Typography variant='h6'>{capstone.name}</Typography>
          </Grid>
          <Grid item>
            <Typography>{capstone.preview && (capstone.preview.length < 125 ? capstone.preview : capstone.preview.substring(0, 125).concat('...'))}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

ResultCapstone.propTypes = {
  capstone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    preview: PropTypes.string,
    thumbnail: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
  }).isRequired,
};

export default withStyles(styles) (ResultCapstone);