import React, { Component } from 'react'
import { Card, Grid, Icon, Image } from 'semantic-ui-react'
import firebase from '../../firebase'

export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            birth: ''
        }
    }

    componentDidMount() {
        const db = firebase.firestore()
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection('users')
                    .doc(user.uid)
                    .get()
                    .then(doc => {
                        this.setState({
                            email: user.email,
                            name: doc.data().firstname + ' ' + doc.data().lastname,
                            birth: doc.data().birth
                        })
                    })
            } else if (!user) {
                this.props.history.push('/login')
            }
        })
    }

    render() {
        return (
            <Grid textAlign='center'>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                    <Card className='margin-bottom' fluid>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' wrapped ui={false} />
                        <Card.Content textAlign='left'>
                            <Card.Header>{this.state.name}</Card.Header>
                            <Card.Meta>
                                {this.state.email}
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content textAlign='left' extra>
                            <Icon name='birthday cake' />
                            {this.state.birth}
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        )
    }
}