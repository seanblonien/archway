// Any prop-types structure that is duplicated in the app can be shared here
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

const routePropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired
});

export const routesPropTypes = {
  routes: PropTypes.arrayOf(routePropTypes).isRequired,
};

export const parentRoutePropTypes = {
  parent: routePropTypes,
};
