import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { sendMessageToNode } from '../../main/utils/renProcess';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { OS_WINDOWS, OS_MAC } from '../../config/constants';
const os = require('os');

const Titlebar = () => {
    const currOs = os.type()
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(window.isMaximized());
    return (
        <>
            <Box className={currOs === OS_WINDOWS ? "title-bar title-bar_windows" : "title-bar title-bar_unix"}>
                {/* <Stack direction="row" spacing={1}>
                    <IconButton>
                        <CloseOutlinedIcon style={{ fontSize: 10 }} />
                    </IconButton>
                    <IconButton>
                        <CloseOutlinedIcon style={{ fontSize: 10 }} />
                    </IconButton>
                    <IconButton>
                        <CloseOutlinedIcon style={{ fontSize: 10 }} />
                    </IconButton>
                </Stack> */}
                <div className="tb-controls">
                    <Box className={currOs === OS_MAC ? "mac_back" : "tb-cntrl_back"}
                        sx={{ visibility: window.history.length === 1 ? 'hidden' : 'inherit' }}
                        onClick={() => navigate(-1)}

                    >
                        <Button color={currOs === OS_MAC ? "primary": "inherit"} sx={{minWidth: currOs === OS_MAC ? 'inherit': null}} variant={currOs === OS_MAC ? 'contained' : 'text'}>
                        {currOs === OS_MAC ?
                            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 15 }} />
                            :
                            <ArrowBackOutlinedIcon sx={{ fontSize: 20 }} />
                        }
                        </Button>
                    </Box>
                </div>
                <div class="tb-controls">
                    {/* <div class="tb-cntrl"
                        onClick={() => sendMessageToNode('minimize')}
                    >
                        <RemoveOutlinedIcon sx={{ fontSize: 20 }} />
                    </div>
                    <div class="tb-cntrl"
                        onClick={() => sendMessageToNode('maximize')}
                    >
                        <CheckBoxOutlineBlankOutlinedIcon style={{ fontSize: 14 }} />
                    </div>
                    <div id="closeWindow" className="tb-cntrl"
                        onClick={() => sendMessageToNode('closeWindow')}
                    >
                        <CloseOutlinedIcon sx={{ fontSize: 20 }} />
                    </div> */}
                </div>
            </Box>

        </>
    );
};

export default Titlebar;