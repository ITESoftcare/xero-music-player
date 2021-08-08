import React from 'react';
import Navbar from './components/Navbar';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import Titlebar from './components/Titlebar';
import Test from './components/Test';

const App = () => {
  initializeIcons();
  return (
    <>
      <Titlebar />
      <Test />
        {/* <Navbar /> */}
    </>
  );
};

export default App;