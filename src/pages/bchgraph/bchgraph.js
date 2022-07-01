import React, { Component } from "react";
import axios from 'axios';

// Custom components
import Title from '../../components/title/title';
import Footer from '../../components/footer/footer';
import Logout from "../../components/logout/logout";
import TimeRange from "../../components/timerange/timerange";
import Graph from "../../components/graph/graph";

export default class Bchgraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeRange: "day", // ["day", "week", "month"]
            graphData: [],
            historicalPricesDay: [],
            historicalPricesWeek: [],
            historicalPricesMonth: [],
            currentSpotPrice: "----",
            latestPosts: []
        };
    }

    componentDidMount() {
        let historicalPricesDay = [], promises = [];
        let timestamp = new Date();
        timestamp.setUTCHours(0, 0, 0, 0);
        timestamp.setDate(timestamp.getDate() - 1);
        Array.from(Array(24).keys()).forEach(item => {
            timestamp.setHours(timestamp.getHours() + 1, 0, 0, 0);
            promises.push(
                axios.get(process.env.REACT_APP_LOOKUP_PRICE_URL + timestamp.toISOString())
                    .then((res) => {
                        historicalPricesDay.push([
                            res.data.lookup.time.iso,
                            res.data.lookup.price
                        ])
                    })
            )
        })

        Promise.all(promises).then(() => {
            historicalPricesDay = historicalPricesDay.sort(this.compareTimestamp);
            this.setState({
                graphData: this.makeGraphData(historicalPricesDay, "day"),
                historicalPricesDay: this.makeGraphData(historicalPricesDay, "day")
            });
        });

        axios.get(process.env.REACT_APP_HISTORICAL_PRICE_URL)
            .then((res) => {
                this.setState({
                    historicalPricesMonth: this.makeGraphData(res.data.slice(0, 30).reverse(), "week"),
                    historicalPricesWeek: this.makeGraphData(res.data.slice(0, 7).reverse(), "month")
                });
            });
        axios.get(process.env.REACT_APP_CURRENT_SPOT_PRICE_URL)
            .then((res) => {
                this.setState({
                    currentSpotPrice: this.convertPriceWithComma(res.data.price)
                }, () => {
                    setInterval(() => {
                        axios.get(process.env.REACT_APP_CURRENT_SPOT_PRICE_URL)
                            .then((res) => {
                                this.setState({
                                    currentSpotPrice: this.convertPriceWithComma(res.data.price)
                                });
                            });
                    }, 60000);
                });
            });
        fetch(process.env.REACT_APP_LATEST_POSTS_URL)
            .then((res) => {
                res.json();
            })
            .then((data) => {
                console.log(data)
            });
    }

    logOut() {
        localStorage.removeItem("email");
        window.location.reload();
    }

    changeRange(range) {
        this.setState({
            timeRange: range
        }, () => {
            switch (range) {
                case "day":
                    this.setState({
                        graphData: this.state.historicalPricesDay
                    });
                    break;
                case "week":
                    this.setState({
                        graphData: this.state.historicalPricesWeek
                    });
                    break;
                case "month":
                    this.setState({
                        graphData: this.state.historicalPricesMonth
                    });
                    break;
                default:
                    break;
            }
        });
    }

    makeGraphData(data, range) {
        let graphData = [];
        for (let i = 0; i < data.length; i++) {
            let time = "";
            if (range === "day") {
                time = new Date(data[i][0]).getDate() + "/" + (new Date(data[i][0]).getMonth() + 1) + " " + new Date(data[i][0]).getHours() + ":00";
            } else {
                time = new Date(data[i][0]).getDate() + "/" + (new Date(data[i][0]).getMonth() + 1);
            }
            graphData.push({
                time: time,
                price: data[i][1]
            });
        }
        return graphData;
    }

    compareTimestamp(a, b) {
        if (a[0] > b[0]) {
            return 1;
        }
        return 0;
    }

    convertPriceWithComma(price) {
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {

        return (

            <div ref={el => (this.div = el)}>
                <Title
                    title="BCH Graph"
                    subtitle={"Current Spot Price: $" + this.state.currentSpotPrice + "  (Refreshes in Every Minute)"}
                />
                <Logout logOut={() => this.logOut()} />
                <TimeRange
                    timeRange={this.state.timeRange}
                    changeRange={(range) => this.changeRange(range)}
                />
                <Graph
                    graphData={this.state.graphData}
                />
                <Footer />
            </div>
        )
    }
}
