import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import { SHA256, enc } from 'crypto-js';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let hash = SHA256(this.state.user.password)
    let userData =  {
      Username: this.state.user.email,
      Password: hash.toString(enc.Base64)
    }

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/signup');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        localStorage.setItem('SignUpMessage', 'Check email to activate account');

        // make a redirect
        this.context.router.replace('/login');
      } else {
        // failure

        let errors = {summary: xhr.status};

        this.setState({
          errors
        });
      }
    });
    xhr.send(JSON.stringify(userData));
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
