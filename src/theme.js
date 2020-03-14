import {red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';
import {schoolColorPrimary, schoolColorSecondary} from "./constants";

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
      main: red.A400,
    },
    background: {
      default: '#fcfcfc',
    },
  },
});

export default theme;
