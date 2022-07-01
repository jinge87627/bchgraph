import React, { Component } from "react";

import styled from "styled-components";

export default class LoginButton extends Component {

    render() {

        const LoginButton = styled.button`
            width: 308px;
            height: 56px;
            color: #ffffff;
            margin: 20px 0px 5px 0px;
            padding: 0;
            background: #00a2ed;
            border: 1px solid #00a2ed;
            border-radius: 12px;
            font-size: 1.2rem;
            font-family: "Roboto", sans-serif;
            font-weight: 600;
            cursor: pointer;
        `;

        return (
            <LoginButton onClick={(e) => this.props.clickHandle(e)}>{this.props.label}</LoginButton>
        )
    }
}
