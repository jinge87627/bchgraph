import React, { Component } from "react";
import { authenticateUser } from "../../redux/actions";
import { connect } from "react-redux";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styled from "styled-components";

// Custom components
import Title from '../../components/title/title';
import Footer from '../../components/footer/footer';
import InputLabel from "../../components/inputlabel/inputlabel";
import LoginButton from "../../components/loginbutton/loginbutton";
import SubLabel from "../../components/sublabel/sublabel";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "user@bchgraph.com",
            password: "bchgraph"
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onPasswordKeyDown = this.onPasswordKeyDown.bind(this);
        this.signIn = this.signIn.bind(this);
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

    onPasswordKeyDown(event) {
        if (event.key === 'Enter') {
            this.signIn(event);
        }
    }

    signIn(e) {
        e.preventDefault();
        var user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.authenticateUser(user, this.props.history);
    }

    goToSignUp() {
        this.props.history.push("/user/signup");
    }

    render() {
        const AlertLabel = styled(InputLabel)`
            display: inline-block;
            font-size: 1.2rem;
            color: #ff0000;
            width: 300px;
            text-align: left;
            margin: 0px 0px 5px 0px;
            font-family: "Roboto", sans-serif;
            display: none;
        `;

        return (
            <div className="login-page" ref={el => (this.div = el)}>
                <Container>
                    <Row>
                        <Col sm={12} style={{ textAlign: "center", marginBottom: "50px" }}>
                            <Title
                                title="BCH Graph"
                                subtitle="Graphing the BCH price using endpoints from Bitcoin.com"
                            />
                            <InputLabel label="Email" /><br />
                            <input className="login-input" value={this.state.email} onChange={this.handleChangeEmail}></input><br />
                            <InputLabel label="Password" /><br />
                            <input className="login-input" type="password" value={this.state.password} onChange={this.handleChangePassword} onKeyDown={this.onPasswordKeyDown}></input><br />
                            <AlertLabel ref={el => (this.wrongPassAlert = el)} >User credential is not correct!</AlertLabel><br />
                            <LoginButton
                                clickHandle={(e) => this.signIn(e)}
                                label="Log in"
                            /><br />
                            <SubLabel
                                label1="New to BCH Graph?"
                                label2="Sign up now"
                                onClickHandle={() => this.goToSignUp()}
                            />
                        </Col>
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
)(Login);
