import React from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OS_WINDOWS, OS_MAC } from '../../config/constants';
const os = require('os');

const Titlebar = () => {
    const currOs = os.type()
    const navigate = useNavigate();
    return (
        <>
            <Box className={currOs === OS_WINDOWS ? "title-bar title-bar_windows" : "title-bar title-bar_unix"}>
                <div className="tb-controls">
                    <Box className={currOs === OS_MAC ? "mac_back" : "tb-cntrl_windows"}
                        sx={{ visibility: window.history.length === 1 ? 'hidden' : 'inherit' }}
                        onClick={() => navigate(-1)}
                    >
                        <Button color={currOs === OS_MAC ? "primary" : "inherit"} sx={{ minWidth: currOs === OS_MAC ? 'inherit' : null }} variant={currOs === OS_MAC ? 'contained' : 'text'}>
                            {currOs === OS_MAC ?
                                <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 15 }} />
                                :
                                <ArrowBackOutlinedIcon sx={{ fontSize: 20 }} />
                            }
                        </Button>
                    </Box>
                </div>
            </Box>

        </>
    );
};

export default Titlebar;