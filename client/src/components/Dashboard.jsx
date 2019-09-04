import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Loader from 'react-loader';

const styles = {
  radioButton: {
    marginBottom: 16,
    width: "100px",
    display: "inline-flex"
  },
};

const Dashboard = ({
  onAdd,
  onEdit,
  onRun,
  scens,
  loaded,
  onRadio,
  seconds
}) => (
  <div>
  <Loader loaded={loaded}>
  <Card className="container">
    <CardTitle title="Now you have seconds:" subtitle={seconds} />
  </Card>
  {scens.map(function(scen, i) {
    return (
      <Card className="container" key={i}>
        <CardTitle title={scen.name}/>
        <div className="button-line">
          <RaisedButton
            label="Edit"
            data-message={i}
            secondary={true}
            onTouchTap={onEdit}
          />
        </div>

{/*        <RadioButtonGroup
          name="browser"
          defaultSelected="chrome"
          onChange={onRadio}
        >
          <RadioButton
            value="firefox"
            label="Firefox"
            style={styles.radioButton}
          />
          <RadioButton
            value="chrome"
            label="Chrome"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
*/}

        <div className="button-line">
          <RaisedButton
            label="Run"
            data-message={i}
            secondary={true}
            onTouchTap={onRun}
          />
        </div>
      </Card>
    );
  })}
  </Loader>
  <Card className="container">
    <CardTitle title="New Scen"/>
    <div className="button-line">
      <RaisedButton
        label="Add"
        secondary={true}
        onTouchTap={onAdd}
      />
    </div>
  </Card>
  </div>
);

Dashboard.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRun: PropTypes.func.isRequired,
  onRadio: PropTypes.func.isRequired,
  scens: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  seconds: PropTypes.string.isRequired
};

export default Dashboard;
