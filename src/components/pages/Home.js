import React, { Component } from 'react'
import HotelCard from '../cards/HotelCard'
import { Grid } from 'semantic-ui-react'

export default class Home extends Component {
    render() {
        return (
            <Grid textAlign='center'>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                    <HotelCard />
                </Grid.Column>
            </Grid>
        );
    }
}