import React, { Component } from "react";

import styled from "styled-components";

export default class InputLabel extends Component {

    render() {

        const InputLabel = styled.label`
            display: inline-block;
            font-size: 1.2rem;
            color: #ffffff;
            width: 300px;
            text-align: left;
            margin: 0px 0px 5px 0px;
            font-family: "Roboto", sans-serif;
        `;

        return (
            <InputLabel>{this.props.label}</InputLabel>
        )
    }
}
