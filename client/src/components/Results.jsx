import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Loader from 'react-loader';
import { has, map } from 'lodash'


const Results = ({
  results,
  loaded,
  openResult
}) => (
  <div>
  <Loader loaded={loaded}>
  {results.map(function(result, i) {
    return (
      <Card className="container" key={i}>
        <CardTitle title={result.id}/>
        <List>
        {_.map(JSON.parse(result.data), function(data, i) {
          if (_.has(data, "Name")) {
            return (
                <ListItem key={i} disabled={true} primaryText={`Scenario: ${data.Name}`} />
            );
          }
          if (_.has(data, "Browser")) {
            return (
                <ListItem key={i} disabled={true} primaryText={`Browser: ${data.Browser}`} />
            );
          }
          if (_.has(data, "Elapsed")) {
            return (
                <ListItem key={i} disabled={true} primaryText={`Elapsed: ${data.Elapsed * -1} seconds`} />
            );
          }
          if (_.has(data, "Done")) {
            return (
                <ListItem key={i} disabled={true} primaryText={`Exit code: ${data.Done}`} />
            );
          }
          if (_.has(data, "StartTime")) {
            let startTime = new Date(data.StartTime * 1000);
            return (
                <ListItem key={i} disabled={true} primaryText={`Started at: ${startTime}`} />
            );
          }
        })}
        </List>
        {_.find(JSON.parse(result.data), function(o){return _.has(o, "Done")}) &&
          <div className="button-line">
            <RaisedButton
              label="Result"
              secondary={true}
              data-message={result.id}
              onTouchTap={openResult}
            />
          </div>
        }
      </Card>
    );
  })}
  </Loader>
  </div>
);

Results.propTypes = {
  results: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  openResult: PropTypes.func.isRequired
};

export default Results;
