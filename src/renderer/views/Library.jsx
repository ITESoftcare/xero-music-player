import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import { Grid, Box, Typography, Tabs } from "@mui/material"
const Library = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container item spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h3">My Library</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Songs" />
                        <Tab label="Albums" />
                        <Tab label="Artists" />
                    </Tabs>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Library;