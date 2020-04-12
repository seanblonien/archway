import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    width: 250,
    placeholder: 'Search...'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  input: {
    color: 'white',
  }
});

class TextFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      redirect: false,
      redirectPath: '/SearchRedirect/'
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  keyPress = e => {
    const {redirectPath} = this.state;
    if(e.keyCode === 13) {
      let newPath = redirectPath;

      if (window.location.pathname.includes('ViewSponsors')) {
        newPath += `ViewSponsors/${e.target.value}`;
      }
      else {
        newPath += `Capstones/${e.target.value}`;
      }

      this.setState(() => ({
        redirect: true,
        redirectPath: newPath,
      }));
    }
  };

  render() {
    const {classes} = this.props;
    const {redirect, redirectPath, input} = this.state;

    if (redirect === true) {
      this.setState({redirect: false});
      return <Redirect to={redirectPath}/>;
    }

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          id='standard-name'
          placeholder='Search...'
          className={classes.textField}
          value={input}
          onChange={this.handleChange('input')}
          margin='normal'
          onKeyDown={this.keyPress}
          InputProps={{
            className: classes.input
          }}
        />
      </form>
    );
  }
}

export default withRouter(withStyles(styles)(TextFields));
