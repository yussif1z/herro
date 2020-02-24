import React, { Component } from 'react'
import {
    Card,
    Grid,
    Button,
    Modal,
    Icon,
    Input,
    Transition,
    Label,
    Image
} from 'semantic-ui-react'
import moment from 'moment'
import firebase from '../../firebase'
import SimpleReactValidator from 'simple-react-validator'
import MapContainer from '../map/MapContainer'

export default class Booking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotelid: '',
            name: '',
            price: '',
            detail: '',
            pictureurl: '',
            location: {
                lat: '',
                lng: ''
            },
            bookingdate: '',
            modalOpen: false
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
        const hotelid = this.props.match.params.id
        firebase
            .firestore()
            .collection('hotels')
            .doc(hotelid)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!')
                } else {
                    firebase
                        .storage()
                        .refFromURL(doc.data().pictureurl)
                        .getDownloadURL()
                        .then(downloadURL => {
                            this.setState({
                                hotelid: doc.id,
                                name: doc.data().name,
                                price: doc.data().price,
                                detail: doc.data().detail,
                                pictureurl: downloadURL,
                                location: doc.data().location
                            })
                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error)
                        })
                }
            })
            .catch(err => {
                console.log('Error getting document', err)
            })
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        console.log(e.target.name)
    }

    handleOpenModal = () => {
        this.setState({
            modalOpen: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            bookingdate: '',
            modalOpen: false
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const { hotelid, bookingdate } = this.state
        const db = firebase.firestore()
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (this.validator.allValid()) {
                    db.collection('users')
                        .doc(user.uid)
                        .collection('mybooking')
                        .add({
                            hotelid: hotelid,
                            bookingdate: bookingdate
                        })
                        .then(() => {
                            this.props.history.push('/mybooking')
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
            } else if (!user) {
                this.props.history.push('/login')
            }
        })

    }

    render() {
        return (
            <Grid centered>
                <Grid.Column mobile={15} tablet={9} computer={9}>
                    <Card fluid>
                        <Image src={this.state.pictureurl} wrapped />
                        <Card.Content>
                            <Card.Header textAlign='center'>
                                {this.state.name}
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Description textAlign='left'>
                                {this.state.detail}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content as='h6' textAlign='left'>
                            <Icon name='tag' />
                            {this.state.price} THB / DAY
                            <Button onClick={this.handleOpenModal} floated='right' color='green' animated>
                                <Button.Content visible>Start booking</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='paper plane right' />
                                </Button.Content>
                            </Button>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column mobile={15} tablet={7} computer={7}>
                    <Card fluid>
                        <Card.Content textAlign='left'>
                            <Card.Header>
                                <Icon name='map pin' />
                                Location
                            </Card.Header>
                        </Card.Content>
                        <Card.Content textAlign='center'>
                            <MapContainer
                                location={this.state.location}
                                markerLatitude={this.state.location.lat}
                                markerLongitude={this.state.location.lng}
                            />
                        </Card.Content>
                    </Card>
                </Grid.Column>

                <Modal
                    open={this.state.modalOpen}
                    size='mini'
                >
                    <Modal.Content className='text-center'>
                        <h5><div>Booking Date</div></h5>
                        <Input fluid iconPosition='left'>
                            <Icon name='calendar alternate' />
                            <input type='date' name='bookingdate' onChange={this.onChange} />
                        </Input>
                        {this.validator.message(
                            'booking date',
                            this.state.bookingdate && moment(this.state.bookingdate, 'YYYY-MM-DD'),
                            ['required', { after_or_equal: moment() }]
                        )}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic onClick={this.handleCloseModal}>
                            Cancel
                            </Button>
                        <Button color='green' onClick={this.onSubmit}>
                            <Icon name='checkmark' /> Confirm
                            </Button>
                    </Modal.Actions>
                </Modal>

            </Grid>
        )
    }
}