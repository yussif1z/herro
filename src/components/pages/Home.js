import React, { Component } from 'react'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import firebase from '../../firebase'

export default class HotelCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotels: []
            // name: '',
            // price: '',
            // detail: '',
            // pictureurl: '',
            // location: {
            //     latitude: '',
            //     longitude: ''
            // }
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
                        name: doc.data().name,
                        price: doc.data().price,
                        detail: doc.data().detail,
                        pictureurl: doc.data().pictureurl,
                        latitude: doc.data().location.latitude,
                        longitude: doc.data().location.longitude
                    });
                });
                this.setState({ hotels })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    render() {
        return (
            // <Card link className='bg-transparent shadow-none' fluid>
            //     {/* <Image circular wrapped /> */}
            //     <Card.Description textAlign='left'>
            //         <h5>
            //             name
            //         </h5>
            //     </Card.Description>
            //     <Card.Description textAlign='left'>
            //         กรุงเทพมหานคร
            //     </Card.Description>
            //     <Card.Description textAlign='left'>
            //         120/hour
            //     </Card.Description>
            // </Card>
            <Grid textAlign='center'>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                    <div>
                        {this.state.hotels.map(v => {
                            return (
                                <p>
                                    name: {v.name},
                  price: {v.price},
                  detail: {v.detail},
                  pictureurl: {v.pictureurl}
                                    latitude: {v.latitude}
                                    longitude: {v.longitude}
                                </p>
                            );
                        })}
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}