import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import LoadingCircle from '../Components/LoadingCircle';
import api from '../Services/api';
import MediaMarkdown from '../Components/MediaMarkdown';
import DepartmentForm from "../Components/DepartmentForm";
import {permissions} from "../constants";
import Can from "../Components/Can";

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

          <Can perform={permissions.application.departments.update}>
            <DepartmentForm title='Edit Department' department={department} type='edit'/>
          </Can>
          <Can perform={permissions.application.departments.create}>
            <DepartmentForm title='Create Department' type='create'/>
          </Can>

          <Typography>
            {`Currently involved in ${department.capstones.length} capstones`}
          </Typography>

          <Typography>
            <MediaMarkdown>{department.description}</MediaMarkdown>
          </Typography>


          <Typography align='center'>
            <h1> All Capstones by {department.name}</h1>
          </Typography>

          <Button
            component={Link}
            to={`/ViewCapstone/${department.capstones.id}`}
          >
            <Typography>
              <h1>{department.capstones.title}</h1>
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
