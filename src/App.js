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
    const [region, setRegion] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [onChangeLoading, setOnChangeLoading] = useState(false);

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

    const getRegionDataAndDailyData = async (re) => {
        const { daily, total_cases, recovered, deaths, date } =
            await fetchRegionDailyData(re);

        if (daily && daily.length) setDailyData(daily);
        setData({ total_cases, recovered, deaths, date });
        if (data && daily) setOnChangeLoading(false);
    };

    const onChangeRegionHandler = (re) => {
        setRegion(re);
        setOnChangeLoading(true);
    };

    useEffect(() => {
        getGlobalData();
        getGlobalDailyData();
    }, []);

    useEffect(() => {
        if (region) getRegionDataAndDailyData(region);
    }, [region]);

    return (
        <>
            {isLoading ? (
                <LinearProgress className={styles.pageLoading} />
            ) : (
                <>
                    {onChangeLoading && (
                        <LinearProgress className={styles.pageLoading} />
                    )}

                    <div className={styles.container}>
                        <div className={styles.title}>
                            <img src={Logo} />
                            <Typography variant="h3">
                                Covid-19 Tracker
                            </Typography>
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
                </>
            )}
        </>
    );
}

export default App;
