import React, { Component } from "react";
import { authenticateUser } from "../../redux/actions";
import { connect } from "react-redux";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Custom components
import Title from '../../components/title/title';
import Footer from '../../components/footer/footer';
import InputLabel from "../../components/inputlabel/inputlabel";
import LoginButton from "../../components/loginbutton/loginbutton";
import SubLabel from "../../components/sublabel/sublabel";

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            registerSuccess: false
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onPasswordKeyDown = this.onPasswordKeyDown.bind(this);
        this.signUp = this.signUp.bind(this);
        this.goToDashboard = this.goToDashboard.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    signUp(e) {
        e.preventDefault();
        var user = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(process.env.REACT_APP_BACKEND_URL + '/user/register', user)
            .then((res) => {
                if (res.data.message === "User created successfully") {
                    this.setState({
                        registerSuccess: true
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onPasswordKeyDown(event) {
        if (event.key === 'Enter') {
            this.signIn(event);
        }
    }

    login() {
        var user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.authenticateUser(user, this.props.history);
    }

    goToLogin() {
        this.props.history.push("/user/auth");
    }

    goToDashboard() {
        this.props.history.push("/");
    }

    render() {

        return (
            <div className="login-page" ref={el => (this.div = el)}>
                <Container>
                    <Row>
                        {
                            !this.state.registerSuccess &&
                            <Col sm={12} style={{ textAlign: "center", marginBottom: "50px" }}>
                                <Title
                                    title="BCH Graph"
                                    subtitle="Get started with BCH Graph Bitcoin.com"
                                />
                                <InputLabel label="Email" /><br />
                                <input className="login-input" value={this.state.email} onChange={this.handleChangeEmail}></input><br />
                                <InputLabel label="Password" /><br />
                                <input className="login-input" type="password" value={this.state.password} htmlFor="password" onChange={this.handleChangePassword} onKeyDown={this.onPasswordKeyDown}></input><br />
                                <LoginButton
                                    clickHandle={(e) => this.signUp(e)}
                                    label="Get Started"
                                /><br />
                                <SubLabel
                                    label1="Already have an account?"
                                    label2="Log in here"
                                    onClickHandle={() => this.goToLogin()}
                                />
                            </Col>
                        }
                        {
                            this.state.registerSuccess &&
                            <Col sm={12} style={{ textAlign: "center", marginBottom: "50px" }}>
                                <Title
                                    title=""
                                    subtitle="Registered successfully..."
                                />
                                <LoginButton
                                    clickHandle={(e) => this.login(e)}
                                    label="Log in"
                                />
                            </Col>
                        }
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = ({ authUser }) => {
    const { user, loading, error } = authUser;
    return { user, loading, error };
};

export default connect(
    mapStateToProps,
    {
        authenticateUser
    }
)(Signup);
