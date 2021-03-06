import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {TextValidator} from 'react-material-ui-form-validator';
import Cards from '../../Components/Cards';
import DragAndDrop from '../../Components/DragAndDropZone/DragAndDrop';
import SubSectionTitle from '../../Components/Typography/SubsectionTitle';
import {imageURL} from '../../utils/utils';

const SponsorAndMediaInformation = (props) => {

  const {classes, setCover, cover, thumbnail, media, setThumbnail, setMedia,
    sponsorList, checkedSponsors,
    setCheckedSponsor
  } = props;

  const renderInputForSponsor = (inputProps) => (
    <TextValidator
      label='Search for a Sponsor'
      validators={['haveDepartment'] }
      errorMessages={['Must select a department']}
      {...inputProps}
    />
  );

  const defaultPropsSponsor = {
    // options: AllUsers,
    options: _.differenceWith(sponsorList, checkedSponsors, _.isEqual),
    getOptionLabel: (option) => {
      if (option.name) {
        return option.name;
      }
      return '';
    }
  };

  return (
    <Grid container justify='center'>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <SubSectionTitle>Add Sponsors</SubSectionTitle>
            <Grid container justify='center'>
              <Grid item xs={12}>
                <Tooltip title='Select a Sponsor' arrow>
                  <FormControl margin='dense' fullWidth variant='filled'>
                    <Autocomplete
                      id='Search for a Sponsor'
                      {...defaultPropsSponsor}
                      value={null}
                      onChange={(event, value) => {
                        setCheckedSponsor([...checkedSponsors, value]);
                      }}
                      renderInput={renderInputForSponsor}
                    />
                  </FormControl>
                </Tooltip>
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
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
  setCheckedSponsor: PropTypes.func.isRequired,
  sponsorList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  checkedSponsors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
    })).isRequired
  ]).isRequired,
};

export default SponsorAndMediaInformation;
