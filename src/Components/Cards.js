import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {getFirstNWords} from '../utils/utils';
import {strapiURL} from '../constants';
import defaultCardImg from '../Static/arch.svg';

class Cards extends Component {

  getImageUrl = (item) => {
    if(item != null) {
      return strapiURL + item.url;
    }
    return defaultCardImg;
  };

  render() {
    const {listItems, childURL} = this.props;

    return listItems.map((item, i) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
        <Card style={{height: 425,}}>
          <CardActionArea component={Link} to={childURL + item._id}>
            <CardMedia
              component='img'
              height='300'
              image={this.getImageUrl(listItems[i].image)}
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
  childURL: PropTypes.string.isRequired
};

export default Cards;
