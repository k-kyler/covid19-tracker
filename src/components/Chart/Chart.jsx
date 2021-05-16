import React from "react";
import styles from "./Chart.module.css";
import { Line, Bar } from "react-chartjs-2";
import { CircularProgress } from "@material-ui/core";

const Chart = ({ data, dailyData }) => {
    const lineChart = (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ detail }) => detail.total_cases),
                        label: "Infected",
                        fill: true,
                        borderColor: "#3f51b5",
                    },
                    {
                        data: dailyData.map(({ detail }) => detail.recovered),
                        label: "Recovered",
                        fill: true,
                        borderColor: "#2ef41f",
                    },
                    {
                        data: dailyData.map(({ detail }) => detail.deaths),
                        label: "Deaths",
                        fill: true,
                        borderColor: "#f44336",
                    },
                ],
            }}
        />
    );

    const barChart = (
        <Bar
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        backgroundColor: [
                            "rgba(63, 81, 181, 0.7)",
                            "rgba(46, 244, 31, 0.7)",
                            "rgba(244, 67, 54, 0.7)",
                        ],
                        borderColor: [
                            "rgba(54, 162, 235, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(255, 99, 132, 1)",
                        ],
                        data: [data.total_cases, data.recovered, data.deaths],
                    },
                ],
                borderWidth: 1,
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );

    return (
        <>
            {dailyData && !dailyData.length ? (
                <CircularProgress />
            ) : (
                <>
                    <div className={styles.container}>{lineChart}</div>
                    <div className={styles.container}>{barChart}</div>
                </>
            )}
        </>
    );
};

export default Chart;
