import React, { Component } from "react";

import styled from "styled-components";

export default class Logout extends Component {

    render() {

        const Logout = styled.button`
            position: absolute;
            top: 10px;
            right: 10px;
            background: transparent;
            border: none;
            font-size: 48px;
            color: "#fafbff"
        `;

        return (
            <Logout>
                <i className="fa fa-sign-out log-out-icon" onClick={() => this.props.logOut()}></i>
            </Logout>
        )
    }
}
