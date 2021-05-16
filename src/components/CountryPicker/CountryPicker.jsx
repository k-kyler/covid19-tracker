import React, { useState, useEffect } from "react";
import styles from "./CountryPicker.module.css";
import { FormControl, NativeSelect } from "@material-ui/core";
import { fetchRegions } from "../../api";

const CountryPicker = ({ onChangeRegionHandler }) => {
    const [regions, setRegions] = useState([]);

    const getRegions = async () => {
        const regionsData = await fetchRegions();

        if (regionsData && regionsData.length) setRegions(regionsData);
    };

    useEffect(() => {
        getRegions();
    }, []);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect
                defaultValue=""
                onChange={(e) => onChangeRegionHandler(e.target.value)}
            >
                <option value="">Global</option>
                {regions.map((region, index) => (
                    <option key={index} value={region.name}>
                        {region.name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;
