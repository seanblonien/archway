import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import {getFirstNWords} from '../utils/utils';

const DeletableCardLayout = (props) => {

  const {listItems, imageURLFunction, removeItem} = props;

  return (
    <Grid container direction='row' spacing={2}>
      {listItems.map((item, i) => (
        <Grid item xs={3}  sm={6} md={4} lg={3} key={item.name}>
          <Card>
            <CardActionArea>
              <CardMedia
                component='img'
                height='100'
                image={imageURLFunction(listItems[i].thumbnail)}
              />
              <CardContent>
                <Typography variant='h6'>
                  {item.name}
                </Typography>
                <Typography variant='h7'>
                  {getFirstNWords(item.preview, 5) }
                </Typography>

              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label='delete'>
                  <DeleteIcon onClick={() => removeItem(item.id)}/>
                </IconButton>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
      ))
      }
    </Grid>
  );
};

DeletableCardLayout.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func.isRequired,
  imageURLFunction: PropTypes.func.isRequired
};

export default DeletableCardLayout;
