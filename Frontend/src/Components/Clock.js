import React, { Component } from "react";

export class clock extends Component {
    constructor() {
        super();
        this.state = { time: new Date() };
    }
    currentTime() {
        this.setState({ time: new Date() });
    }
    componentDidMount() {
        this.interval = setInterval(() => this.currentTime(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <>
                <div className="Clock">
                    <p id="time">{this.state.time.toLocaleTimeString()}</p>
                </div>
            </>
        )
    }
}

export default clock
