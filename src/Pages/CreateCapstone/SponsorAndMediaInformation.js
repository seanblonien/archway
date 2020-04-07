import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BusinessIcon from '@material-ui/icons/Business';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import DragAndDropZone from '../../Components/DragAndDropZone/DragAndDropZone';
import PageTitleTypography from '../../Components/PageTitleTypography';

const SponsorAndMediaInformation = (props) => 

/*
  * classes
  * selectedSponsor
  * handleSelectSponsor
  * sponsorList
  * handleConfirmSponsor
  * checkedSponsors
  * handleAcceptImageThumbnail
  * handleAcceptImageCoverPhoto
  * handleAcceptImageMedia
  */


  (
    <Grid container justify='center'>
      <Grid item xs={12} md={10}>
        <Card className={props.classes.card}>
          <CardContent>
            <PageTitleTypography text='Sponsor Information' align='left' size='h5'/>
            <Divider/>
            <Grid container  justify='center'>
              <Grid item xs={12}>

                <Grid container  justify='center' spacing={2} alignItems='center'>
                  <Tooltip title='Select a Sponsor' arrow>

                     <Grid item xs={9}>
                      <FormControl margin='dense' fullWidth variant='filled'>
                        <InputLabel ref={null}>Sponsor</InputLabel>
                        <Select
                          labelId='demo-customized-select-label'
                          id='demo-customized-select'
                          value={props.selectedSponsor}
                          onChange={props.handleSelectSponsor}
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          {props.sponsorList.map(sponsor => (
                            <MenuItem value={sponsor.name}>{sponsor.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                   </Tooltip>
                  <Grid item xs>
                     <Button variant='outlined' color='primary' onClick={() => props.handleConfirmSponsor(props.selectedSponsor)}>
                      Confirm
                    </Button>
                   </Grid>
                </Grid>
              </Grid>
              <Divider/>
              {props.checkedSponsors.map(sponsor =>(<ListItem>
                <ListItemAvatar>
                  <Avatar>
                     <BusinessIcon/>
                   </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={sponsor}
                />
              </ListItem>))
              }
            </Grid>

          </CardContent>
        </Card>

      </Grid>
      <Grid item xs={12} md={10}>
        <Grid container  justify='center' spacing={2} alignItems='center'>
          <Grid item xs={3}>
            <Card className={props.classes.card}>

              <CardContent>
                <DragAndDropZone
                  acceptImage={props.handleAcceptImageThumbnail.bind(this)}
                  prompt='Drop or click to upload a thumbnail'
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Card className={props.classes.card}>

              <CardContent>
                <DragAndDropZone
                  acceptImage={props.handleAcceptImageCoverPhoto.bind(this)}
                  prompt='Drop or click to upload a cover photo'
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={10}>
        {/* Submit button */}
        <Card className={props.classes.card}>
          <CardContent>
            <DragAndDropZone
              acceptImage={props.handleAcceptImageMedia.bind(this)}
              prompt='Drop or click to upload a picture'
            />
          </CardContent>
        </Card>

      </Grid>
    </Grid>
  )
;

export default SponsorAndMediaInformation;