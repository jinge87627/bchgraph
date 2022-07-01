import React, { Component } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    YAxis,
    XAxis,
    Tooltip
} from "recharts";

import styled from "styled-components";

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div>
                {
                    payload !== null && payload[0] !== undefined &&
                    <p style={{ color: "#fafbff" }}>{`${"$" + payload[0].value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                }
            </div>
        );
    }
    return null;
};

export default class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphData: this.props.graphData,
            minPrice: this.getMinPrice(this.props.graphData),
            maxPrice: this.getMaxPrice(this.props.graphData)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.graphData !== this.props.graphData) {
            this.setState({
                graphData: nextProps.graphData,
                minPrice: this.getMinPrice(nextProps.graphData),
                maxPrice: this.getMaxPrice(nextProps.graphData)
            });
        }
    }

    getMinPrice(datas) {
        if (datas.length > 0) {
            let minPrice = datas[0].price;
            datas.forEach(data => {
                if (minPrice > data.price) {
                    minPrice = data.price;
                }
            });
            return minPrice - 50;
        }
        return 0;
    }

    getMaxPrice(datas) {
        if (datas.length > 0) {
            let maxPrice = datas[0].price;
            datas.forEach(data => {
                if (maxPrice < data.price) {
                    maxPrice = data.price;
                }
            });
            return maxPrice + 50;
        }
        return 25000;
    }

    render() {
        const GraphContainer = styled.div`
            width: 90%;        
            text-align: center;
            margin: auto;
            margin-top: 20px;
        `;

        return (
            <GraphContainer>
                <ResponsiveContainer width="100%" minWidth={500} height={500}>
                    <ComposedChart
                        data={this.state.graphData}
                    >
                        <YAxis domain={[this.state.minPrice, this.state.maxPrice]} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                        />
                        <Tooltip content={<CustomTooltip />} />
                    </ComposedChart>
                </ResponsiveContainer>
            </GraphContainer>
        )
    }
}
