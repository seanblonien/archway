import React, {Component} from 'react';
import LoadingCircle from '../Components/LoadingCircle';
import api from '../Services/api';
import {childrenPropTypes} from '../utils/PropTypesConfig';

export const ThemeContext = React.createContext(null);

class ThemeProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      theme: null,
      loading: true
    };
  }

  async componentDidMount() {
    const theme = await api.theme.find();
    this.setState({loading: false, theme});
  }

  setTheme = (theme) => {
    this.setState({theme});
  }

  render () {
    const {children} = this.props;
    const {theme, loading} = this.state;
    const {setTheme} = this;

    if(loading) return <LoadingCircle/>;

    return (
      <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = childrenPropTypes;

export default ThemeProvider;
