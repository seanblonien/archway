import PropTypes from 'prop-types';

export const locationPropTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
  })
};

export const locationDefaultProps = {
  location: {pathname: '/', search: '', hash: ''}
};
