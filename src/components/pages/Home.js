import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'

export default class HotelCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotels: []
        }
    }

    componentDidMount() {
        firebase
            .firestore()
            .collection('hotels')
            .get()
            .then(querySnapshot => {
                const hotels = []
                querySnapshot.forEach(doc => {
                    hotels.push({
                        hotelid: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        detail: doc.data().detail,
                        pictureurl: doc.data().pictureurl,
                        latitude: doc.data().location.latitude,
                        longitude: doc.data().location.longitude
                    })
                })
                this.setState({ hotels })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error)
            })
    }

    render() {
        return (
            <Grid textAlign='center'>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                    {this.state.hotels.map((hotel, index) => {
                        return (
                            <Link to={`/booking/${hotel.hotelid}`}>
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
                                    <Card.Description textAlign='left'>
                                        {hotel.latitude}
                                    </Card.Description>
                                    <Card.Description textAlign='left'>
                                        {hotel.longitude}
                                    </Card.Description>
                                </Card>
                            </Link>
                        );
                    })}
                </Grid.Column>
            </Grid>
        );
    }
}