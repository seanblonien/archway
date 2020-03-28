import React, {Component} from 'react';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import CardLayout from '../Components/CardLayout';

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

    let departmentNames = [];
    departments.map()
  }

  render() {
    const {departments} = this.state;
    return <CardLayout title='All Departments' listItems={departments} childURL='/ViewADepartment/' imageURLFunction={imageURL.department}/>;
  }
}

export default ViewAllDepartments;
