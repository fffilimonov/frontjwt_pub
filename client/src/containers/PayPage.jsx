import React, { PropTypes } from 'react';
import PayForm from '../components/PayForm.jsx';
import Auth from '../modules/Auth';
import MenuItem from 'material-ui/MenuItem';

class PayPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      items: [],
      value: '3',
      scriptLoaded: false
    };

    for (let i = 3; i < 100; i++ ) {
      this.state.items.push(<MenuItem value={`${i}`} key={i} primaryText={`${i} $`} />);
    }

    this.handleScriptCreate = this.handleScriptCreate.bind(this);
    this.handleScriptError = this.handleScriptError.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange (event, index, value) {
    event.preventDefault();
    this.setState({
      value: value
    });
  };

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }

  handleScriptError() {
    this.setState({ scriptError: true })
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }

  onClick() {
    let button = $ipsp.get('button');
    button.setMerchantId(1396424);
    button.setAmount(this.state.value, 'USD', true);
    button.setResponseUrl('https://likeuser.com/return/');
    button.setHost('api.fondy.eu');
    location.href=button.getUrl()
  }

  render() {
    return (
      <PayForm
        onChange={this.onChange}
        value={this.state.value}
        items={this.state.items}
        onClick={this.onClick}
        handleScriptCreate={this.handleScriptCreate}
        handleScriptError={this.handleScriptError}
        handleScriptLoad={this.handleScriptLoad}
      />
    );
  }

}

PayPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default PayPage;
