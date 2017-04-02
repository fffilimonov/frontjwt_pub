import React, { PropTypes } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import AddForm from '../components/AddForm.jsx';
import Auth from '../modules/Auth';

class AddPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      scen: {
        name: 'Check my info',
        text: 'I open "https://google.com"\nI fill 1 input with "my browser info"\nI will see "What\'s My Browser"\nI click on the text \"What\'s My Browser"\n'
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

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

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
      <AddForm
        onSubmit={this.processForm}
        onChange={this.changeScen}
        errors={this.state.errors}
        scen={this.state.scen}
      />
    );
  }

}

AddPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AddPage;
