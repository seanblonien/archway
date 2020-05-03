# Authentication and Authorization

Archway has users, and these users can be authenticated and preserved throughout page visits.


## Strapi Authentication

Strapi has a well defined [authentication API](https://strapi.io/documentation/3.0.0-alpha.x/guides/authentication.html) which allows for easy implementation and integration of authentication throughout an application. Installed by default, this API allowed for simple axios calls to be used to push and pull data to/from Strapi. Strapi handles the majority of the user creation/managing, and gives very simple endpoints for accessing/changing data about a user.

## JSON Web Tokens (JWTs)

A [JSON Web Token](https://jwt.io/) is an industry standard way of sharing secure data between two parties. This is utilized in Archway in order to login and authenticate oneself through Strapi. Strapi has a well documented way of [using and creating these JWTs.](https://strapi.io/documentation/3.0.0-alpha.x/guides/authentication.html#token-usage) A JWT has a lifetime where it is valid, and after that lifetime concludes, the JWT is no longer able to used to authenticate a user. JWTs are also invalid if the user changes their password or credentials or anything of that sort as well.

## Local Storage

Archway stores the JWT within the local storage of the user's browser. This means that once the user logs in once, they need not log in again until their token is invalid (due to time, password change, etc.) or they log out of their browser.


## Email Verification

Upon initial signup, the user is prompted that their account is not fully valid until their email has been verified. The email is sent out using the Strapi [email plugin.](https://strapi.io/documentation/3.0.0-alpha.x/guides/email.html) This allows for no duplicate accounts, nor spam signups that would allow for spam within Archway.

## Forgot Password?
A user is able to [submit a Forgot Password request](https://strapi.io/documentation/3.0.0-alpha.x/guides/authentication.html#forgotten-password), which will email a [Password Reset link](https://strapi.io/documentation/3.0.0-alpha.x/guides/authentication.html#password-reset) to the user, which will then allow the user to reset their password. This requires that the user has access to the initial signup email in order to reset their password.
