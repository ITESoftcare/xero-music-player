import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import { Grid, Box, Typography, Tabs, Paper } from '@mui/material';
const Library = () => {
   const [value, setValue] = useState(0);
   var numberArray = new Array(50).fill(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <>
         <Grid container item spacing={2} xs={12}>
            <Grid item xs={12}>
               <Typography mt={4} ml={2} variant="h3">
                  My Library
               </Typography>
            </Grid>
            <Grid item xs={12}>
               <Tabs
                  sx={{ ml: 2, mb: 0 }}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
               >
                  <Tab label="Songs" />
                  <Tab label="Albums" />
                  <Tab label="Artists" />
               </Tabs>
            </Grid>
         </Grid>
         <Box
            p={2}
            display="flex"
            flexWrap="wrap"
            sx={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}
         >
            {numberArray.map((item, index) => (
               <Box m={1} className="lib-art-cont" key={index}>
                  <Paper sx={{ height: '200px', width: '200px' }}>Art {index}</Paper>
               </Box>
            ))}
         </Box>
      </>
   );
};

export default Library;
