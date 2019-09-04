import React, { PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import Script from 'react-load-script'

const ActivateForm = ({
  userLink,
  // gkey,
  // handleScriptCreate,
  // handleScriptError,
  // handleScriptLoad
}) => (
  <Card className="container">
    <form action={userLink} method="POST">
      <h2 className="card-heading">Activate account</h2>
{/*      <Script
        url="https://www.google.com/recaptcha/api.js"
        onCreate={handleScriptCreate}
        onError={handleScriptError}
        onLoad={handleScriptLoad}
      />
      <div className="g-recaptcha" data-sitekey={gkey}></div>
*/}      <div className="button-line">
        <RaisedButton type="submit" label="Submit" primary />
      </div>
    </form>
  </Card>
);

ActivateForm.propTypes = {
  userLink: PropTypes.string.isRequired,
  // gkey: PropTypes.string.isRequired,
  // handleScriptCreate: PropTypes.func.isRequired,
  // handleScriptError: PropTypes.func.isRequired,
  // handleScriptLoad: PropTypes.func.isRequired
};

export default ActivateForm;
