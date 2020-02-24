import React, { Component } from 'react'
import {
    Responsive,
    Container,
    Icon,
    Input,
    Button,
    Form,
    Grid,
    Transition,
    Label,
    Header
} from 'semantic-ui-react'
import SimpleReactValidator from 'simple-react-validator'
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

        this.validator = new SimpleReactValidator({
            element: message =>
                <div>
                    <Transition
                        animation='shake'
                        duration={250}
                        transitionOnMount={true}
                    >
                        <Label basic color='red' pointing>{message}</Label>
                    </Transition>
                    <br />
                </div>
        })

        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
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
        if (this.validator.allValid()) {
            e.preventDefault()
            const { email, password } = this.state
            firebase
                .auth()
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
        } else {
            this.validator.showMessages()
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate()
        }
    }

    render() {

        const { message } = this.state

        return (
            <Responsive>
                <Container fluid>
                    <Grid centered>
                        <Grid.Column mobile={16} tablet={7} computer={6}>
                            <Header as='h3' textAlign='center'>Sign in</Header>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Field>
                                    <Input fluid iconPosition='left' placeholder='username'>
                                        <Icon name='user' />
                                        <input type="email" name='email' onChange={this.onChange} />
                                    </Input>
                                    {this.validator.message('email', this.state.email, 'required|email')}
                                </Form.Field>

                                <Form.Field>
                                    <Input fluid iconPosition='left' placeholder='password'>
                                        <Icon name='lock' />
                                        <input type="password" name='password' onChange={this.onChange} />
                                    </Input>
                                    {this.validator.message('password', this.state.password, 'required')}
                                </Form.Field>

                                {message ?
                                    <div>
                                        <Transition
                                            animation='shake'
                                            duration={250}
                                            transitionOnMount={true}
                                        >
                                            <Label basic color='red'>{message}</Label>
                                        </Transition>
                                        <br />
                                    </div> : null}

                                <Button floated='right' color='green' animated='fade'>
                                    <Button.Content visible>Sign in</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='unlock' />
                                    </Button.Content>
                                </Button>

                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Responsive>
        )
    }

}