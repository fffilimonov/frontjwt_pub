import React, { PropTypes } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const AddForm = ({
  onSubmit,
  onChange,
  errors,
  scen
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Add scen</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
          name="name"
          onChange={onChange}
          errorText={errors.name}
          value={scen.name}
        />
      </div>

      <div>
        <TextareaAutosize name="text" defaultValue={scen.text} onChange={onChange}/>
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Add" primary />
      </div>

    </form>
  </Card>
);

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  scen: PropTypes.object.isRequired
};

export default AddForm;
