import {createMuiTheme} from '@material-ui/core';
import {ThemeProvider as MUIThemeProvider} from '@material-ui/core/styles';
import React, {useContext} from 'react';
import {childrenPropTypes} from '../utils/PropTypesConfig';
import {ThemeContext} from './ThemeProvider';

const ThemeManager = ({children}) =>{
  const context = useContext(ThemeContext);

  if(!context) return null;
  const {theme} = context;
  if(!theme) return null;

  return (
    <MUIThemeProvider
      theme={createMuiTheme(
        {
          university: theme.universityName,
          palette: {
            primary: {
              main: theme.primaryColor,
            },
            secondary: {
              main: theme.secondaryColor,
            },
            error: {
              main: theme.errorColor,
            },
            background: {
              default: theme.backgroundColor,
            },
            action: {
              active: theme.activeColor,
              hover: theme.hoverColor,
              selected: theme.selectedColor,
            }
          },
        }
      )}
    >
      {children}
    </MUIThemeProvider>
  );
};

ThemeManager.propTypes = childrenPropTypes;

export default ThemeManager;
