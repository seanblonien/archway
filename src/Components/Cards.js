import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getFirstNWords} from '../utils/utils';
import gStyle from '../utils/styles.module.css';

class Cards extends Component {

  render() {
    const {listItems, childURL, imageURLFunction} = this.props;

    return listItems.map((item, i) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
        <Card className={gStyle.card}>
          <CardActionArea component={Link} to={childURL + item._id}>
            <CardMedia
              component='img'
              height='300'
              image={imageURLFunction(listItems[i].thumbnail)}
            />
            <CardContent>
              <Typography variant='h5'>
                {item.name}
              </Typography>
              <Typography variant='body1'>
                {getFirstNWords(item.preview, 20) }
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  }
}

Cards.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  childURL: PropTypes.string.isRequired,
  imageURLFunction: PropTypes.func.isRequired
};

export default Cards;
