import React, { Component } from "react";

import styled from "styled-components";

export default class SubLabel extends Component {

    render() {

        const SubLabel = styled.p`
            display: inline-block;
            color: #ffffff;
            font-size: 1.2rem;
            font-weight: 100;
            cursor: pointer;
            width: 308px;
            text-align: left;
            font-family: "Roboto", sans-serif;
        `;

        const SubLabel1 = styled.span`
            cursor: default;
            text-align: left;
            font-family: "Roboto", sans-serif;
            font-weight: 100;
            font-size: 16px;
        `;

        return (
            <SubLabel>
                <SubLabel1>{this.props.label1}</SubLabel1>
                <span className="sign-up-p" onClick={() => this.props.onClickHandle()}>{this.props.label2}</span>
            </SubLabel>
        )
    }
}
