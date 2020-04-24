import React, {Component} from 'react';
import {ThemeProvider as MUIThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoadingCircle from '../Components/LoadingCircle';
import api from '../Services/api';

class ThemeProvider extends Component {
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
      <MUIThemeProvider
        theme={createMuiTheme(
          {
            university: customTheme.universityName,
            palette: {
              primary: {
                main: customTheme.primaryColor,
              },
              secondary: {
                main: customTheme.secondaryColor,
              },
              error: {
                main: customTheme.errorColor,
              },
              background: {
                default: customTheme.backgroundColor,
              },
              action: {
                active: customTheme.activeColor,
                hover: customTheme.hoverColor,
                selected: customTheme.selectedColor,
              }
            },
          }
        )}
      >
        <div>
          {children}
        </div>
      </MUIThemeProvider>;
  }

}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ThemeProvider;
