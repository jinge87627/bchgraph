import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styled from "styled-components";

export default class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latestPosts: this.props.latestPosts
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.latestPosts !== this.props.latestPosts) {
            this.setState({
                latestPosts: nextProps.latestPosts
            });
        }
    }

    clickPost(href) {
        window.open(href, '_blank');
    }

    render() {

        const PostDiv = styled.div`
            width: 90%;
            margin: auto;
            margin-top: 30px;
            margin-bottom: 150px;
        `;

        const Post = styled.div`
            width: 100%;
            margin-left: 2%;
            margin-right: 2%;
            margin-bottom: 20px;
            display: inline-block;
            border: 1px solid #00a2ed;
            border-radius: 15px;
            cursor: pointer;
        `;

        const PostImage = styled.img`
            width: 100%;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
        `;

        const PostTitle = styled.p`
            color: #fafbff;
            font-size: 1rem;
            margin-top: 10px;
        `;

        const PostTitleDiv = styled.div`
            width: 100%;
            height: 120px;
        `;

        return (
            <PostDiv>
                <Container>
                    <Row>
                        {
                            this.state.latestPosts.map((post, index) =>
                                <Col xl={3} lg={4} md={6} sm={12}>
                                    <Post key={index} onClick={() => this.clickPost(post.href)}>
                                        <PostImage src={post.thumbnail} alt="postimage" />
                                        <PostTitleDiv>
                                            <PostTitle>{post.title}</PostTitle>
                                        </PostTitleDiv>
                                    </Post>
                                </Col>
                            )
                        }
                    </Row>

                </Container>
            </PostDiv>
        )
    }
}
