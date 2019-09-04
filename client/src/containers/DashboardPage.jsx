import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import {browserHistory} from 'react-router';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      scens: [],
      loaded: false,
      seconds: "0",
      browser: "chrome"
    };

    this.addScen = this.addScen.bind(this);
    this.editScen = this.editScen.bind(this);
    this.runScen = this.runScen.bind(this);
    this.onRadio = this.onRadio.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          scens: xhr.response ? xhr.response.scens : [],
          seconds: xhr.response ? xhr.response.seconds : "0",
          loaded: true
        });
        localStorage.setItem('DashboardItems', JSON.stringify(this.state.scens));
      } else {
        let errors = {summary: xhr.status};
        this.setState({
          errors,
          loaded: true
        });
      }
    });
    xhr.send();
  }

  onRadio (event, value) {
    event.preventDefault();
    this.setState({
      browser: value
    });
  }

  addScen(event) {
    event.preventDefault();
    browserHistory.push('/add');
  }

  editScen(event) {
    event.preventDefault();
    const id = event.currentTarget.dataset.message;
    browserHistory.push('/edit/' + id);
  }

  runScen(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    this.setState({
      loaded: false,
    });

    const id = event.currentTarget.dataset.message;
    const storedScen = this.state.scens[id];

    // create a string for an HTTP body message
    let scenData =  {
      Scen: storedScen.name,
      Browser: this.state.browser
    }

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/run');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'text';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        browserHistory.push('/results/');
      } else {
        // failure
        let errors = {summary: xhr.status};
        this.setState({
          errors,
          loaded: true
        });
      }
    });
    xhr.send(JSON.stringify(scenData));
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Dashboard
        scens = {this.state.scens}
        seconds = {this.state.seconds}
        onAdd = {this.addScen}
        onEdit = {this.editScen}
        onRun={this.runScen}
        loaded = {this.state.loaded}
        onRadio={this.onRadio}
      />
    );
  }
}

export default DashboardPage;
