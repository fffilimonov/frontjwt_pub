import React, { PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from 'react-loader';
import Lightbox from 'react-images';
import { has } from 'lodash'


const ResultLayout = ({
  startData,
  loaded,
  stopData,
  stepsData,
  isOpenedLightbox,
  openLightbox,
  closeLightbox,
  gotoPrevious,
  gotoNext,
  currentImage,
  error
}) => (
  <Loader loaded={loaded}>
<div>
  {_.has(stopData, "Done") &&
    <Card className="container">

      {stopData.Done > 0 && <p className="error-message">Failed</p>}
      {stopData.Done == 0 && <p className="success-message">Passed</p>}

      <Lightbox
        images={stepsData}
        currentImage={currentImage}
        isOpen={isOpenedLightbox}
        onClickPrev={gotoPrevious}
        onClickNext={gotoNext}
        onClose={closeLightbox}
      />

      <div className="button-line">
        <RaisedButton
          label="Screenshots"
          secondary={true}
          onTouchTap={openLightbox}
        />
      </div>

    </Card>
  }
  {error != "" &&
    <Card className="container">
      <p className="error-message">No data</p>
    </Card>
  }
</div>
  </Loader>
);

ResultLayout.propTypes = {
  loaded: PropTypes.bool.isRequired,
  startData: PropTypes.object.isRequired,
  stopData: PropTypes.object.isRequired,
  stepsData: PropTypes.array.isRequired,
  openLightbox: PropTypes.func.isRequired,
  closeLightbox: PropTypes.func.isRequired,
  gotoPrevious: PropTypes.func.isRequired,
  gotoNext: PropTypes.func.isRequired,
  isOpenedLightbox: PropTypes.bool.isRequired,
  currentImage: PropTypes.number.isRequired
};

export default ResultLayout;
