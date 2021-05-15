import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { CircularProgress } from "@material-ui/core";

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);
    const [chartLoading, setChartLoading] = useState(true);

    const chart = chartLoading ? (
        <CircularProgress />
    ) : (
        <Line
            data={{
                label: "",
                datasets: [{}, {}],
            }}
        />
    );

    const getDailyData = async () => {
        const fetchedDailyData = await fetchDailyData();

        setDailyData(fetchedDailyData);
        fetchedDailyData && setChartLoading(false);
    };

    useEffect(() => {
        getDailyData();
    }, [dailyData]);

    return <div>Chart</div>;
};

export default Chart;
