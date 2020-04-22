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

  handleChange = event => {
    this.setState({input: event.target.value});
  };

  search = () => {
    const {input} = this.state;
    if(input.length > 0) {
      const searchTerm = formatQuery({search: input});
      history.push(routes.search.genPath(searchTerm));
    }
  };

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
          margin='normal'
          InputProps={{className: classes.input}}
          type='search'
        />
      </form>
    );
  }
}

export default withStyles(styles) (SearchBar);
