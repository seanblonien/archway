import {Box} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import {SocialIcon} from 'react-social-icons';
import api from '../Services/api';
import archway from '../Static/arch.svg';
import universityLogo from '../Static/univ_logo.svg';
import PageWithMargin from './LayoutWrappers/PageWithMargin';
import LoadingCircle from './LoadingCircle';
import MediaMarkdown from './Markdown/MediaMarkdown';
import {StyledLink} from './Typography/StyledLink';

class Footer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      sections: [],
      lastLine: {}
    };
  }

  async componentDidMount() {
    const {footerLinks: {sections,  lastLine}} = await api.headerfooter.find();
    this.setState({loading: false, sections, lastLine});
  }

  getLogo = (logoType) => {
    switch (logoType) {
      case 'university':
        return universityLogo;
      case 'archway':
      default:
        return archway;
    }
  };

  alignSection = (index) => {
    const {sections} = this.state;
    if(index === 0) {
      return 'flex-start';
    }
    if(index === sections.length - 1){
      return 'flex-end';
    }
    return 'center';
  };

  render () {
    const {loading, sections, lastLine} = this.state;
    const {getLogo, alignSection, props} = this;

    return (
      loading ?
        <LoadingCircle/>
        :
        <PageWithMargin {...props}>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} component={Box} pt={10} pb={3}>
              <Divider light/>
            </Grid>
            <Grid item xs={12} md={10} lg={9} xl={8} container>
              <Grid item xs={12} container justify='space-between'>
                {sections && sections.map((section, i) => (
                  <Grid item xs key={`footer-section-${section.id}`} container direction='column' alignContent={alignSection(i)}>
                    <Typography variant='h6'>{section.sectionHeader}</Typography>
                    <List disablePadding dense>
                      {section.links && section.links.map((link) => (
                        link.isLogo ?
                          <ListItem key={`footer-logo-${link.id}`}>
                            <Box m={1}>
                              <StyledLink to={link.path}>
                                <img src={getLogo(link.logoType)} alt={link.label} title={link.label} height={link.logoHeight} width={link.logoWidth}/>
                              </StyledLink>
                            </Box>
                          </ListItem>
                          :
                          <ListItem key={`footer-link-${link.id}`}>
                            {link.isSocial &&
                              <ListItemIcon>
                                <SocialIcon url={link.path} style={{height: 32, width: 32}}/>
                              </ListItemIcon>
                            }
                            <ListItemText>
                              <StyledLink to={link.path}>{link.label}</StyledLink>
                            </ListItemText>
                          </ListItem>
                      ))}
                    </List>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} container justify='space-between' component={Box} pt={1}>
                <Grid item xs={12} component={Box} py={1}>
                  <Divider light/>
                </Grid>
                <Grid item xs={6} container justify='flex-start'>
                  {lastLine.left &&
                    <Grid item>
                      <MediaMarkdown>{lastLine.left}</MediaMarkdown>
                    </Grid>
                  }
                </Grid>
                <Grid item xs={6} container justify='flex-end'>
                  {lastLine.left &&
                    <Grid item>
                      <MediaMarkdown>{lastLine.right}</MediaMarkdown>
                    </Grid>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PageWithMargin>
    );
  }
}

export default Footer;
