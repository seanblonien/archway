import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {strapiURL} from "../constants";

class Cards extends Component {

    getImageUrl(item) {
        if(item != null) {
            return strapiURL + item.url;
        } else {
            return false;
        }
    }

    getFirstNWords(str, n) {
        var str1 = str.split(" ");
        if (str1.length <= n) {
            return str;
        }
        else {
            str = str1.splice(0,n).join(" ") + "...";
            return str;
        }
    }

    render() {
        return this.props.listitems.map((item, i) => {
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
                    <Card style={{height: 425,}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Department Picture"
                                height="300"
                                image={ this.getImageUrl(this.props.listitems[i]['Image']) || require('../Images/arch.svg')}
                                title="Department Picture"
                            />
                            <CardContent>
                                <Typography variant="h5">
                                    {item.name}
                                </Typography>
                                <Typography variant="body1">
                                    {this.getFirstNWords(item.Preview, 20) }
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
        })
    }
}


// const cards = (props) => {
//     return props.listitems.map((item, i) => {
//         return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
//                 <Card >
//                     <CardActionArea>
//                         <CardMedia
//                             component="img"
//                             alt="Department Picture"
//                             height="300"
//                             image={ strapiURL + props.listitems[i]['Image'].url}
//                             title="Department Picture"
//                         />
//                         <CardContent>
//                             <Typography variant="h5">
//                                 {item.name}
//                             </Typography>
//                             <Typography variant="body1">
//                                 {item.Preview}
//                             </Typography>
//                         </CardContent>
//                     </CardActionArea>
//                 </Card>
//             </Grid>
//         );
//     })
// }

export default Cards;