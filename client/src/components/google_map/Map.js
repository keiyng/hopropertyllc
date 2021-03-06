import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import keys from '../../keys';

const Marker = ({ text }) => <div style={{width: '150px', fontWeight: 'bold', fontSize: '1.4em'}}><span className="oi oi-home"></span>{text}</div>;

class GoogleMap extends PureComponent {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  

  render() {
    const address = this.props.address.slice()
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: keys.googleMapKey }}
          defaultCenter={this.props.location}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={this.props.location.lat}
            lng={this.props.location.lng}
            text={address.slice(0, this.props.address.indexOf(','))}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;