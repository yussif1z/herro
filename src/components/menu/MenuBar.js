import React, { Component } from 'react'
import { Button, Menu, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'

export default class MenuBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuth: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    isAuth: true
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

        if (isAuth) {
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
                            <Link to='/mybooking'>
                                <Button>My Booking</Button>
                            </Link>
                        </Menu.Item>
                        <Menu.Item onClick={this.logout} link>
                            <Header size='small'>Logout</Header>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            );
        }

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
                            <Button>Sign In</Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/register'>
                            <Button primary>Create Account</Button>
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}