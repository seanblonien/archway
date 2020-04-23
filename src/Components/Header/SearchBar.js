import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
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
  },
  menu: {
    width: 200,
  },
  input: {
    color: 'white',
  },
  pointer:{
    color: 'white',
    cursor: 'pointer'
  }
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  handleChange = event => {
    this.setState({input: event.target.value});
  };

  search = event => {
    const {input} = this.state;
    if(input.length > 0) {
      const searchTerm = formatQuery({search: input});
      history.push(routes.search.genPath(searchTerm));
    }
    event.preventDefault();
  };

  clearSearch = () => {
    this.setState({input: ''});
  }

  render() {
    const {classes} = this.props;
    const {input} = this.state;

    return (
      <form className={classes.container} noValidate autoComplete='off' onSubmit={this.search}>
        <TextField
          placeholder='Search...'
          className={classes.textField}
          value={input}
          onChange={this.handleChange}
          margin='none'
          InputProps={{
            className: (classes.input),
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon className={classes.pointer} onClick={this.search}/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                {input.length > 0 &&
                  <ClearIcon className={classes.pointer} onClick={this.clearSearch}/>
                }
              </InputAdornment>
            )
          }}
        />
      </form>
    );
  }
}

export default withStyles(styles) (SearchBar);
