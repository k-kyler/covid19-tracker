import React, { useState, useEffect } from "react";
import styles from "./CountryPicker.module.css";
import { FormControl, NativeSelect } from "@material-ui/core";
import { fetchCountries } from "../../api";

const CountryPicker = () => {
    const [countries, setCountries] = useState([]);

    const getCountries = async () => {
        const fetchedCountries = await fetchCountries();

        if (fetchedCountries && fetchedCountries.length)
            setCountries(fetchedCountries);
    };

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect>
                <option value="global">Global</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;
