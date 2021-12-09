import React, { Component } from "react";
import { isLoggedIn, loginUser } from "../_services/_authService";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }


  attemptAutoLogin = () => {
    if (isLoggedIn()) {
      this.props.updateLoginStatus(true);
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.attemptAutoLogin();

  }

  onSubmit = (event) => {

    const { email, password } = this.state;

    if (email && password) {
      const loginStatus = loginUser(email, password);
      this.setState({
        loginError: !loginStatus
      })
      this.attemptAutoLogin();
    }

  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {

    return (
      <>
        <div class="section login" style={{ backgroundColor: "rgb(67 67 83)" }}>
          <div class="container">
            <div class="row full-height d-flex align-items-center justify-content-center">
              <div class="col-12 text-center align-self-center ">
                <div class="section pt-sm-2 text-center">
                  <h6 class="mb-0 pb-3"><span>Log In </span><span>Register</span></h6>
                  <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                  <label for="reg-log"></label>
                  <div class="card-3d-wrap mx-auto">
                    <div class="card-3d-wrapper">
                      <div class="card-front">
                        <div class="center-wrap">
                          <div class="section text-center">
                            <h3 class="mb-4 pb-3 text-light fw-bold">Log In</h3>
                            <div class="form-group">
                              <input type="email" name="logemail" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off" value={this.state.email} onChange={this.onChange} name="email" />
                              <i class="input-icon uil uil-at"></i>
                            </div>
                            <div class="form-group mt-2">
                              <input type="password" name="logpass" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off" value={this.state.password} onChange={this.onChange} name="password" />
                              <i class="input-icon uil uil-lock-alt"></i>
                            </div>
                            {this.state.loginError && <p className="text-danger mt-3">Invalid credentials</p>}
                            <a href="javascript:void(0)" class="btn mt-4" onClick={this.onSubmit}>submit</a>
                          </div>
                        </div>
                      </div>
                      <div class="card-back">
                        <div class="center-wrap">
                          <div class="section text-center">
                            <h3 class="mb-4 pb-1 text-light fw-bold">Register</h3>
                            <h5 className="text-light">To Register yourself kindly mail us on
                              <span className="text-lowercase">  register@gmail.com</span></h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  }
}
