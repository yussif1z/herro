import React, { Component } from 'react'
import { Card, Grid, Image, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotels: []
        }
    }

    componentDidMount() {
        const db = firebase.firestore()
        db.collection('hotels')
            .get()
            .then(querySnapshot => {
                const hotels = []
                querySnapshot.forEach(doc => {
                    firebase
                        .storage()
                        .refFromURL(doc.data().pictureurl)
                        .getDownloadURL()
                        .then(downloadURL => {
                            hotels.push({
                                hotelid: doc.id,
                                name: doc.data().name,
                                price: doc.data().price,
                                detail: doc.data().detail,
                                pictureurl: downloadURL,
                            })
                            this.setState({ hotels })
                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error)
                        })
                })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error)
            })
    }

    render() {
        return (
            <Grid textAlign='center'>
                <Grid.Column mobile={16} tablet={7} computer={7}>
                    {this.state.hotels
                        .sort((a, b) => a.price > b.price)
                        .map((hotel, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/booking/${hotel.hotelid}`}>
                                        <Card link className='margin-bottom' fluid>
                                            <Image src={hotel.pictureurl} wrapped />
                                            <Card.Content>
                                                <Card.Header as='h3' textAlign='left'>
                                                    {hotel.name}
                                                </Card.Header>
                                                <Card.Description textAlign='left'>
                                                    {hotel.detail}
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content as='h6' textAlign='left' extra>
                                                <Icon name='tag' />
                                                {hotel.price} THB
                                            <Button floated='right' size='mini' compact basic disabled>See more<Icon name='angle right' /></Button>

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