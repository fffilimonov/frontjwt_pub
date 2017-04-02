import React, { PropTypes } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import EditForm from '../components/EditForm.jsx';
import Auth from '../modules/Auth';

class EditPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedScens = JSON.parse(localStorage.getItem('DashboardItems'));
    const storedScen = storedScens[this.props.params.id];

    // set the initial component state
    this.state = {
      errors: {},
      scen: {
        name: storedScen['name'],
        text: storedScen['text']
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeScen = this.changeScen.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    let scenData =  {
      Name: this.state.scen.name,
      Text: this.state.scen.text
    }

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/add');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // change the current URL to /
        this.context.router.replace('/');
      } else {
        // failure

        let errors = {summary: xhr.status};
        this.setState({
          errors
        });
      }
    });
    xhr.send(JSON.stringify(scenData));
  }

  /**
   * Change the scen object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeScen(event) {
    const field = event.target.name;
    const scen = this.state.scen;
    scen[field] = event.target.value;

    this.setState({
      scen
    });
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <EditForm
        onSubmit={this.processForm}
        onChange={this.changeScen}
        errors={this.state.errors}
        scen={this.state.scen}
      />
    );
  }

}

EditPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditPage;
