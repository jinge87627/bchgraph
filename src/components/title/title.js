import React, { Component } from "react";

import styled from "styled-components";

export default class Title extends Component {

    render() {
        const Title = styled.h1`
            color: #ffffff;
            text-align: center;
            font-size: 3rem;
            font-family: "Roboto", sans-serif;
            font-weight: bold;
        `;

        const SubTitle = styled(Title)`
            font-size: 1.5rem;
            font-weight: 300;
        `;

        return (
            <>
                <Title>{this.props.title}</Title>
                <SubTitle>{this.props.subtitle}</SubTitle>
            </>
        )
    }
}
