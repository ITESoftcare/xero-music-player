import React from 'react';
import { ChromeCloseIcon, ChromeMinimizeIcon, CheckboxIcon } from '@fluentui/react-icons-mdl2';
const Titlebar = () => {
    return (
        <div class="title-bar fixed-top bg-dark text-white">
            <div class="left">
                <img id="logo" src="" />
                <span style={{fontSize:12}}>Xero Music Player</span>
                {/* <p style={{ marginLeft: '10px' }}>XeroPlayer</p> */}
            </div>
            <div class="tb-controls">
                <div class="tb-cntrl">
                    <ChromeMinimizeIcon style={{fontSize: 10}} />
                </div>
                <div class="tb-cntrl">
                    <CheckboxIcon style={{fontSize: 10}} />
                </div>
                <div id="closeWindow" className="tb-cntrl">
                    <ChromeCloseIcon style={{fontSize: 10}} />
                </div>
            </div>
        </div>
    );
};

export default Titlebar;