import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import {SelectValidator} from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PageTitleTypography from '../../Components/PageTitleTypography';
import DragAndDrop from '../../Components/DragAndDropZone/DragAndDrop';
import {imageURL} from '../../utils/utils';
import DeletableCardLayout from '../../Components/DeletableCardLayout';

const SponsorAndMediaInformation = (props) => {

  const {classes, setCover, cover, thumbnail, media, setThumbnail, setMedia,
    selectedSponsor, handleSelectSponsor, sponsorList, handleConfirmSponsor, checkedSponsors,
    handleRemoveSponsor, toDeleteThumbnail, toDeleteMedia, toDeleteCover
  } = props;
  return (
    <Grid container justify='center'>
      <Grid item xs={12} md={10}>
        <Card className={classes.card}>
          <CardContent>
            <PageTitleTypography text='Sponsor Information' align='left' size='h5'/>
            <Divider/>
            <Grid container justify='center'>
              <Grid item xs={12}>
                <Grid container justify='center' spacing={2} alignItems='center'>
                  <Tooltip title='Select a Sponsor' arrow>
                    <Grid item xs={9}>
                      <FormControl margin='dense' fullWidth variant='filled'>
                        <SelectValidator
                          variant='outlined'
                          id='demo-customized-select'
                          label='Select a sponsor'
                          value={selectedSponsor}
                          onChange={handleSelectSponsor}
                          validators={['required'] }
                          errorMessages={['this field is required']}
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          {sponsorList.map(sponsor => (
                            <MenuItem
                              key={sponsor.id}
                              value={sponsor}
                            >{sponsor.name}</MenuItem>
                          ))}
                        </SelectValidator>
                      </FormControl>
                    </Grid>
                  </Tooltip>
                  <Grid item xs>
                    <Button
                      variant='outlined' color='primary'
                      onClick={() => {
                        handleConfirmSponsor(selectedSponsor);}
                      }
                    >
                      Confirm
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <DeletableCardLayout
                  listItems={checkedSponsors}
                  imageURLFunction={imageURL.sponsor}
                  removeItem={handleRemoveSponsor}
                />
              </Grid>
            </Grid>

          </CardContent>
        </Card>

      </Grid>
      <Grid item xs={12} md={10}>
        <Card className={classes.card}>
          <CardContent>
            <Typography align='center' variant='h5'>
              Upload a Thumbnail
            </Typography>
            <Divider/>
            <DragAndDrop
              setFiles={setThumbnail}
              files={thumbnail}
              accept='image/*'
              single
              deletedFiles={toDeleteThumbnail}
            />
          </CardContent>
        </Card>

      </Grid>
      <Grid item xs={12} md={10}>
        <Card className={classes.card}>
          <CardContent>
            <Typography align='center' variant='h5'>
              Upload Cover Photo
            </Typography>
            <Divider/>
            <DragAndDrop
              setFiles={setCover}
              files={cover}
              accept='image/*'
              deletedFiles={toDeleteCover}
            />
          </CardContent>
        </Card>

      </Grid>
      <Grid item xs={12} md={10}>
        <Card className={classes.card}>
          <CardContent>
            <Typography align='center' variant='h5'>
              Upload Media
            </Typography>
            <DragAndDrop
              setFiles={setMedia}
              files={media}
              deletedFiles={toDeleteMedia}
            />
          </CardContent>
        </Card>

      </Grid>
    </Grid>
  );
};

SponsorAndMediaInformation.propTypes = {
  cover: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  thumbnail: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  media: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  setCover: PropTypes.func.isRequired,
  setThumbnail: PropTypes.func.isRequired,
  setMedia: PropTypes.func.isRequired,
  toDeleteThumbnail: PropTypes.func.isRequired,
  toDeleteMedia: PropTypes.func.isRequired,
  toDeleteCover: PropTypes.func.isRequired,
  handleSelectSponsor: PropTypes.func.isRequired,
  handleConfirmSponsor: PropTypes.func.isRequired,
  handleRemoveSponsor: PropTypes.func.isRequired,
  selectedSponsor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
      preview: PropTypes.string.isRequired,
      thumbnail: PropTypes.shape({url: PropTypes.string, id: PropTypes.string}).isRequired,
    }),
  ]).isRequired,
  sponsorList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
    preview: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({url: PropTypes.string, id: PropTypes.string}).isRequired,
  })).isRequired,
  checkedSponsors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
      preview: PropTypes.string.isRequired,
      thumbnail: PropTypes.shape({url: PropTypes.string, id: PropTypes.string}).isRequired,
    })).isRequired
  ]).isRequired,
};

export default SponsorAndMediaInformation;
