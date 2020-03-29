import React, {Component} from 'react';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import LoadingCircle from './LoadingCircle';
import api from '../Services/api';

class ThemeManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      customTheme: [],
    };
  }

  async componentDidMount() {
    const customTheme = await api.theme.find();
    this.setState({loading: false, customTheme});
  }

  render() {
    const {children} = this.props;
    const {loading, customTheme} = this.state;

    return loading ?
      <LoadingCircle/> :
      <ThemeProvider
        theme={createMuiTheme(
          {
            palette: {
              primary: {
                main: `${customTheme.primary}`,
              },
              secondary: {
                main: `${customTheme.secondary}`,
              },
              error: {
                main: red.A400,
              },
              background: {
                default: '#fcfcfc',
              },
            },
          }
        )}
      >
        <div>
          {children}
        </div>
      </ThemeProvider>;
  }

}

ThemeManager.propTypes = {
  children: PropTypes.node.isRequired
};

export default ThemeManager;