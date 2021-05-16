import axios from "axios";

const URL = "https://coronavirus-map.p.rapidapi.com/v1";

export const fetchGlobalData = async () => {
    try {
        const {
            data: { data },
        } = await axios.get(`${URL}/spots/summary`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": process.env.REACT_APP_API_HOST,
            },
        });
        const modifiedGlobalData = Object.entries(data).map(
            ([date, detail]) => ({
                date,
                detail,
            })
        );
        const {
            date,
            detail: { total_cases, recovered, deaths },
        } = modifiedGlobalData[0];

        return {
            total_cases,
            deaths,
            recovered,
            date,
        };
    } catch (error) {
        console.error(error);
    }
};

export const fetchRegions = async () => {
    try {
        const {
            data: {
                data: { regions },
            },
        } = await axios.get(`${URL}/summary/latest`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": process.env.REACT_APP_API_HOST,
            },
        });
        const modifiedRegions = Object.entries(regions)
            .map(([key, detail]) => ({ key, detail }))
            .map(({ detail: { name } }) => ({ name }));

        return modifiedRegions;
    } catch (error) {
        console.error(error);
    }
};

export const fetchGlobalDailyData = async () => {
    try {
        const {
            data: { data },
        } = await axios.get(`${URL}/spots/summary`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": process.env.REACT_APP_API_HOST,
            },
        });
        const modifiedGlobalDailyData = Object.entries(data).map(
            ([date, detail]) => ({
                date,
                detail,
            })
        );

        return modifiedGlobalDailyData.reverse();
    } catch (error) {
        console.error(error);
    }
};

export const fetchRegionDailyData = async (region) => {
    try {
        const {
            data: { data },
        } = await axios.get(`${URL}/spots/year`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": process.env.REACT_APP_API_HOST,
            },
            params: {
                region: region,
            },
        });
        const modifiedRegionData = Object.entries(data).map(
            ([date, detail]) => ({
                date,
                detail,
            })
        );
        const {
            date,
            detail: { total_cases, recovered, deaths },
        } = modifiedRegionData[0];
        const modifiedRegionDailyData = Object.entries(data).map(
            ([date, detail]) => ({
                date,
                detail,
            })
        );

        return {
            total_cases,
            recovered,
            deaths,
            date,
            daily: modifiedRegionDailyData.reverse(),
        };
    } catch (error) {
        console.error(error);
    }
};
