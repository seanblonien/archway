import React, {Component} from 'react';
import Can from '../Components/Can';
import DepartmentForm from '../Components/Department/DepartmentForm';
import CardLayout from '../Components/LayoutWrappers/CardLayout';
import {permissions} from '../constants';
import api from '../Services/api';
import routes from '../utils/Routing/routes';
import root from '../utils/styles.module.css';
import {imageURL} from '../utils/utils';

class ViewAllDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: []
    };
  }

  async componentDidMount() {
    const departments = await api.departments.find();
    this.setState({departments});
  }

  updateDepartments = async () => {
    const departments = await api.departments.find();
    this.setState({departments});
  };

  render() {
    const {departments} = this.state;

    return (
      <div>
        <div className={root.gridListContainer}>
          <Can perform={permissions.application.departments.create}>
            <DepartmentForm
              title='Create Department'
              type='create'
              department={null}
              update={this.updateDepartments}
            />
          </Can>
        </div>
        <CardLayout
          title='All Departments'
          listItems={departments}
          childURL={routes.viewdepartment.genPath}
          imageURLFunction={imageURL.department}
        />
      </div>
    );
  }
}

export default ViewAllDepartments;
