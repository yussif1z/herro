import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
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
                <Menu>

                    <Menu.Item>
                        <Button onClick={this.logout}>Logout</Button>
                    </Menu.Item>

                    <Menu.Item>
                        <Link to='/mybooking'>
                            <Button primary>My Booking</Button>
                        </Link>
                    </Menu.Item>

                </Menu>
            );
        }

        return (

            <Menu>
                <Menu.Item>
                    <Link to='/register'>
                        <Button primary>Sign up</Button>
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link to='/login'>
                        <Button>Log-in</Button>
                    </Link>
                </Menu.Item>
            </Menu>

        );
    }
}