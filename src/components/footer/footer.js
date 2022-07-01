import React, { Component } from "react";

import styled from "styled-components";

export default class Footer extends Component {

    render() {
        const Footer = styled.div`
            position: fixed;
            background: #171A20;
            bottom: 0;
            width: 100%;        
        `;

        const FooterLabel = styled.p`
            color: #ffffff;
            text-align: center;
            font-family: "Roboto", sans-serif;        
        `;

        const Link = styled.a`
            text-decoration: none !important;
            color: #00a2ed;
        `;

        return (
            <Footer>
                <FooterLabel>Copyright (C) {new Date().getFullYear()} <Link href="https://bitcoin.com">Bitcoin.com</Link> All Rights Reserved.</FooterLabel>
            </Footer>
        )
    }
}
