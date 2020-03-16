import {Link} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import Markdown from 'markdown-to-jsx';
import {withStyles} from '@material-ui/core/styles';
import {strapi} from '../constants';
import LoadingCircle from '../Components/LoadingCircle';

const styles = {
  card: {
    raised: true,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 100,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};

class ViewADepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      departments: []
    };
  }

  async componentDidMount() {
    const departments = await strapi.getEntries('Departments');
    this.setState({loading: false, departments});
  }

  render() {
    const {loading, departments} = this.state;
    const {match} = this.props;

    if (!loading) {
      const department = departments.find(d => d.id === match.params.id);

      return (
        <Box className='ViewASponsor' mx={5}>

          <Typography align='center'>
            <h1>{department.name}</h1>
          </Typography>

          <Typography>
            {`Currently involved in ${department.capstones.length} capstones`}
          </Typography>

          <Typography>
            <Markdown>{department.description}</Markdown>
          </Typography>


          <Typography align='center'>
            <h1> All Capstones by {department.name}</h1>
          </Typography>

          <Button
            component={Link}
            to={`/ViewCapstone/${department.capstones.CapstoneName}`}
          >
            <Typography>
              <h1>{department.capstones.CapstoneName}</h1>
            </Typography>
          </Button>

        </Box>
      );
    }

    return <LoadingCircle/>;

  }
}
export default compose(
  withStyles(styles),
  withWidth(),
)(ViewADepartment);
