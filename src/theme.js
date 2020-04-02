import {createMuiTheme} from '@material-ui/core/styles';
import {
  colorActive,
  colorBackground,
  colorError, colorHover,
  colorSelected,
  schoolColorPrimary,
  schoolColorSecondary
} from './constants';

// The global theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: schoolColorPrimary,
    },
    secondary: {
      main: schoolColorSecondary,
    },
    error: {
      main: colorError,
    },
    background: {
      default: colorBackground,
    },
    action: {
      active: colorActive,
      hover: colorHover,
      selected: colorSelected
    }
  },
});

export default theme;
