import React from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { sendMessageToNode } from '../../main/utils/renProcess';
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

                        <div className="traffic-light">
                            <div onClick={() => sendMessageToNode('closeWindow')} className="close-unix">close</div>
                            <div onClick={() => sendMessageToNode('minimize')} className="mini-unix">minimise</div>
                            <div onClick={() => sendMessageToNode('maximize')} className="res-unix">resize</div>
                        </div>
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