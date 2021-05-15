import { Stats, CountryPicker, Chart } from "./components";
import styles from "./App.module.css";
import { fetchGlobalData } from "./api";
import { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@material-ui/core";
import Logo from "./assets/virus.svg";

function App() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getGlobalData = async () => {
        const globalData = await fetchGlobalData();

        if (globalData) {
            setData(globalData);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getGlobalData();
    }, []);

    return (
        <>
            {isLoading ? (
                <LinearProgress />
            ) : (
                <div className={styles.container}>
                    <div className={styles.title}>
                        <img src={Logo} />
                        <Typography variant="h3">Covid-19 Tracker</Typography>
                    </div>
                    <Typography variant="h5" color="textSecondary">
                        {new Date(data.lastReported).toDateString()}
                    </Typography>
                    <Stats data={data} />
                    <CountryPicker />
                    <Chart />
                </div>
            )}
        </>
    );
}

export default App;
