/*
Filename: Home.js
Contributors:
Stephen Tate - Wrote entire page.
Parker Wagner - Implemented and added targeted advertisement to Page
Ryan Cave - Designed Cappy logo.
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import withWidth from "@material-ui/core/withWidth/withWidth";
import Grid from '@material-ui/core/Grid';
import { Parallax, Background } from 'react-parallax';
import {strapi, strapiURL} from "../constants";
import SubHeadingTextTypography from "../Components/SubHeadingTextTypography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import BackgroundImage from '../Images/LogoFinal.png';
import {getAdvertisement} from "../util/Advertisements";
import LoadingCircle from "../Components/LoadingCircle";
import {homepageBackground} from "../constants";

const insideStyles = {
    backgroundImage: `url(${BackgroundImage})`,
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '300%',
    height: '182px',
    width: '350px',
};
const surroundStyle = {
    background: `rgb(0,0,0,0.75)`,
    paddingLeft: 20,
    paddingRight: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '300%',
    height: '202px',
    width: '370px',
};

const styles = theme => ({
    card: {
        marginTop: '1%',
    },
    leftColCard: {
        marginRight: '2%',
        marginTop: '1%',
    },
    textCenteredContainer: {
        position: 'relative',
    },
    photoGalleryGridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    gridListContainer: {
        marginTop: '2%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});


let divStyle = {
    backgroundImage: `url(${Background})`,
    width: '100%',
    height: '600px',
    backgroundSize: 'cover',
};

let paperStyle = {
    height: 400,
    width: '100%',
    textAlign: 'center'
};

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            capstones: [],
            loading: false,
            featuredCapstones: [],
            advertisement: null,
            sponsorName: null,
            mostViewedCapstones: [],
        };
    }


    async componentDidMount() {
        const capstoneList = await strapi.getEntries('capstones');
        this.populateFeaturedCapstones(capstoneList);
        var adUrl = await getAdvertisement();

        var advertisement = (<div className="col-lg-3 col-md-3">
            <a href={adUrl[1]}>
                <img src={adUrl[0]} onClick={adUrl[1]} width={300} height={260}/>
            </a>
            </div>);

        this.setState({loading: false, capstones: capstoneList, advertisement: advertisement, sponsorName: adUrl[2]});

        this.setState({mostViewedCapstones: this.state.capstones, loading: true});

    }

    populateFeaturedCapstones(capstones){
        let featuredCapstoneProjects = [];
        for(let thisCapstone in capstones){
            if(capstones[thisCapstone].Featured === true){
                featuredCapstoneProjects.push(capstones[thisCapstone]);
            }
        }
        this.setState({featuredCapstones: featuredCapstoneProjects});
    }


    getColumns(props) {
        if(this.state.featuredCapstones.length < 4){
            return this.state.featuredCapstones.length;
        }else{
            if(props.width ==='sm'){
                return 2;
            }
            if(props.width === 'xs'){
                return 2;
            }
            return 4;
        }
    }

    top5MostViewedCapstones(){
        var i = 1;
        var j;
        var key;
        var n = this.state.mostViewedCapstones.length;
        while (i !== n && n > 0) {

            key = this.state.mostViewedCapstones[i];
            j = i - 1;
            while (j >= 0 && this.state.mostViewedCapstones[j]['viewcount'] < key['viewcount']) {
                this.state.mostViewedCapstones[j + 1] = this.state.mostViewedCapstones[j];
                j = j - 1;
            }
            this.state.mostViewedCapstones[j + 1] = key;
            i++;
        }

        this.state.mostViewedCapstones.splice(4,this.state.mostViewedCapstones.length-4)


    }

    static handleTileClick(capstoneName){
        window.location = "/ViewCapstone/" + capstoneName;
    }

    render() {
        const {classes} = this.props;
        if (this.state.loading) {
            this.top5MostViewedCapstones();

            return (
                <div>
                    <Parallax bgImage={homepageBackground} strength={500}>
                        <div style={{height: 750}}>
                            <div style={surroundStyle}>
                                <div style={insideStyles}/>
                            </div>
                        </div>
                    </Parallax>

                    <Grid container justify="center">
                        <Grid item xs={12} md={4}>
                            <CardContent>
                                <SubHeadingTextTypography text="What is Cappy?"/>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Divider light={true}/>
                                    </Grid>
                                </Grid>
                                <Typography variant="body1" style={{marginTop: '1%'}}>
                                    Cappy is a Capstone Management System designed for students and sponsors alike. We
                                    provide students a platform to <b>store, edit, and present</b> their capstone
                                    projects.
                                </Typography>
                            </CardContent>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <CardContent>
                                <SubHeadingTextTypography text="With Cappy, You Can:"/>
                                <Grid container>
                                    <Grid item xs={7}>
                                        <Divider light={true}/>
                                    </Grid>
                                </Grid>
                                <Typography variant="body1" style={{marginTop: '1%'}}>
                                    ✓ Create a capstone project
                                </Typography>
                                <Typography variant="body1" style={{marginTop: '1%'}}>
                                    ✓ Post updates
                                </Typography>
                                <Typography variant="body1" style={{marginTop: '1%'}}>
                                    ✓ Make connections
                                </Typography>
                                <Typography variant="body1" style={{marginTop: '1%'}}>
                                    ✓ Become a sponsor
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>


                    <Grid container justify="center">
                        <Grid item xs={12} md={8}>
                            <SubHeadingTextTypography style={{marginTop: '100px'}}
                                                      text="Check Out Our Featured Capstones!" align="center"/>
                            <Divider variant="middle"/>
                            <div className={classes.gridListContainer}>
                                <GridList className={classes.photoGalleryGridList} cols={this.getColumns(this.props)}>
                                    {this.state.featuredCapstones.map((result, i) => (
                                        <GridListTile style={{maxWidth: '300px'}}
                                                      key={strapiURL + this.state.featuredCapstones[i]['DisplayPhoto'].url}
                                                      onClick={(e) => Home.handleTileClick(result.id)}>
                                            <img src={strapiURL + this.state.featuredCapstones[i]['DisplayPhoto'].url}
                                                 alt={"Capstone"} style={{height: '100%', width: '100%'}}/>
                                            <GridListTileBar
                                                title={result.CapstoneName}
                                                subtitle={"Made by: " + result.moderator.username}
                                                actionIcon={
                                                    <IconButton className={classes.icon}
                                                                href={"/ViewCapstone/" + result.id}>
                                                        <InfoIcon/>
                                                    </IconButton>
                                                }
                                            >
                                            </GridListTileBar>
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{marginTop: '1.5%'}}>
                        <Grid item xs={12} md={8}>
                            <SubHeadingTextTypography text={"Sponsored Message from " + this.state.sponsorName + "!"}
                                                      align="center"/>
                            <Divider variant="middle"/>
                            <div className={classes.gridListContainer}>
                                {this.state.advertisement}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        else{
            return (<div>
                < LoadingCircle />
            </div>);
        }
    }
}

export default compose(
    withStyles(styles),
    withWidth(),
)(Home);