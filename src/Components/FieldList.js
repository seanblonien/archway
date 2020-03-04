import {Box, List, ListItemText, Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class FieldList extends Component {
    render() {
        const {fields, label} = this.props;

        return (
            <Box>
                <Typography label={label}>{label}</Typography>
                <List dense={true}>
                    {fields && fields.map(field =>
                        <ListItem key={field}>
                            <ListItemText>{field}</ListItemText>
                        </ListItem>
                    )}
                </List>
            </Box>
        );
    }
}

FieldList.propTypes = {
    fields: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
};

export default FieldList;
