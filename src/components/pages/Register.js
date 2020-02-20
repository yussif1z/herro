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
    e.preventDefault()
    const { email, password, firstname, lastname, birth } = this.state
    const db = firebase.firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        db.collection('users')
          .doc(response.user.uid)
            .set({
              firstname: firstname,
              lastname: lastname,
              birth: birth
            })
      })
      .then((response) => {
        firebase.auth.signOut().then(response => {
          this.props.history.push('/login')
        })
      })
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  render() {
    return (
      <Responsive>
        <Container fluid>
          <Grid centered>
            <Grid.Column mobile={16} tablet={7} computer={6}>
              <h4 className="text-center mb-4"><div>Sign up</div></h4>
              <Form onSubmit={this.onSubmit}>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='email'>
                    <Icon name='mail' />
                    <input type="email" name='email' onChange={this.onChange} />
                  </Input>
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='password'>
                    <Icon name='unlock' />
                    <input type="password" name='password' onChange={this.onChange} />
                  </Input>
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='confirm password'>
                    <Icon name='unlock alternate' />
                    <input type="password" name='confirmpassword' onChange={this.onChange} />
                  </Input>
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='first name'>
                    <Icon name='vcard' />
                    <input type="text" name='firstname' onChange={this.onChange} />
                  </Input>
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='last name'>
                    <Icon name='vcard' />
                    <input type="text" name='lastname' onChange={this.onChange} />
                  </Input>
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='birth'>
                    <Icon name='calendar alternate' />
                    <input type="text" name='birth' onChange={this.onChange} />
                  </Input>
                </Form.Field>

                <div>
                  <Button color='yellow' animated>
                    <Button.Content visible>Sign up</Button.Content>
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