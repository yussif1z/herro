import React, { Component } from 'react'
import { Card, Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
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
                        querySnapshot.forEach(userdoc => {
                            db.collection('hotels')
                                .doc(userdoc.data().hotelid)
                                .get()
                                .then(hoteldoc => {
                                    hotels.push({
                                        hotelid: hoteldoc.id,
                                        name: hoteldoc.data().name,
                                        bookingdate: userdoc.data().bookingdate
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
        const { hotels } = this.state

        return (
            <Grid textAlign='center'>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                    {hotels
                    .sort((a, b) => a.bookingdate > b.bookingdate)
                    .map((hotel, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/booking/${hotel.hotelid}`}>
                                    <Card link className='margin-bottom' fluid>
                                        <Card.Content>
                                            <Card.Description as='h4' textAlign='left'>
                                                {hotel.name}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content as='h6' textAlign='left' extra>
                                            <Icon name='calendar check' />
                                            {hotel.bookingdate}
                                        </Card.Content>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })}
                </Grid.Column>
            </Grid>
        )
    }
}