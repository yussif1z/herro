import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import auth from '../../firebase'

export default class MenuBar extends Component {

    logout = e => {
        e.preventDefault()
        auth.signOut().then(response => {
            this.setState({
                currentUser: null
            })
        })
    }

    render() {
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

                <Menu.Item>
                    <Button onClick={this.logout}>Logout</Button>
                </Menu.Item>

            </Menu>
        );
    }
}