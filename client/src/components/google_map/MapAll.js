import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import keys from '../../keys';
import axios from 'axios';
import shortid from 'shortid';

const Marker = ({text}) => (
  <div style={{ width: '50px' }}>
    <span className="oi oi-home" />
  </div>
);

class GoogleMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locList: []
    };
    this.locData = []
  }

  static defaultProps = {
    center: {
      lat: 40.802421,
      lng: -74.605373
    },
    zoom: 9
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props !== nextProps &&
      this.state.locList.length !== nextProps.properties.length
    ) {
      for (let i = 0; i < nextProps.properties.length; i++) {
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${
              nextProps.properties[i].address
            }&key=${keys.googleMapKey}`
          )
          .then(res => {
            this.locData.push(res.data.results[0].geometry.location)
            if(this.locData.length === nextProps.properties.length) {
              this.setState({
              locList: this.locData
            });              
            }
          })
          .catch(err => {
            console.log(err);
            this.locData.push({})
          });
      }
    }
  }
  renderMarkers() {
    let markers = [];
    for (let i = 0; i < this.state.locList.length; i++) {
      if (
        typeof this.state.locList[i].lat === 'number' &&
        typeof this.state.locList[i].lng === 'number'
      ) {
        markers.push(
          <Marker
            lat={this.state.locList[i].lat}
            lng={this.state.locList[i].lng}
            key={shortid.generate()}
          />
        );
      }
    }
    return markers;
  }

  render() {
    return (
      <div style={{ width: '100vw', height: '50vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: keys.googleMapKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.state.locList.length > 0 &&
            this.state.locList.length === this.props.properties.length &&
            this.renderMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
