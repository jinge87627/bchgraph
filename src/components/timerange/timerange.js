import React, { Component } from "react";

import styled from "styled-components";

export default class TimeRange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeRange: this.props.timeRange
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timeRange !== this.props.timeRange) {
            this.setState({
                timeRange: nextProps.timeRange
            });
        }
    }

    render() {

        const ButtonGroup = styled.div`
            text-align: center;
            margin-top: 70px;
        `;

        const TimeRangeBtn = styled.button`
            width: 200px;
            height: 45px;
            color: #ffffff;
            margin: 5px;
            padding: 0;
            background: transparent;
            border: 1px solid #00a2ed;
            border-radius: 12px;
            font-size: 1.2rem;
            font-family: "Roboto", sans-serif;
            font-weight: 600;
            cursor: pointer;
            display: inline-block;
        `;

        const ActiveTimeRangeBtn = styled(TimeRangeBtn)`
            background: #00a2ed !important;
        `;

        return (
            <>
                {
                    this.state.timeRange === "day" &&
                    <ButtonGroup>
                        <ActiveTimeRangeBtn onClick={() => this.props.changeRange("day")}>24 Hours</ActiveTimeRangeBtn>
                        <TimeRangeBtn onClick={() => this.props.changeRange("week")}>7 Days</TimeRangeBtn>
                        <TimeRangeBtn onClick={() => this.props.changeRange("month")}>1 Month</TimeRangeBtn>
                    </ButtonGroup>
                }
                {
                    this.state.timeRange === "week" &&
                    <ButtonGroup>
                        <TimeRangeBtn onClick={() => this.props.changeRange("day")}>24 Hours</TimeRangeBtn>
                        <ActiveTimeRangeBtn onClick={() => this.props.changeRange("week")}>7 Days</ActiveTimeRangeBtn>
                        <TimeRangeBtn onClick={() => this.props.changeRange("month")}>1 Month</TimeRangeBtn>
                    </ButtonGroup>
                }
                {
                    this.state.timeRange === "month" &&
                    <ButtonGroup>
                        <TimeRangeBtn onClick={() => this.props.changeRange("day")}>24 Hours</TimeRangeBtn>
                        <TimeRangeBtn onClick={() => this.props.changeRange("week")}>7 Days</TimeRangeBtn>
                        <ActiveTimeRangeBtn onClick={() => this.props.changeRange("month")}>1 Month</ActiveTimeRangeBtn>
                    </ButtonGroup>
                }
            </>
        )
    }
}
