import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import firebase from '../../firebase'

export default class MyBooking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotels: []
        }
    }

    componentDidMount() {
        const db = firebase.firestore()
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection('users')
                    .doc(user.uid)
                    .collection('mybooking')
                    .get()
                    .then(querySnapshot => {
                        const hotels = []
                        querySnapshot.forEach(doc => {
                            db.collection('hotels')
                                .doc(doc.data().hotelid)
                                .get()
                                .then(doc => {
                                    hotels.push({
                                        hotelid: doc.id,
                                        name: doc.data().name,
                                        price: doc.data().price,
                                        detail: doc.data().detail,
                                    })
                                    this.setState({ hotels })
                                })
                        })
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
        const { hotels } = this.state;

        return (
            <Grid textAlign='center'>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                    {hotels.map((hotel, index) => {
                        return (
                            <Card key={index} link className='bg-transparent shadow-none' fluid>
                                {/* <Image src={require(hotel.pictureurl)} circular wrapped /> */}
                                <Card.Header textAlign='left'>
                                    <h5>
                                        {hotel.name}
                                    </h5>
                                </Card.Header>
                                <Card.Description textAlign='left'>
                                    {hotel.detail}
                                </Card.Description>
                                <Card.Meta textAlign='left'>
                                    {hotel.price}
                                </Card.Meta>
                            </Card>
                        );
                    })}
                </Grid.Column>
            </Grid>
        );
    }
}