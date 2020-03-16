import React, {Component} from 'react';
import CardLayout from '../Components/CardLayout';
import {strapi} from '../constants';

class ViewAllDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: []
    };
  }

  async componentDidMount() {
    const departmentList = await strapi.getEntries('departments');
    this.setState({departments: departmentList});
  }

  render() {
    const {departments} = this.state;
    return <CardLayout title='All Departments' listItems={departments} childURL='/ViewADepartment/'/>;
  }
}

export default ViewAllDepartments;
