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
import moment from 'moment'
import SimpleReactValidator from 'simple-react-validator'
import firebase from '../../firebase'

export default class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
      firstname: '',
      lastname: '',
      birth: '',
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
      const { email, password, firstname, lastname, birth } = this.state
      const db = firebase.firestore();
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          return db.collection('users')
            .doc(response.user.uid)
            .set({
              firstname: firstname,
              lastname: lastname,
              birth: birth
            })
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

              <Header as='h3' textAlign='center'>Create Account</Header>

              <Form onSubmit={this.onSubmit}>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='email'>
                    <Icon name='mail' />
                    <input type='email' name='email' onChange={this.onChange} />
                  </Input>
                  {this.validator.message('email', this.state.email, 'required|email')}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='password'>
                    <Icon name='unlock' />
                    <input type='password' name='password' onChange={this.onChange} />
                  </Input>
                  {this.validator.message('password', this.state.password, 'required|alpha_num_dash|min:6,string|max:30,string')}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='confirm password'>
                    <Icon name='unlock alternate' />
                    <input type='password' name='confirmpassword' onChange={this.onChange} />
                  </Input>
                  {this.validator.message('confirm password', this.state.confirmpassword, `required|in:${this.state.password}`, { messages: { in: 'The password need to match.' } })}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='first name'>
                    <Icon name='vcard' />
                    <input type='text' name='firstname' onChange={this.onChange} />
                  </Input>
                  {this.validator.message('first name', this.state.firstname, 'required|alpha')}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='last name'>
                    <Icon name='vcard' />
                    <input type='text' name='lastname' onChange={this.onChange} />
                  </Input>
                  {this.validator.message('last name', this.state.lastname, 'required|alpha')}
                </Form.Field>

                <Form.Field>
                  <small><div>Birthday</div></small>
                  <Input fluid iconPosition='left'>
                    <Icon name='calendar alternate' />
                    <input type='date' name='birth' onChange={this.onChange} />
                  </Input>
                  {this.validator.message(
                    'birthday',
                    this.state.birth && moment(this.state.birth, 'YYYY-MM-DD'),
                    ['required', { before_or_equal: moment().add(-18, 'year') }],
                    { messages: { before_or_equal: 'You must be at least 18 years old.' } }
                  )}
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

                <Button floated='right' color='green' animated>
                  <Button.Content visible>Sign up</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
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