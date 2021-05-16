import { Stats, CountryPicker, Chart } from "./components";
import styles from "./App.module.css";
import {
    fetchGlobalData,
    fetchGlobalDailyData,
    fetchRegionDailyData,
} from "./api";
import { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@material-ui/core";
import Logo from "./assets/virus.svg";

function App() {
    const [data, setData] = useState({});
    const [dailyData, setDailyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [region, setRegion] = useState("");

    const getGlobalData = async () => {
        const globalData = await fetchGlobalData();

        if (globalData) {
            setData(globalData);
            setIsLoading(false);
        }
    };

    const getGlobalDailyData = async () => {
        const globalDailyData = await fetchGlobalDailyData();

        if (globalDailyData && globalDailyData.length)
            setDailyData(globalDailyData);
    };

    const getRegionDailyData = async (re) => {
        const { daily, total_cases, recovered, deaths, date } =
            await fetchRegionDailyData(re);

        if (daily && daily.length) setDailyData(daily);
        setData({ total_cases, recovered, deaths, date });
    };

    const onChangeRegionHandler = (re) => {
        setRegion(re);
    };

    useEffect(() => {
        getGlobalData();
        getGlobalDailyData();
    }, []);

    useEffect(() => {
        if (region) getRegionDailyData(region);
    }, [region]);

    return (
        <>
            {isLoading ? (
                <LinearProgress className={styles.pageLoading} />
            ) : (
                <div className={styles.container}>
                    <div className={styles.title}>
                        <img src={Logo} />
                        <Typography variant="h3">Covid-19 Tracker</Typography>
                    </div>
                    <Typography variant="h5" color="textSecondary">
                        {new Date(data.date).toDateString()}
                    </Typography>
                    <Stats data={data} />
                    <CountryPicker
                        onChangeRegionHandler={onChangeRegionHandler}
                    />
                    <Chart data={data} dailyData={dailyData} />
                </div>
            )}
        </>
    );
}

export default App;
