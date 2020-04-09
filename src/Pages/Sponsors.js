import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth/withWidth';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../Services/api';
import LoadingCircle from '../Components/LoadingCircle';
import {getBgImageFromStrapi} from '../utils/utils';
import MediaMarkdown from '../Components/MediaMarkdown';

const styles = () => ({
  button: {
    color: 'white',
    border: '2px solid white'
  },
  sidePanel: {
    height: '800px',
    backgroundColor: 'black',
    color: 'white',
    opacity: '0.7'
  }
});

class Sponsors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pageContent: [],
    };
  }

  async componentDidMount() {
    const pageContent = await api.sponsorpage.find();
    this.setState({loading: false, pageContent});
  }

  render() {
    const {classes} = this.props;
    const {loading, pageContent} = this.state;

    return loading ?
      <LoadingCircle/> :
      <div>
        <div style={{width: '100%', height: '800px', backgroundImage: getBgImageFromStrapi(pageContent.bgimage.url), backgroundSize: 'cover'}}>
          <Grid container direction='row' display='inline' justify='flex-end'>
            <Grid item xs={12} md={4}>
              <Card className={classes.sidePanel}>
                <CardContent>
                  <MediaMarkdown>
                    {pageContent.main_paragraph}
                  </MediaMarkdown>
                  <br/>
                  <Grid item align='center'>
                    <Button className={classes.button} size='large'>
                      Sponsor Signup
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div>
          <br/>
          <Grid container direction='row' justify='space-evenly'>
            <Grid item container direction='column' md={5}>
              <Grid item>
                <MediaMarkdown>
                  {pageContent.leftcolumn}
                </MediaMarkdown>
              </Grid>
            </Grid>
            <Grid item container direction='column' md={5}>
              <Grid item>
                <MediaMarkdown>
                  {pageContent.rightcolumn}
                </MediaMarkdown>
                <br/><br/>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <br/>
      </div>;
  }
}

Sponsors.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default (withStyles(styles)(withWidth()(Sponsors)));
