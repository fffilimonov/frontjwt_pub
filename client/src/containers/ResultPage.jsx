import React, { PropTypes } from 'react';
import ResultLayout from '../components/ResultLayout.jsx';
import Auth from '../modules/Auth';
import { has } from 'lodash'

class ResultPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      lightboxIsOpen: false,
      loaded: false,
      id: this.props.params.id,
      currentImage: 0,
      startData: {},
      stopData: {},
      stepsData: [],
      error: ''
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.getData = this.getData.bind(this);
  }

  openLightbox (event) {
    event.preventDefault();
    this.setState({
      lightboxIsOpen: true
    });
  }

  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
 }

  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  getData () {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/result/' + this.state.id);
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        let rLength = xhr.response.length;
        let stopData = xhr.response[rLength - 1];
        if (_.has(stopData, "Done")) {
          let rLength = xhr.response.length;
          let startData = xhr.response[0];
          let stopData = xhr.response[rLength - 1];
          let images = xhr.response.slice(1, -1);
          let stepsData = [];

          stepsData = images.map(function(step){
            let caption = Object.keys(step)[0];
            let src = step[caption];
            return {caption: caption,
              src: src};
          });

          this.setState({
            startData: startData,
            stopData: stopData,
            loaded: true,
            stepsData: stepsData,
            currentImage: stepsData.length - 1
          });
        }
      } else {
          this.setState({
            loaded: true,
            error: xhr.status
          });
      }
    });
    xhr.send();
  }

  startPolling () {
      var self = this;
      setTimeout(function() {
        self.getData();
        self._timer = setInterval(self.getData.bind(self), 2500);
      }, 100);
  }

  componentDidMount() {
    this.startPolling();
  }

  componentDidUpdate() {
      if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <ResultLayout
        startData={this.state.startData}
        stopData={this.state.stopData}
        stepsData={this.state.stepsData}
        loaded = {this.state.loaded}
        isOpenedLightbox={this.state.lightboxIsOpen}
        openLightbox={this.openLightbox}
        closeLightbox={this.closeLightbox}
        gotoPrevious={this.gotoPrevious}
        gotoNext={this.gotoNext}
        currentImage={this.state.currentImage}
        error={this.state.error}
      />
    );
  }

}

ResultPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ResultPage;
