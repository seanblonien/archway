import {AccountCircle, Create, Description, Publish, ViewList, ViewQuilt} from '@material-ui/icons';
import ImportUsers from '../../Components/Admin/ImportUsers';
import ForgotPassword from '../../Components/Auth/ForgotPassword';
import Login from '../../Components/Auth/Login';
import ResetPassword from '../../Components/Auth/ResetPassword';
import SignUp from '../../Components/Auth/SignUp';
import ValidateEmail from '../../Components/Auth/ValidateEmail';
import ReviewProposals from '../../Components/Proposals/ReviewProposals';
import ViewYourProposals from '../../Components/Proposals/ViewYourProposals';
import {permissions} from '../../constants';
import About from '../../Pages/About';
import AuthPage from '../../Pages/AuthPage';
import Capstone from '../../Pages/Capstones';
import CreateCapstone from '../../Pages/CreateCapstone';
import Dashboard from '../../Pages/Dashboard';
import FAQ from '../../Pages/FAQ';
import Home from '../../Pages/Home';
import NotFound from '../../Pages/NotFound';
import SearchResults from '../../Pages/SearchResults';
import Sponsors from '../../Pages/Sponsors';
import ViewADepartment from '../../Pages/ViewADepartment';
import ViewAllDepartments from '../../Pages/ViewAllDepartments';
import ViewASponsor from '../../Pages/ViewASponsor';
import ViewCapstone from '../../Pages/ViewCapstone';
import ViewProfile from '../../Pages/ViewProfile';
import ViewSponsors from '../../Pages/ViewSponsors';
import ViewYourCapstones from '../../Pages/ViewYourCapstones';

const routes = {
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    protected: true,
    routeNames: ['viewyourcapstones','viewprofile','createcapstone','reviewproposals', 'viewyourproposals', 'importusers'],
    viewyourcapstones: {
      name: 'Your Capstones',
      path: '/dashboard/capstones/:username',
      genPath: (username ) => `/dashboard/capstones/${username}`,
      component: ViewYourCapstones,
      Icon: ViewQuilt,
      permission: permissions.application.capstones.find,
    },
    viewprofile: {
      name: 'Profile',
      path: '/dashboard/profile/:username',
      genPath: (username ) => `/dashboard/profile/${username}`,
      component: ViewProfile,
      Icon: AccountCircle,
      permission: permissions.users_permissions.user.me,
    },
    createcapstone: {
      name: 'Create Capstone',
      path: '/dashboard/create-capstones',
      component: CreateCapstone,
      Icon: Create,
      permission: permissions.application.capstones.create,
    },
    reviewproposals: {
      name: 'Review Proposals',
      path: '/dashboard/review-proposals',
      component: ReviewProposals,
      Icon: ViewList,
      permission: permissions.application.proposal_approval.find,
    },
    viewyourproposals: {
      name: 'Your Proposals',
      path: '/dashboard/view-your-proposals',
      component: ViewYourProposals,
      Icon: Description,
      permission: permissions.application.proposals.create,
    },
    importusers: {
      name: 'Import Users',
      path: '/dashboard/import-users',
      component: ImportUsers,
      Icon: Publish,
      permission: permissions.users_permissions.user.create,
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
    path: '/search/:searchTerm?',
    genPath: (searchterm) => `/search/${searchterm}`,
    component: SearchResults
  },
  capstones: {
    name: 'Capstones',
    path: '/capstones',
    component: Capstone
  },
  about: {
    name: 'About',
    path: '/about',
    component: About
  },
  viewcapstone: {
    name: 'View Capstone',
    path: '/capstone/:capstoneID',
    genPath: (capstoneID ) => `/capstone/${capstoneID}`,
    component: ViewCapstone
  },
  viewprofile: {
    name: 'View Profile',
    path: '/profile/:username',
    genPath: (username ) => `/profile/${username}`,
    component: ViewProfile
  },
  sponsors: {
    name: 'About Sponsors',
    path: '/about-sponsors',
    component: Sponsors
  },
  viewsponsors: {
    name: 'View Sponsors',
    path: '/sponsors',
    component: ViewSponsors
  },
  viewsponsor: {
    name: 'View Sponsor',
    path: '/sponsor/:id',
    genPath: (id) => `/sponsor/${id}`,
    component: ViewASponsor
  },
  viewdepartments: {
    name: 'View Departments',
    path: '/departments',
    component: ViewAllDepartments
  },
  viewdepartment: {
    name: 'View Department',
    path: '/department/:id',
    genPath: (id) => `/department/${id}`,
    component: ViewADepartment
  },
  faq: {
    name: 'FAQ',
    path: '/faq',
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
