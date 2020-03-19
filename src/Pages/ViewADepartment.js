import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import Markdown from 'markdown-to-jsx';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import api from '../Services/api';
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
    const departments = await api.departments.find();
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
            to={`/ViewCapstone/${department.capstones.id}`}
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
