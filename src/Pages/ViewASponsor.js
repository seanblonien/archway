/*
Filename: ViewASponsor.js
Contributors:
Brenden Detels - Wrote entire page
Greg Keeton - Image Carousel
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LoadingCircle from '../Components/LoadingCircle.js';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import {strapiURL, strapi} from "../constants";
import Button from '@material-ui/core/Button';
import PageTitleTypography from "../Components/PageTitleTypography";
import CardContent from "@material-ui/core/CardContent";
import SubHeadingTextTypography from "../Components/SubHeadingTextTypography";
import {Carousel} from "react-responsive-carousel";


const styles = theme => ({
    card: {
        raised: true,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    sponsorImage: {
        height: 'auto',
        maxWidth: '80%',
        borderRadius: '5px',
    },
    title: {
        fontSize: 14,
    },
    button: {
        border: '2px solid currentColor',
        borderRadius: 0,
        height: 'auto',
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 5}px`,
    },
    pos: {
        marginBottom: 100,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    capstoneCard: {
        background: '#f1f1f1f1',
    },
    associatedCard: {
        raised: true,
        height: '200px',
        overflow: 'auto',
    },
    media: {
        maxWidth: 400,
        borderRadius: '25px',
    },
    primaryButton: {
        color: 'primary',
    },
    center: {
        display: 'block',
        width: '50%',
    }
});



class ViewASponsor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            sponsors: [],
            sponsorCapstones: [],
        }
    }
    async componentDidMount() {
        await strapi.axios.get(strapiURL + '/sponsors', {
            params: {
                _id: this.props.match.params.id
            }
        }).then(response => {
            this.setState({loading: false, sponsors: response.data});
        });
    }

    render() {
        const { classes } = this.props;

        if (!this.state.loading) {

            const sponsor = this.state.sponsors[0];

            return (
                <div className="ViewASponsor">
                    <Grid container justify={"center"}>
                        <Grid xs={10}>
                                <Grid container>
                                    <Grid xs={12}>
                                        <Card>
                                        <PageTitleTypography text={sponsor['name']}/>
                                        <Divider style={{marginTop: '2%'}}/>



                                        </Card>
                                    </Grid>
                                    <Card>
                                    <Grid container justify="center">
                                        <Grid xs={6}>

                                                <Typography color="primary" align="center" component="span">
                                                    <h1> Logo </h1>
                                                </Typography>
                                                <Divider style={{marginBottom: '2%'}}/>
                                                <Typography align={"center"} style={{marginBottom: '1%'}}>
                                                    <img src={strapiURL + sponsor['logo'].url } className={classes.sponsorImage} alt="Display"/>
                                                </Typography>
                                                <CardContent>
                                                    <Typography style={{marginTop: '1%'}}>
                                                        <b> Description: </b>{ " " + sponsor['description']}
                                                    </Typography>
                                                </CardContent>

                                                <Grid container justify='center'>
                                                    <Button className={classes.button} style={{marginTop: '2%'}} href={ sponsor['webUrl']}>
                                                        <Typography color="primary" variant="h6" component="span">
                                                            Visit {sponsor['name']} Website
                                                        </Typography>
                                                    </Button>
                                                </Grid>



                                    </Grid>


                                        <Grid xs={6}>

                                                <Typography color="primary" align="center" component="span">
                                                    <h1>{sponsor['name']} Advertisements </h1>
                                                </Typography>
                                            <Divider style={{marginBottom: '2%'}}/>
                                                <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} >
                                                    {sponsor['adverts'].map((result) => {

                                                        return(
                                                            <div>
                                                                <img height={500} width={300} alt="post" src={strapiURL + result.url}/>
                                                            </div>
                                                        );
                                                    })}
                                                </Carousel>

                                        </Grid>
                                    </Grid>
                                    </Card>

                                    <Grid xs={12}>
                                        <Card>
                                            <Divider style={{marginTop: '2%'}}/>
                                        <Typography align={"center"}>
                                            <h1> {sponsor['name'] + '\'s'} Sponsored Capstones </h1>
                                        </Typography>
                                            <CardContent>
                                                <Typography>
                                                    {"Currently involved in " + sponsor['capstones'].length + " capstones"}
                                                </Typography>
                                                        <Grid container spacing={8}>
                                                            {sponsor['capstones'].map((result) => (
                                                                <Grid item xs={12} md={6} style={{marginTop: '2%'}}>
                                                                    <Card className={classes.capstoneCard} style={{height: '200px', overflow: 'auto'}} >
                                                                        <CardContent>
                                                                            <SubHeadingTextTypography text={result["CapstoneName"]}/>
                                                                            <Divider/>
                                                                            <Typography variant="body2">
                                                                                {result["Description"]}
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Card>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>


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

export default (withStyles(styles)(withWidth()(ViewASponsor)));
