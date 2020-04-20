import About from '../../Components/About';
import ImportUsers from '../../Components/Admin/ImportUsers';
import Login from '../../Components/Auth/Login';
import Capstone from '../../Pages/Capstones';
import CreateCapstone from '../../Pages/CreateCapstone';
import Dashboard from '../../Pages/Dashboard';
import FAQ from '../../Pages/FAQ';
import Home from '../../Pages/Home';
import AuthPage from '../../Pages/AuthPage';
import NotFound from '../../Pages/NotFound';
import Sponsors from '../../Pages/Sponsors';
import ViewADepartment from '../../Pages/ViewADepartment';
import ViewAllDepartments from '../../Pages/ViewAllDepartments';
import ViewASponsor from '../../Pages/ViewASponsor';
import ViewCapstone from '../../Pages/ViewCapstone';
import ViewProfile from '../../Pages/ViewProfile';
import ViewSponsors from '../../Pages/ViewSponsors';
import SearchResults from '../../Pages/SearchResults';
import SignUp from '../../Components/Auth/SignUp';
import ForgotPassword from '../../Components/Auth/ForgotPassword';
import ResetPassword from '../../Components/Auth/ResetPassword';
import ValidateEmail from '../../Components/Auth/ValidateEmail';


const routes = {
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    protected: true,
    routeNames: ['viewprofile','createcapstone','importusers'],
    viewprofile: {
      name: 'View Profile',
      path: '/dashboard/viewprofile/:username',
      genPath: (username ) => `/dashboard/viewprofile/${username}`,
      component: ViewProfile
    },
    createcapstone: {
      name: 'Create Capstone',
      path: '/dashboard/create-capstones',
      component: CreateCapstone
    },
    importusers: {
      name: 'Import Users',
      path: '/dashboard/import-users',
      component: ImportUsers
    },
  },
  auth: {
    name: 'auth',
    path: '/auth',
    component: AuthPage,
    routeNames: ['login', 'signup', 'forgotpassword', 'resetpassword', 'validateemail'],
    login: {
      name: 'Login',
      path: '/auth/login',
      component: Login
    },
    signup: {
      name: 'Sign Up',
      path: '/auth/signup',
      component: SignUp
    },
    forgotpassword: {
      name: 'Forgot Password',
      path: '/auth/forgot-password',
      component: ForgotPassword
    },
    resetpassword: {
      name: 'Reset Password',
      path: '/auth/reset-password',
      component: ResetPassword
    },
    validateemail: {
      name: 'Validate Email',
      path: '/auth/validate-email',
      component: ValidateEmail
    },
  },
  search: {
    name: 'Search',
    path: '/SearchResults/:searchTerm?',
    genPath: (searchterm) => `/SearchResults/${searchterm}`,
    component: SearchResults
  },
  capstones: {
    name: 'Capstones',
    path: '/Capstones/:searchTerm?',
    genPath: (searchterm = '') => `/Capstones/${searchterm}`,
    component: Capstone
  },
  about: {
    name: 'About',
    path: '/about',
    component: About
  },
  viewcapstone: {
    name: 'View Capstone',
    path: '/ViewCapstone/:capstoneID',
    genPath: (capstoneID ) => `/ViewCapstone/${capstoneID}`,
    component: ViewCapstone
  },
  viewprofile: {
    name: 'View Profile',
    path: '/viewprofile/:username',
    genPath: (username ) => `/viewprofile/${username}`,
    component: ViewProfile
  },
  sponsors: {
    name: 'Sponsors',
    path: '/sponsors',
    component: Sponsors
  },
  viewsponsors: {
    name: 'View Sponsors',
    path: '/ViewSponsors/:searchTerm?',
    genPath: (searchTerm = '') => `/ViewSponsors/${searchTerm}`,
    component: ViewSponsors
  },
  viewsponsor: {
    name: 'View Sponsor',
    path: '/ViewASponsor/:id',
    genPath: (id) => `/ViewASponsor/${id}`,
    component: ViewASponsor
  },
  viewdepartments: {
    name: 'View Departments',
    path: '/ViewAllDepartments',
    component: ViewAllDepartments
  },
  viewdepartment: {
    name: 'View Department',
    path: '/ViewADepartment/:id',
    genPath: (id) => `/ViewADepartment/${id}`,
    component: ViewADepartment
  },
  faq: {
    name: 'FAQ',
    path: '/FAQ',
    component: FAQ
  },
  home: {
    name: 'Home',
    path: '/',
    component: Home,
    exact: true
  },
  notfound: {
    name: 'Not Found',
    path: '*',
    component: NotFound
  },
};

export default routes;
