import axios from "axios";

// const URL = "https://covid19.mathdro.id/api";
const URL = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1";

export const fetchGlobalData = async () => {
    try {
        // const {
        //     data: { confirmed, deaths, recovered, lastUpdate },
        // } = await axios.get(URL);

        // return {
        //     confirmed,
        //     deaths,
        //     recovered,
        //     lastUpdate,
        // };

        const {
            data: {
                data: { confirmed, deaths, recovered, lastReported },
            },
        } = await axios.get(`${URL}/total`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": process.env.REACT_APP_API_HOST,
            },
        });

        return {
            confirmed,
            deaths,
            recovered,
            lastReported,
        };
    } catch (error) {
        console.error(error);
    }
};

export const fetchGlobalStatistic = async () => {
    try {
        // const { data } = await axios.get(`${URL}/daily`);

        // return data;

        const {
            data: {
                data: { covid19Stats },
            },
        } = await axios.get(`${URL}/stats`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": process.env.REACT_APP_API_HOST,
            },
        });

        console.log(covid19Stats);
    } catch (error) {
        console.error(error);
    }
};

export const fetchCountries = async () => {
    try {
        // const { data } = await axios.get(`${URL}/countries`);

        // return data;

        const {
            data: {
                data: { covid19Stats },
            },
        } = await axios.get(`${URL}/stats`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": process.env.REACT_APP_API_HOST,
            },
        });

        return covid19Stats.reduce(
            (accumulator, { country }) =>
                accumulator.includes(country)
                    ? accumulator
                    : [...accumulator, country],
            []
        );
    } catch (error) {
        console.error(error);
    }
};
