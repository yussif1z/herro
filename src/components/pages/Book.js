import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import firebase from '../../firebase'
import MapContainer from '../map/MapContainer'

export default class Book extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: {
                lat: 13.7563,
                lng: 100.5018
            }
        }
    }

    render() {
        return (
            <Grid centered>
                <Grid.Column mobile={15} tablet={9} computer={9}>
                    <Card fluid>
                        <Card.Content textAlign='center'>

                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column mobile={15} tablet={7} computer={7}>
                    <Card fluid>
                        <Card.Content textAlign='center'>
                            <MapContainer 
                                location={this.state.location} 
                                markerLatitude={this.state.location.lat}
                                markerLongitude={this.state.location.lng} 
                            />
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        );
    }
}