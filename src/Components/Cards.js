import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {childrenPropTypes} from '../utils/PropTypesConfig';
import root from '../utils/styles.module.css';
import {getFirstNWords} from '../utils/utils';

const Cards = ({listItems, childURL, imageURLFunction, mediaHeight, canRoute, canDelete, setListItems, previewWords, ...rest}) => {
  const ActionArea = ({to, ...props}) => (
    canRoute
      ? <CardActionArea component={Link} to={to} {...props}/>
      : <CardActionArea {...props}/>
  );
  ActionArea.propTypes = {...childrenPropTypes, to: PropTypes.string};
  ActionArea.defaultProps = {to: ''};

  return (
    <Grid container spacing={4} {...rest}>
      {listItems.map((item, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
          <Card className={root.card}>
            <ActionArea to={childURL(item.id)}>
              <CardMedia
                component='img'
                height={mediaHeight}
                image={imageURLFunction(listItems[i].thumbnail)}
              />
              <CardContent>
                <Typography variant='h5'>
                  {item.name}
                </Typography>
                <Typography variant='body1'>
                  {getFirstNWords(item.preview, previewWords) }
                </Typography>
              </CardContent>
              {canDelete &&
                <CardActions disableSpacing>
                  <DeleteIcon
                    aria-label='delete'
                    onClick={() => (
                      setListItems(listItems.filter(it => it.id !== item.id))
                    )}
                  />
                </CardActions>
              }
            </ActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

Cards.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  imageURLFunction: PropTypes.func.isRequired,
  childURL: PropTypes.func,
  mediaHeight: PropTypes.number,
  canRoute: PropTypes.bool,
  setListItems: PropTypes.func,
  previewWords: PropTypes.number,
  canDelete: PropTypes.bool
};

Cards.defaultProps = {
  mediaHeight: 300,
  canRoute: true,
  canDelete: false,
  previewWords: 20,
  setListItems: () => null,
  childURL: () => null
};

export default Cards;
