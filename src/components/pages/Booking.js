import React, { Component } from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'
import firebase from '../../firebase'
import MapContainer from '../map/MapContainer'

export default class Booking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotelid: '',
            name: '',
            price: '',
            detail: '',
            location: {
                lat: '',
                lng: ''
            }
        }
        this.onBooking = this.onBooking.bind(this);
    }

    componentDidMount() {
        const hotelid = this.props.match.params.id
        firebase
            .firestore()
            .collection('hotels')
            .doc(hotelid)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!')
                } else {
                    this.setState({
                        hotelid: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        detail: doc.data().detail,
                        location: doc.data().location
                    })
                }
            })
            .catch(err => {
                console.log('Error getting document', err)
            })
    }

    onBooking() {
        const { hotelid } = this.state
        const db = firebase.firestore()
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection('users')
                    .doc(user.uid)
                    .collection('mybooking')
                    .add({
                        hotelid: hotelid,
                    })
                    .catch(error => {
                        this.setState({
                            message: error.message
                        })
                    })
            } else if (!user) {
                this.props.history.push('/login')
            }
        })
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
                        <Card.Content textAlign='right' extra>
                            <Button onClick={this.onBooking} basic color='green'>
                                Booking
                            </Button>
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