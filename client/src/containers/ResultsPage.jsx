import React from 'react';
import Auth from '../modules/Auth';
import Results from '../components/Results.jsx';
import {browserHistory} from 'react-router';
import { sortBy } from 'lodash'

class ResultsPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      loaded: false
    };
    this.openResult = this.openResult.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/results');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        let res = xhr.response ? xhr.response : [];

        res = _.sortBy(res, function (el) {
          let elData = JSON.parse(el.data);
          if (elData.length > 1) {
            return elData[1].StartTime;
          } else {
            return 9988900016;
          }
        }).reverse();

        this.setState({
          results: res,
          loaded: true
        });
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

  openResult(event) {
    event.preventDefault();

    const id = event.currentTarget.dataset.message;
    browserHistory.push(`/result/${id}`);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Results
        results = {this.state.results}
        loaded = {this.state.loaded}
        openResult = {this.openResult}
      />
    );
  }
}

export default ResultsPage;
