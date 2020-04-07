import About from '../Components/About';
import ImportUsers from '../Components/ImportUsers';
import Login from '../Components/Login';
import RegisterModal from '../Components/RegisterModal';
import SearchRedirect from '../Components/SearchRedirect';
import Capstone from '../Pages/Capstones';
import CreateCapstone from '../Pages/CreateCapstone';
import Dashboard from '../Pages/Dashboard';
import FAQ from '../Pages/FAQ';
import Home from '../Pages/Home';
import LoginPage from '../Pages/LoginPage';
import NotFound from '../Pages/NotFound';
import Sponsors from '../Pages/Sponsors';
import ViewADepartment from '../Pages/ViewADepartment';
import ViewAllDepartments from '../Pages/ViewAllDepartments';
import ViewASponsor from '../Pages/ViewASponsor';
import ViewCapstone from '../Pages/ViewCapstone';
import ViewProfile from '../Pages/ViewProfile';
import ViewSponsors from '../Pages/ViewSponsors';
import ViewYourCapstones from '../Pages/ViewYourCapstones';

const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    protected: true,
    routes: [
      {
        name: 'View Your Capstones',
        path: '/dashboard/view-your-capstones',
        component: ViewYourCapstones
      },
      {
        name: 'Create Capstone',
        path: '/dashboard/create-capstones',
        component: CreateCapstone
      },
      {
        name: 'Import Users',
        path: '/dashboard/import-users',
        component: ImportUsers
      },
    ]
  },
  {
    name: 'auth',
    path: '/auth',
    component: LoginPage,
    routes: [
      {
        name: 'Login',
        path: '/auth/login',
        component: Login
      },
      {
        name: 'Register',
        path: '/auth/register',
        component: RegisterModal
      },
    ]
  },
  {
    name: 'Search Redirect',
    path: '/SearchRedirect/:path/:searchTerm?',
    component: SearchRedirect
  },
  {
    name: 'Capstones',
    path: '/Capstones/:searchTerm?',
    component: Capstone
  },
  {
    name: 'About',
    path: '/about',
    component: About
  },
  {
    name: 'View Capstone',
    path: '/ViewCapstone/:capstoneID',
    component: ViewCapstone
  },
  {
    name: 'View Profile',
    path: '/ViewProfile/:username',
    component: ViewProfile
  },
  {
    name: 'Sponsors',
    path: '/sponsors',
    component: Sponsors
  },
  {
    name: 'View Sponsors',
    path: '/ViewSponsors/:searchTerm?',
    component: ViewSponsors
  },
  {
    name: 'View Sponsor',
    path: '/ViewASponsor/:id',
    component: ViewASponsor
  },
  {
    name: 'View Departments',
    path: '/ViewAllDepartments',
    component: ViewAllDepartments
  },
  {
    name: 'View Department',
    path: '/ViewADepartment/:id',
    component: ViewADepartment
  },
  {
    name: 'FAQ',
    path: '/FAQ',
    component: FAQ
  },
  {
    name: 'Home',
    path: '/',
    component: Home,
    exact: true
  },
  {
    name: 'Not Found',
    path: '*',
    component: NotFound
  },
];

export default routes;
