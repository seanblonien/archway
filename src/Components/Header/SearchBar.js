import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, {Component} from 'react';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
import {formatQuery} from '../../utils/utils';

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

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  keyPress = e => {
    const searchTerm = formatQuery({search: e.target.value});

    if(e.keyCode === 13) {
      history.push(routes.search.genPath(searchTerm));
    }
  };

  render() {
    const {classes} = this.props;
    const {input} = this.state;

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

export default withStyles(styles) (SearchBar);
