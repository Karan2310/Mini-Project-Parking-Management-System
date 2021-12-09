import React, { Component } from 'react'
import Login from '../Pages/Login';
import { ParkingDataContext } from '../ParkingDataContext';
import { isLoggedIn } from '../_services/_authService';
import ParkingManagement from './ParkingManagement';

export default class LandingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    updateLoginStatus = (loginStatus) => {
        this.setState({ isLoggedIn: loginStatus });
    }

    render() {

        return (
            <ParkingDataContext.Provider value={{ updateLoginStatus: this.updateLoginStatus }}>
                <ParkingDataContext.Consumer>
                    {(props) =>
                        (this.state.isLoggedIn) ? <ParkingManagement {...props} /> : <Login {...props} />
                    }
                </ParkingDataContext.Consumer>
            </ParkingDataContext.Provider>
        )
    }
}
