import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import compose from 'recompose/compose';
import LoadingCircle from '../Components/LoadingCircle';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import api from '../Services/api';
import routes from '../utils/Routing/routes';
import root from '../utils/styles.module.css';

const styles = theme => ({
  questions: {
    marginBottom: '5%',
    maxWidth: 800
  },
  subtitle: {
    padding: '1%',
  },
  content: {
    padding: 10,
    marginLeft: '4%',
    marginBottom: '2%',
  },
  link: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    '&:visited': {
      color: 'black'
    }
  }
});


class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      faqs: [],
      categories: [],
    };
  }

  async componentDidMount() {
    const allFaqs = await api.faqs.find();

    const categories = Array.from(new Set(allFaqs.map(faq => faq.category)));

    this.setState({loading: false, faqs: allFaqs, categories});
  }

  render() {
    const {classes} = this.props;
    const {loading, faqs, categories} = this.state;

    if (!loading) {
      return (
        <div align='center'>
          <Typography className={root.pageTitle} variant='h2'>Frequently Asked Questions</Typography>

          <Grid container className={classes.questions} spacing={2} direction='row' alignItems='flex-start'>
            {categories.map((category) => (
              <Grid key={`top${category.toString()}`} item xs={6}>
                <Typography variant='h5' align='left'>
                  {category}
                </Typography>
                {faqs.map((question, index) => (
                  <div key={`top${index}`}>
                    { category === question.category &&
                      <Grid item xs={12} style={{marginLeft: '4%'}}>

                        <Link className={classes.link} to={`${routes.faq.path}#question${index}`}>
                          <Typography align='left'>
                            {question.question}
                          </Typography>
                        </Link>
                      </Grid>}
                  </div>
                ))}
              </Grid>

            ))}
          </Grid>


          <Grid container alignItems='stretch'>

            {categories.map((category) => (
              <Paper key={category.toString()} className={root.largePaper}>
                <Grid item xs={12}>
                  <Typography variant='h4' align='center' className={classes.subtitle}>
                    {category}
                  </Typography>
                  {faqs.map((question, index) => (
                    <div key={index}>
                      { category === question.category &&
                        <Grid item xs={12} style={{marginLeft: '4%'}}>
                          <Typography variant='h5' id={`question${index}`} align='left'>
                            {question.question}
                          </Typography>
                          <MediaMarkdown className={classes.content} align='left'>
                            {question.answer}
                          </MediaMarkdown>
                        </Grid>}
                    </div>
                  ))}
                </Grid>
              </Paper>
            ))}
          </Grid>

        </div>
      );
    }

    return <LoadingCircle/>;
  }
}


export default compose(
  withStyles(styles),
)(FAQ);
