import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import AddPage from './containers/AddPage.jsx';
import EditPage from './containers/EditPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import PayPage from './containers/PayPage.jsx';
import ActivatePage from './containers/ActivatePage.jsx';
import ResultPage from './containers/ResultPage.jsx';
import ResultsPage from './containers/ResultsPage.jsx';
import Auth from './modules/Auth';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/activate/:user',
      component: ActivatePage
    },

    {
      path: '/contact',
      component: ContactPage
    },

    {
      path: '/add',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, AddPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/pay',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, PayPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/results',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, ResultsPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/edit/:id',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, EditPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/result/:id',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, ResultPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    },

    {
      path: '*',
      onEnter: (nextState, replace) => {
        replace('/');
      }
    }
  ]
};

export default routes;
