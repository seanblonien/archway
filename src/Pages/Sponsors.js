import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth/withWidth';
import React, {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import LoadingCircle from '../Components/LoadingCircle';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import api from '../Services/api';
import routes from '../utils/Routing/routes';
import {getBgImageFromStrapi} from '../utils/utils';

const styles = () => ({
  sidePanel: {
    height: '800px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
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
            <Grid item xs={12} md={4} lg={3}>
              <Card className={classes.sidePanel}>
                <CardContent>
                  <MediaMarkdown>
                    {pageContent.main_paragraph}
                  </MediaMarkdown>
                  <br/>
                  <Grid item align='center'>
                    <Button variant='contained' color='secondary'>
                      <Link component={RouterLink} to={routes.auth.signup.path}>
                        Sponsor Signup
                      </Link>
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

export default (withStyles(styles)(withWidth()(Sponsors)));
