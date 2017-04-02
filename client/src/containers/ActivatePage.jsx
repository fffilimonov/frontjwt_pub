import React, { PropTypes } from 'react';
import ActivateForm from '../components/ActivateForm.jsx';

class ActivatePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      userLink: `/api/activate/${this.props.params.user}`,
      gkey: '6LdIdhUUAAAAAANEO1oj10TDGc-COAx949IzWZxH',
      scriptLoaded: false
    };

    this.handleScriptCreate = this.handleScriptCreate.bind(this);
    this.handleScriptError = this.handleScriptError.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);

  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }

  handleScriptError() {
    this.setState({ scriptError: true })
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }

  render() {
    return (
      <ActivateForm
        userLink={this.state.userLink}
        gkey={this.state.gkey}
        handleScriptCreate={this.handleScriptCreate}
        handleScriptError={this.handleScriptError}
        handleScriptLoad={this.handleScriptLoad}
      />
    );
  }

}

ActivatePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ActivatePage;
