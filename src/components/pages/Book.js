import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import firebase from '../../firebase'

export default class Book extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotels: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Grid className='mb-4' centered>
                <Grid.Column mobile={15} tablet={5} computer={5}>
                    <Card fluid>

                        <Card.Content className='card-color' textAlign='center'>

                        </Card.Content>

                    </Card>
                </Grid.Column>
                <Grid.Column mobile={15} tablet={11} computer={11}>
                    
                </Grid.Column>
            </Grid>
        );
    }
}