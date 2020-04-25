import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import {SelectValidator} from 'react-material-ui-form-validator';
import Cards from '../../Components/Cards';
import DragAndDrop from '../../Components/DragAndDropZone/DragAndDrop';
import PageTitleTypography from '../../Components/PageTitleTypography';
import {imageURL} from '../../utils/utils';

const SponsorAndMediaInformation = (props) => {

  const {classes, setCover, cover, thumbnail, media, setThumbnail, setMedia,
    selectedSponsor, handleSelectSponsor, sponsorList, handleConfirmSponsor, checkedSponsors,
    setCheckedSponsor
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
                      onClick={() => (
                        setCheckedSponsor([...checkedSponsors, selectedSponsor])
                      )}
                    >
                      Confirm
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Cards
                  listItems={checkedSponsors}
                  imageURLFunction={imageURL.sponsor}
                  setListItems={setCheckedSponsor}
                  canRoute={false}
                  canDelete
                  previewWords={10}
                  mediaHeight={100}
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
  handleSelectSponsor: PropTypes.func.isRequired,
  handleConfirmSponsor: PropTypes.func.isRequired,
  setCheckedSponsor: PropTypes.func.isRequired,
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
