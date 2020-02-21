import React, { Component } from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'
import firebase from '../../firebase'
import MapContainer from '../map/MapContainer'

export default class Book extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: '',
            detail: '',
            location: {
                lat: '',
                lng: ''
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        firebase
            .firestore()
            .collection('hotels')
            .doc(id)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!')
                } else {
                    this.setState({
                        name: doc.data().name,
                        price: doc.data().price,
                        detail: doc.data().detail,
                        location: doc.data().location
                    })
                }
            })
            .catch(err => {
                console.log('Error getting document', err)
            });
    }

    render() {
        return (
            <Grid centered>
                <Grid.Column mobile={15} tablet={9} computer={9}>
                    <Card fluid>
                        <Card.Header textAlign='center'>
                            {this.state.name}
                        </Card.Header>
                        <Card.Description textAlign='center'>
                            {this.state.price}
                        </Card.Description>
                        <Card.Description textAlign='center'>
                            {this.state.detail}
                        </Card.Description>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Book
                                </Button>
                            </div>
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