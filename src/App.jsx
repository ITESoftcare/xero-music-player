import React, { useContext, useEffect } from 'react';
import { store } from './renderer/utils/store';
import { getTheme } from './renderer/utils/LocStoreUtil';
import { useRoutes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import routes from './renderer/utils/routes';

const getDesignTokens = mode => ({
   palette: {
      mode,
      primary: {
         main: '#ad3fa9',
      },
      secondary: {
         main: '#B76C6C',
      },
      background: {
         ...(mode === 'dark'
            ? {
                 default: '#131313',
                 paper: '#272727',
              }
            : {
                 default: '#f2f2f2',
                 paper: '#fff',
              }),
      },
      text: {
         ...(mode === 'dark'
            ? {
                 primary: '#ffffff',
              }
            : {
                 primary: '#000000',
              }),
      },
   },
   props: {
      MuiAppBar: {
         color: 'default',
      },
   },
   shape: {
      borderRadius: 12,
   },
});

const App = () => {
   const { state, dispatch } = useContext(store);
   const currTheme = getTheme();
   let themePref = currTheme ? 'light' : 'dark';
   let element = useRoutes(routes);
   const darkModeTheme = createTheme(getDesignTokens(themePref));

   useEffect(() => {
      if (currTheme === undefined) {
         dispatch({ type: 'SET_THEME', payload: true });
      } else {
         dispatch({ type: 'SET_THEME', payload: currTheme });
      }
   }, [currTheme, dispatch]);

   return (
      <ThemeProvider theme={darkModeTheme}>
         <CssBaseline />
         {element}
      </ThemeProvider>
   );
};

export default App;
