import React, { PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Script from 'react-load-script'
import SelectField from 'material-ui/SelectField';

const styles = {
  customWidth: {
    width: 150,
  },
};

const PayForm = ({
  onChange,
  items,
  value,
  handleScriptCreate,
  handleScriptError,
  handleScriptLoad,
  onClick
}) => (
  <Card className="container">i

      <h2 className="card-heading">Add some seconds</h2>
      <CardTitle title="$0.00006 per second"/>

      <SelectField
        floatingLabelText="Amount"
        value={value}
        onChange={onChange}
        style={styles.customWidth}
      >
        {items}
      </SelectField>

      <Script
        url="https://api.fondy.eu/static_common/v1/checkout/ipsp.js"
        onCreate={handleScriptCreate}
        onError={handleScriptError}
        onLoad={handleScriptLoad}
      />

        <div className="button-line">
          <RaisedButton
            label="Pay"
            secondary={true}
            onTouchTap={onClick}
          />
        </div>
  </Card>
);

PayForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleScriptCreate: PropTypes.func.isRequired,
  handleScriptError: PropTypes.func.isRequired,
  handleScriptLoad: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PayForm;
