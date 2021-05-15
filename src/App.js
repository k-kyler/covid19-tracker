import { Chart, CountryPicker, Stats } from "./components";
import styles from "./App.module.css";
import { fetchGlobalData } from "./api";
import { useEffect, useState } from "react";
import { LinearProgress } from "@material-ui/core";

function App() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getGlobalData = async () => {
        const globalData = await fetchGlobalData();

        setData(globalData);
        globalData && setIsLoading(false);
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
                    <Stats data={data} />
                    <CountryPicker />
                    <Chart />
                </div>
            )}
        </>
    );
}

export default App;
