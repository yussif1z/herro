import React, { Component } from 'react'
import { Button, Menu, Image, Header, Dropdown, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'

export default class MenuBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuth: null,
            name: ''
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
                            isAuth: true,
                            name: doc.data().firstname
                        })
                    })
            } else if (!user) {
                this.setState({
                    isAuth: false
                })
            }
        })
    }

    logout = e => {
        e.preventDefault()
        firebase.auth().signOut().then(response => {
            this.setState({
                isAuth: false
            })
        })
    }

    render() {
        const { isAuth } = this.state

        if (isAuth === true) {
            return (
                <Menu size='tiny'>
                    <Menu.Item href='/' link>
                        <Image src={require('../imgs/hotel.png')} size='mini' />
                    </Menu.Item>
                    <Menu.Item href='/' link>
                        <Header size='small'>Discover</Header>
                    </Menu.Item>
                    <Menu.Item href='/mybooking' link>
                        <Header size='small'>My Booking</Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Dropdown
                            className='icon'
                            text={
                                <Header size='small'>{`${this.state.name}'s`}</Header>
                            }
                            item
                            header
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item icon='user' text='Profile' href='/profile' />
                                <Dropdown.Item icon='sign-out' text='Sign out' onClick={this.logout} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            )
        } else if (isAuth === false) {
            return (
                <Menu size='tiny'>
                    <Menu.Item href='/' link>
                        <Image src={require('../imgs/hotel.png')} size='mini' />
                    </Menu.Item>
                    <Menu.Item href='/' link>
                        <Header size='small'>Discover</Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Link to='/login'>
                                <Button size='small'>Sign In</Button>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/register'>
                                <Button size='small' primary>Create Account</Button>
                            </Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            )
        } else if (isAuth === null) {
            return (
                <Menu size='tiny' borderless>
                    <Menu.Item>
                        <Image src={require('../imgs/hotel.png')} size='mini' />
                    </Menu.Item>
                    <Menu.Item active>
                        <Loader active inline size='small' />
                        &nbsp;&nbsp;Please wait..
                    </Menu.Item>
                </Menu>
            )
        }
    }
}