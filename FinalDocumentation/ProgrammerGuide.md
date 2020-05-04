# Programmer Guide

This is a comprehensive guide for all things related to programming on this project.

[[_TOC_]]

## Project Overview for a Programmer

The following sections briefly gives a high level overview of the project.

### Architecture

The project is split up into 3 logical components:

1. Front-end app (ReactJS)
1. Back-end API service (Strapi)
1. Back-end database (MongoDB)

Each of those services operate distinctly from each other and communicate over the network (whether that be local or remote).

### Docker

Each of these services runs in its own Docker container. This means each service can be changed and customized without directly affecting the others, although they all still communicate with each other.

The `docker-compose.yml` file contains the run configuration for the project, which includes names for the containers, images/builds to use, mounted volumes, environment variables, ports, restart conditions, dependency conditions, and network info. As seen in the [installation guide](Installation Guide), this is used to run *all* three Docker containers for each service. Each service's has a corresponding `Dockerfile` that has the build configuration for each image (which is the precursor to a container).

## Software Development Tools

We used the following tools to develop our project. There are many other tools and alternatives out there, but we just decided on these because we were most familiar with them and found success with them.

- [VSCode](https://code.visualstudio.com/) for IDE
- *[IDEA IntelliJ/Webstorm](https://www.jetbrains.com/) for IDE
- [Teams](https://teams.microsoft.com/) for communication with project stakeholders
- *[Slack](https://slack.com/) for team messaging and information sharing
- [Git](https://git-scm.com/) for our VCS with Gitlab
- *[GitKraken](https://www.gitkraken.com/) for GUI Git VCS system

\* denotes optional/additional tool we used

## Coding Standards

The following guide describes the coding standard used for this React project that uses [`create-react-app`'s](https://create-react-app.dev/docs/supported-browsers-features/#supported-language-features) ES6 standard.

### ESLint

[ESLint](https://eslint.org/) is used for our linter tool. A linter is a tool that analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs. ESLint enforces most of the project's coding standards and can fix most of them automatically.

To run the linter, in the console, type `npm run lint` to see the warnings and errors of the project, and run `npm run lint-fix` if you want the linter to fix things automatically for you.

VSCode supports [ESLint with an extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) that allows the editor to statically analyze linting issues *without* running anything from the command line.

### General Standards

The following sections are about general coding standards, not specific to any particular use case or need.

#### Variables

Variables are to be descriptive, `camelCase` names defined with either `let` or `const` in their scope.

<details>
<summary>✔ Correct variable usage</summary>

```jsx
const user,                // in context if there is only one user
      pluginsContentTypes, // descriptive, even if its 'long'
      validDepartments;    // descriptive
let viewCount,             // specific to what count it's referring to
    parseStatus;           // specific to what status it's referring to
```

</details><br/>

<details>
<summary>❌ Incorrect variable usage</summary>

```jsx
const value, // what value?
      arr,   // what array is this?
      url;   // what url?
let x,       // single letters are ambiguous
    count;   // what count is this for?
var temp;    // NO var (either let/const), what does temp mean?
```

</details><br/>

#### Functions

All functions should be [ES6 Arrow Functions](https://www.w3schools.com/js/js_arrow_function.asp) to be consistent and avoid any issues with binding `this` in components with state. The _only_ exception is for React life cycle methods such as `constructor()`, `componentDidMount()`, and `render()` in which normal function declaration is the standard.

<details>
<summary>✔ Correct class component method</summary>

```jsx
methodName = (params) => {
  // code
};
```

</details><br/>

<details>
<summary>❌ Incorrect class component method (unless React life cycle method)</summary>

```jsx
methodName(params) {
  // code
}
```

</details><br/>

<details>
<summary>✔ Functional component method or non-react functions</summary>

```jsx
const methodName = (params) => {
  // code
};
```

</details><br/>

#### Classes

All classes should be `PascalCase` and be named according to their purpose or function.

The following React Component class exemplifies how to create a stateful React component (can be created using `rccp` from [React snippets for VSCode](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets))

<details>
<summary>✔ Example of typical class layout</summary>

```jsx
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MyClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  render() {
    const {value} = this.state;
    const {someProp} = this.props;

    return (
        <React.Fragment someProp={someProp}>
          {value}
        </React.Fragment>
    );
  }
}

MyClass.propTypes = {
  someProp: PropTypes.string.isRequired
};

export default MyClass;
```

</details><br/>

#### Commenting

Every **function/method** should have a **descriptive comment** stating what it does as concisely and cleanly as possible. The only exceptions are functions like `constructor` and `render()`.

Anything that is difficult to understand within the code, that is not immediately obvious, or that does not read like English should be commented in all parts of code. All code should be written to be as _readable_ in the first place so that comments aren't necessary.

There is *no need* to comment changes/authors at the top of files because Git tracks all of our changes and you can use git blame (built into VSCode) to see who made what changes.

### Specific Standards

The following sections are specific coding standards that you may encounter in different places.

#### Destructuring

**Always** destructure `this.state` and `this.props` values at the top of the method they are used, especially methods like `render()`! It reads more cleanly, looks nicer, is easier to maintain, and makes it easy to see what state and props values are being used in a method.

<details>
<summary>✔ Correct destructuring of props and state</summary>

```jsx
...
render() {
  const {value} = this.state;
  const {someProp} = this.props;

  return (
    <React.Fragment someProp={someProp}>
      {value}
    </React.Fragment>
  );
}
```

</details><br/>

<details>
<summary>❌ Incorrect, non-destructuring of props and state</summary>

```jsx
...
render() {
  return (
    <React.Fragment someProp={this.props.someProp}>
      {this.state.value}
    </React.Fragment>
  );
}
```

</details><br/>

#### Array Iteration

Use modern array iteration syntax when traversing, modifying, filtering, or reducing values. Never use `for()` loops, as there is probably better solution.

Use `map()` to create a new array of values (good for extracting out a shared value from an array of objects, or a making a new set of objects from the array).

Use `filter()` to filter out values by some conditional test (good for finding elements).

Use `reduce()` when you want to reduce an array down to just one value (good for 'summary') operation.

<details>
<summary>Examples</summary>

```jsx
const users =  [
  {name: 'John', favoriteFood: '🍕'},
  {name: 'Jack', favoriteFood: '🍔'},
  {name: 'Jay', favoriteFood: '🍕'},
  {name: 'Jill', favoriteFood: '🍣'}
];

const allFoods = users.map(user => {
  return user.favoriteFood;
});

const usersWhoLikePizza = users.filter(user => {
  return user.favoriteFood === '🍕';
});

const numberWhoLikePizza = usersWhoLikePizza.reduce((accumulator, user) => {
  return accumulator + 1;
}, 0);

console.log(`All foods: ${allFoods}`);
// All foods: 🍕,🍔,🍕,🍣
console.log(`What users like pizza? ${JSON.stringify(usersWhoLikePizza)}`);
// What users like pizza? [{"name":"John","favoriteFood":"🍕"},{"name":"Jay","favoriteFood":"🍕"}]
console.log(`How many users like pizza? ${JSON.stringify(numberWhoLikePizza)}`);
// How many users like pizza? 2
```

</details><br/>

#### Loading Asynchronous Data

Load all asynchronous data in the `componentDidMount()` React life cycle method.

<details>
<summary>✔ Correct usage</summary>

```jsx
async componentDidMount() {
  const response = await axios.get('url');

  this.setState({stateKey: response.data.value})
}
```

</details><br/>

#### Dangers of setState()

Never access state after calling the `this.setState()` method because it is an asynchronous operation. Either create a copy of the value, re-use the value, batch the calling of `setState()` until the end of the method, or use pass an optional callback to the `setState()` method.

<details>
<summary>❌ Incorrect use of state</summary>

```jsx
handleChange = (event) => {
  const {stateKey} = this.state;
  const stateValue = event.target.value;

  this.setState({stateKey: stateValue});
  // ...other processing
  const theStateValue = this.state.stateKey; // theStateValue != stateValue here
};
```

</details><br/>

#### Routing

The whole point of a Single Page Application (SPA) is for the the page never to reload. We use [`ReactRouter`](https://reacttraining.com/react-router/) to handle the routing for us.

We use the `routes` object to help structure our static route configuration so that all of the routing names, paths, components, and subroutes are controlled in one central place (this contrasts to using string literals for path values). So whenever you refer to a path within the app, you will use the `routes` object (see example) for the path you want to link or redirect to.

<details>
<summary>✔ Using <code>routes</code> instead of string literals</summary>

```jsx
import {Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import routes from '../utils/Routing/routes';

// ...
<Link component={RouterLink} to={routes.capstones.path}>
  See Capstones
</Link>

```

You'll note that we import 2 `Link` components: the first one is our styled `Link` from Material-UI and the second one is renamed as `RouterLink` because it is being used for the Routing. You can use composition with the `component` prop to style *and* route with the same link.

</details><br/>

<details>
<summary>❌ Using string literals</summary>

```jsx
import {Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

// ...
<Link component={RouterLink} to={'/capstones'}>
  Capstones
</Link>

```

</details><br/>

<details>
<summary>This is the general structure of the <code>routes</code> object</summary>

- `routes.page.path` references the static path name for that page
- `routes.pageWithParam.genPath(param)` will generate the path to a page that uses URL parameters
  - i.e. `routes.viewprofile.genPath(user.username)` would return the path `'/user/aars'` after formatting the `'/user/:username'` path with URL parameter `username`
  - Why do we use `genPath` at all? It formats URL parameters for you and *only* exists on routes that use URL parameters. Routes, i.e. `'/home'`, will not have a `genPath` method and so you know to use `routes.home.path` instead.
- `routes.page.subpage.subroute.path` is how you access the subroutes of a particular page
- When using routes, *always* end in `.path` or `.genPath()` to specify you want the path values. The other properties are used when rendering the actual route.
- If you need to use a name for a page link, use the pages name property, i.e. `routes.home.name`.

</details><br/>

There are **two** ways of routing within our app.

##### 1. Link

If you want the user to navigate somewhere by clicking a button or link, use [`Link`](https://reacttraining.com/react-router/web/api/Link) from `react-router-dom` and [`Link`](https://material-ui.com/components/links/) from Material-UI for link text styling.

<details>
<summary>✔ Routing with Link</summary>

```jsx
import {Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import routes from '../utils/Routing/routes';

// ...

<Link component={RouterLink} to={routes.capstones.path}>
  <Button>See Capstones</Button>
</Link>
```

Put the path value in the `to` prop of the Material-UI `Link` component.

</details><br/>

##### 2. history

If you want to route the user programmatically, for example after successful form submission, then use `history`.

<details>
<summary>✔ Routing with history</summary>

```jsx
import history from '../utils/history';
import routes from '../utils/Routing/routes';

// ...

handleLoginSubmit = (event) => {
  // ...
  history.push(routes.dashboard.path);
};
```
Use the `history` array and push to it the desire destination route.

</details><br/>

#### PropTypes

[PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) are used to validate incoming properties for a React component. This allows us to require certain property values that we need to use in the component and performs some type safety which prevents bugs.

<details>
<summary>✔ PropTypes example</summary>

```jsx
import PropTypes from 'prop-types';

class NameButton extends React.Component {
  render() {
    const {handlerMethod, question, name} = this.props;

    return (
      <Button onClick={handlerMethod}>
        Hello, {name}! {question}
      </Button>
    );
  }
}

NameButton.propTypes = {
  name: PropTypes.string.required,
  handlerMethod: PropTypes.func.required,
  question: PropTypes.string
};

NameButton.defaultProps = {
  question: 'How are you today?'
};
```

</details><br/>

#### Permissions

We are using [Role-Based Access Control](https://auth0.com/docs/authorization/concepts/rbac) or RBAC to manage roles and permissions within our Project. The basic concept is that roles are associated with certain permissions. Roles can, and often do, overlap permissions. When a privileged action is needed, the role is checked to see if it has the associated permission for the given action. For every one basic action, there is a permission for it.

Practically speaking in our project, the conditional logic for access control is *role anonymous*, and is just concerned with permissions. We never directly use a user's role. We *indirectly* use their role to see if they have a permission.

Our RBAC system is **preventative** in nature. You must first check permissions before rendering a component that may require certain permissions. Why? The goal is to *prevent runtime errors* from ever happening in the first place by doing the permission analysis statically before runtime.

Say we have a component that can delete users. We don't want the public user to just start deleting users (even if protected by our backend). So, we can have permissions called `deleteuser` that can be associated with the role `Admin`. The public user will have role `Public` by default. The site will know *which role is active* from our login and authentication system. The authenticated admin will be known to be of role `Admin`, and therefore can access and use the `deleteuser` permission. The public user will not be able to access the `deleteuser` permission because the role does not allow it. See the example below.

<details>
<summary>✔ Access Control Using Permissions with Can Component</summary>

```jsx
import {permissions} from './constants';
import React from 'react';
import {DeleteUsers} from './Components/DeleteUsers';
import Can from './Components/Can';

class Dashboard extends React.Component {
  // other life cycle methods

  render() {
    return (
      <div>
        ...rest of component render
        <Can perform={permissions.users_permissions.user.destroy}
             no={() => <p>Unauthorized!</p>}
        >
            <DeleteUsers/>
        </Can>
      </div>
    );
  }
}
```

In this example, we set the permission we want to perform in the `perform` prop (required). Under the hood, the `Can` component has access to the authentication state and knows the role of the user (`role` can optionally be a prop of `Can` as well). If the user's role has that permission, it renders the children (whats inside the `Can` component). If the user's role does not have that permission, the `no()` property method is called to render what the user should see if not allowed (by default it is nothing, the `no` prop is optional).

</details><br/>

To check multiple permissions, use an array of permissions.

<details>
<summary>✔ Access Control Using Multiple Permissions with Can Component</summary>

```jsx
import {permissions} from './constants';
import React from 'react';
import DeleteUsers from './Components/DeleteUsers';
import CreateUsers from './Components/DeleteUsers';
import Can from './Components/Can';

class Dashboard extends React.Component {
  // other life cycle methods

  render() {
    return (
      <div>
        ...rest of component render
        <Can perform={[permissions.users_permissions.user.create, permissions.users_permissions.user.destroy]}
             no={() => <p>Unauthorized!</p>}
        >
            <DeleteUsers/>
            <CreateUsers/>
        </Can>
      </div>
    );
  }
}
```

</details><br/>

NOTE: Because we use static type analysis for permissions, if permissions are added/removed (different than changed), we ***must*** update the static permissions by either exporting or importing the database. Do this by the general import/export scripts `npm run <import|export>` or by running the database scripts individually.

#### Accessing the Authenticated User

The user and everything authenticated related is provided by the `AuthContext`. This interface provides you with the user object, a check to see if the user is authenticated, and other methods for authentication tasks.

To use the user object in a React class component, you use the context value of a class.

NOTE: If the user is not logged in, the `user` object would be ***null***! Use `isAuthenticated` before using the `user` value.

<details>
<summary>✔ User in Class Component</summary>

```jsx
import React from 'react';
import AuthContext from '../Contexts/AuthContext';
import api from '../Services/API';

class DisplayUser extends React.Component {
  ...

  handleSomething = () => {
    const {user} = this.context;
    const response = await api.sections.find({student: user.id});
    ...
  };

  render() {
    const {user} = this.context;

    // WARNING - user is null if the user is not logged in, so be careful and use isAuthenticated or null check the user
    return (
      <div>
        <p>ID: {user.ID}</p>
        <p>Name: {user.name}</p>
        <p>Role: {user.role.name}</p>
        <p>Capstones: {user.capstones}</p>
      </div>
    );
  }
}

DisplayUser.contextType = AuthContext;

export default DisplayUser;
```
The most important lines to remember and understand are these:

- `import AuthContext from '../Contexts/AuthContext';`
  - Imports the AuthContext into scope
- `const {user} = this.context;`
  - Destructures the user object from the context.
- `DisplayUser.contextType = AuthContext;';`
  - Sets the class' this.context value to AuthContext that we imported

</details><br/>

To see if a user is currently authenticated, use the `isAuthenticated` method.

<details>

<summary>✔ isAuthenticated in Class Component</summary>

```jsx
import React from 'react';
import AuthContext from '../Contexts/AuthContext';

class LoginLogout extends React.Component {
  render() {
    const {isAuthenticated} = this.context;

    return (
      <div>
        {
          isAuthenticated
          ? <button>Logout</button>
          : <button>Login</button>
        }
      </div>
    );
  }
}

LoginLogout.contextType = AuthContext;

export default LoginLogout;
```

</details><br/>

For functional components, you can use the context as a hook and access the variables in a similar way.

<details>
<summary>✔ User/isAuthenticated in Functional Component</summary>

```jsx
import React from 'react';
import AuthContext from '../Contexts/AuthContext';

const DisplayLogin = () => {
    const {user, isAuthenticated} = useContext(AuthContext);

    return (
      isAuthenticated
          ? <div>
              Currently logged in: {user.name}
            </div>
          : <div>
              <p>Please login first</p>
              <button>Login</button>
            </div>
    );
};

export default DisplayLogin;
```

</details><br/>

#### Snacks/Notifications/Popups/Toasts/Alerts

We use a library called `notistack` for our Material UI notification system. The library calls the notification system a '*snackbar*' with snacks which is the same thing as notification, pop-up, toast, or alert .

The system is meant to be used to alert the user of error, success, warning, and info event messages. There are the pretty version of a error message when things go wrong, and they let the user know when things were updated. This is **extremely** important because our SPA never reloads and it's sometimes hard to tell when something has happened because the page barely changes.

Class components use the `withSnackbar()` HOC to provide the `enqueueSnackbar()` method in its props.

<details>
<summary>✔ Class component with success/error messages</summary>

```jsx
import React from 'react';
import api from '../Services/api';
import routes from '../utils/Routing/routes';
import AuthContext from '../Contexts/AuthContext';
import {snack} from '../utils/Snackbar';
import {withSnackbar} from 'notistack';

class Login extends Component {

    // ...
    handleLogin = (e) => {
      const {identifier, password, remember} = state;
      const {enqueueSnackbar} = this.props;

      try {
        const response = await api.login(identifier, password);
        this.handleAuthenticationResponse(response, remember, routes.home.path);
        enqueueSnackbar('Login successful', snack.success);
      } catch(error) {
        enqueueSnackbar('Error logging in', snack.error);
      }
    };

    render() {
      const {user, isAuthenticated} = this.context;
      return (
        isAuthenticated
            ? <div>
                Currently logged in: {user.name}
              </div>
            : <div>
                <p>Please login first</p>
                //Login form
                <button onCLick={this.handleLogin}>Login</button>
              </div>
      );
    }
};

Login.contextType = AuthContext;

export default withSnackbar(Login);
```

The most important lines to remember and understand are these:

- `import {withSnackbar} from 'notistack';`
  - Imports the HOC to provide us with the `enqueueSnackbar()` method
- `import {snack} from '../utils/Snackbar';`
  - Imports the `snack`  object that gives us the types of messages to send
- `const {enqueueSnackbar} = this.props;`
  - Destructures the `enqueueSnackbar()` method from the snackbar provider
- `enqueueSnackbar('Login successful', snack.success);`
  - Sends a green success message after the user logs in
- `enqueueSnackbar('Error logging in', snack.error);`
  - Sends a red error message after login fails
- `export default withSnackbar(Login);`
  - Provides the snackbar methods to the Login component that allows for accessing the `enqueueSnackbar()` method

</details><br/>

Similarly, functional components use the `useSnackbar()` hook to provide the `enqueueSnackbar()` method, but use is still the same.

<details>
<summary>✔ Functional component with error message</summary>

```jsx
import React from 'react';
import api from '../Services/api';
import {useSnackbar} from 'notistack';
import {snack} from '../utils/Snackbar';

const FunctionalComponent = (props) => {
  const {enqueueSnackbar} = useSnackbar();
  // ... initialize state values

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // upload form
    } catch(e) {
      enqueueSnackbar('Error uploading form', snack.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      // Form stuff
    </form>
  );
};

export default FunctionalComponent;
```

</details><br/>
