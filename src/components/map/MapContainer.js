import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import styles from './mapStyles'
import Marker from './Marker'

class MapContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: {
                lat: 13.7563,
                lng: 100.5018
            },
            zoom: 16
        }
    }

    render() {
        return (
            <div class="map-responsive">
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyDxYQoa90Q2clupDUCwMiAAvModGcY2y0k',
                            language: 'en'
                        }}
                        center={this.props.location}
                        zoom={this.state.zoom}
                        options={{ styles }}
                    >
                        <Marker
                            lat={this.props.markerLatitude}
                            lng={this.props.markerLongitude}
                        >
                        </Marker>
                    </GoogleMapReact>
                </div>
            </div>
        )
    }

}

export default MapContainer