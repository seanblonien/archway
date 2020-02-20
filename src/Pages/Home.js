/*
Filename: Home.js
Contributors:
Stephen Tate - Wrote entire page.
Parker Wagner - Implemented and added targeted advertisement to Page
Ryan Cave - Designed Cappy logo.
Emily Tracey - updated page to match different branding (2-18-2019)
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
import {strapi, strapiURL, university, schoolColorPrimary, schoolColorSecondary} from "../constants";
import SubHeadingTextTypography from "../Components/SubHeadingTextTypography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {getAdvertisement} from "../util/Advertisements";
import LoadingCircle from "../Components/LoadingCircle";
import {homepageBackground} from "../constants";
import { Button, Paper, Link } from '@material-ui/core';

const insideStyles = {
    background: schoolColorPrimary,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '250%',
    height: '500px',
    width: '350px',
    paddingTop: 10,
    paddingBottom: 50,
};
const surroundStyle = {
    background: `rgb(0,0,0,0.75)`,
    paddingLeft: 20,
    paddingRight: 20,
    position: "absolute",
    top: "50%",
    left: "75%",
    transform: "translate(-50%,-50%)",
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '200%',
    height: '520px',
    width: '370px',
};

const styles = theme => ({
    card: {
        marginTop: '1%',
    },
    topButtom: {
        color:'black',
        width: 350,
        height: 50,
        left: '-14%',
        variant: 'contained',
        fontSize: 16
    },
    featuredPaper:{
        background: schoolColorSecondary,
        color: 'black',
        marginTop: 30,
        marginLeft: 30,
        textAlign: "center",
        height: 450,
        maxWidth: 600,
    },
    infoTextPaper: {
        background: "lightgrey",
        color: "black",
        marginTop: 10,
        height: 400,
        marginRight: 30,
        maxWidth: 600,
        textAlign: "center",
    },
    topCard:{
        marginTop: '1%',
        maxWidth: 360,
        color: 'black'
    },
    leftColCard: {
        marginRight: '2%',
        marginTop: '1%',
    },
    textCenteredContainer: {
        position: 'relative',
    },
    paper: {
        height: 140,
        width: 100,
    },
    gridListContainer: {
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        display: 'flex',
        flexWrap: 'wrap',
        align: 'center',
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
                        <div style={{height: 650}}>
                            <div style={surroundStyle}>
                                <div style={insideStyles}>
                                    <Typography variant='h4' style={{color: 'white'}}>{university} University</Typography>
                                    <Typography variant='h5' style={{color: 'white'}}></Typography>
                                    <Typography variant='h2' style={{color: 'white'}}>Capstones</Typography>
                                    <div> 
                                        <Link href='/Capstones'>
                                            <Button className={classes.topButtom} variant="contained" color='secondary'>Check out Current Capstones</Button>
                                        </Link>
                                        <Link href='/ViewSponsors'>
                                            <Button className={classes.topButtom} variant="contained" color='secondary'>Check Out Our Sponsors</Button>
                                        </Link>
                                        <Link href='./Sponsors'>
                                            <Button className={classes.topButtom} variant="contained" color='secondary'>Become a Sponsor</Button>
                                        </Link>
                                    </div>
                                </div>/>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </Parallax>

                    <Grid 
                        container 
                        direction="row"
                        alignItems="flex-end"
                        justify="center"
                        spacing={3}>
                        <Grid item xs={6} align="right">
                            <Paper className={classes.featuredPaper}>
                                <Typography variant="h4">Featured Capstones</Typography>
                                <div className={classes.gridListContainer}>
                                    <GridList cellHeight={180} cols={2}>
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
                                <Link href="/Capstones">See More</Link>
                            </Paper>
                        </Grid>
                        <Grid item xs={5} >
                            <Typography variant='h4' align="left">More Information</Typography>
                                <Paper elevation={3} className={classes.infoTextPaper}>
                                    <Typography p={2} variant="body1">
                                    Lots of info right here! all about capstones and baylor and 
                                    all of that!
                                    </Typography>
                                </Paper>
                        </Grid>
                    </Grid>


                    <Grid container justify="center" style={{marginTop: '1.5%'}}>
                        <Grid item xs={12} md={8}>
                            <Typography align="center" variant="h4">Sponsors</Typography>
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