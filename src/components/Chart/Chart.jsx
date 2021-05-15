import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import { fetchGlobalStatistic } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { CircularProgress } from "@material-ui/core";

const Chart = () => {
    const [statisticData, setStatisticData] = useState([]);
    const [chartLoading, setChartLoading] = useState(true);

    const lineChart = chartLoading ? (
        <CircularProgress />
    ) : (
        <Line
            data={{
                labels: dailyData.map(({ reportDate }) => reportDate),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed.total),
                        label: "Infected",
                        fill: true,
                        borderColor: "#3f51b5",
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths.total),
                        label: "Deaths",
                        fill: true,
                        borderColor: "#f44336",
                        backgroundColor: "rgba(255, 0, 0, 0.3)",
                    },
                ],
            }}
        />
    );

    const getGlobalStatistic = async () => {
        const fetchedGlobalStatistic = await fetchGlobalStatistic();

        if (fetchedGlobalStatistic && fetchedGlobalStatistic.length) {
            // setStatisticData(fetchedGlobalStatistic);
            setChartLoading(false);
        }
    };

    useEffect(() => {
        getGlobalStatistic();
    }, []);

    return <div className={styles.container}></div>;
};

export default Chart;
