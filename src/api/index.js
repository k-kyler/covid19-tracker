import axios from "axios";

const URL = "https://covid19.mathdro.id/api";

export const fetchGlobalData = async () => {
    try {
        const {
            data: { confirmed, deaths, recovered, lastUpdate },
        } = await axios.get(URL);

        return {
            confirmed,
            deaths,
            recovered,
            lastUpdate,
        };
    } catch (error) {
        console.error(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${URL}/daily`);

        return data;
    } catch (error) {
        console.error(error);
    }
};
