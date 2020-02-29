import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Cards from './Cards';

const cardLayout = (props) => {
    return (
        <div style={{ padding: 50 }}>
            <Typography align="center" variant="h2" gutterBottom>
                {props.title}
            </Typography>
            <br/>
            <Grid container direction="row" spacing={4} >
                <Cards listitems={props.listitems}/>
            </Grid>
        </div>
    )
}

export default cardLayout;