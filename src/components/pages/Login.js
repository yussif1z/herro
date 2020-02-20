import React, { Component } from 'react'
import {
    Responsive,
    Container,
    Icon,
    Input,
    Button,
    Form,
    Grid
} from 'semantic-ui-react'
import firebase from '../../firebase'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            currentUser: null,
            message: ''
        }
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/')
            }
        })
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        firebase.auth
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                this.setState({
                    currentUser: response.user
                })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    message: error.message
                })
            })
    }

    render() {

        const { message } = this.state

        return (
            <Responsive>
                <Container fluid>
                    <Grid centered>
                        <Grid.Column mobile={16} tablet={7} computer={6}>
                            <h4 className="text-center mb-4"><div>Sign in</div></h4>
                            {message ? <p className="help is-danger">{message}</p> : null}
                            <Form onSubmit={this.onSubmit}>
                                <Form.Field>
                                    <Input fluid iconPosition='left' placeholder='username'>
                                        <Icon name='user' />
                                        <input type="email" name='email' onChange={this.onChange} />
                                    </Input>
                                </Form.Field>

                                <Form.Field>
                                    <Input fluid iconPosition='left' placeholder='password'>
                                        <Icon name='lock' />
                                        <input type="password" name='password' onChange={this.onChange} />
                                    </Input>
                                </Form.Field>

                                <div>
                                    <Button color='yellow' animated>
                                        <Button.Content visible>Sign in</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                </div>

                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Responsive>
        );
    }

}