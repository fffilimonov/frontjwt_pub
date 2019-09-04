import React, { PropTypes } from 'react';
import ActivateForm from '../components/ActivateForm.jsx';

class ActivatePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      userLink: `/api/activate/${this.props.params.user}`
    };

  }

  render() {
    return (
      <ActivateForm
        userLink={this.state.userLink}
      />
    );
  }

}

ActivatePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ActivatePage;
