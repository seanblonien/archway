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

export const routeShapePropTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  routes: PropTypes.arrayOf(PropTypes.string.isRequired)
};

const routePropTypes = PropTypes.shape(routeShapePropTypes);

export const routesPropTypes = {
  routes: PropTypes.objectOf(routePropTypes).isRequired,
};

export const parentRoutePropTypes = {
  parent: routePropTypes,
};
