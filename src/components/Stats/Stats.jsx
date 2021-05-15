import React from "react";
import styles from "./Stats.module.css";
import { Typography, Card, CardContent, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import classNames from "classnames";

const Stats = ({ data }) => {
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid
                    item
                    xs={12}
                    md={3}
                    component={Card}
                    className={classNames(styles.stat, styles.infected)}
                >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Infected
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={data.confirmed.value}
                                separator=","
                                duration={2}
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(data.lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Number of new cases of Covid-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={3}
                    component={Card}
                    className={classNames(styles.stat, styles.recoveries)}
                >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={data.recovered.value}
                                separator=","
                                duration={2}
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(data.lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Number of recoveries from Covid-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={3}
                    component={Card}
                    className={classNames(styles.stat, styles.deaths)}
                >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Deaths
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={data.deaths.value}
                                separator=","
                                duration={2}
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(data.lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Number of deaths caused by Covid-19
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
};

export default Stats;
