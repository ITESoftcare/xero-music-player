import React from 'react';
import Navbar from './components/Navbar';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import Titlebar from './components/Titlebar';
import Test from './components/Test';
import Layout from './components/Layout';

const App = () => {
  initializeIcons();
  return (
   <Layout>
     Demo
   </Layout>
  );
};

export default App;