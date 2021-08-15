import React from 'react';
import Test from './Test';
import Titlebar from './Titlebar';

const Layout = ({ children }) => {
    return (
        <div class="container-fluid">
            <Titlebar />
            <div class="row flex-nowrap">
                <Test />
                <div style={{ marginTop: '30px' }} class="col py-3">
                    {children}
                    Content area...
                </div>
            </div>
        </div>

    );
};

export default Layout;