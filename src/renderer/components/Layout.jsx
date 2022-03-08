import React, { useContext, useEffect, useState } from 'react';
import Titlebar from './Titlebar';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import {
   Card,
   CardContent,
   Grid,
   ListItem,
   ListItemIcon,
   ListItemText,
   ListSubheader,
   Switch,
   Tab,
   Tabs,
   Typography,
   useMediaQuery,
   useTheme,
} from '@mui/material';
import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import { store } from '../utils/store';
import { APP_NAME, APP_VERSION } from '../../config/constants';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AdbOutlinedIcon from '@mui/icons-material/AdbOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PlayBar from './PlayBar';

const drawerWidth = 360;

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
   ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
         position: 'relative',
         whiteSpace: 'nowrap',
         width: drawerWidth,
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
         boxSizing: 'border-box',
         ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
               easing: theme.transitions.easing.sharp,
               duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
               width: theme.spacing(9),
            },
         }),
      },
   })
);

function Layout() {
   const [open, setOpen] = useState(true);
   const { state, dispatch } = useContext(store);
   const toggleDrawer = () => setOpen(!open);
   const theme = useTheme();
   const isPortable = useMediaQuery(theme.breakpoints.down('md'));

   useEffect(() => {
      if (isPortable) {
         setOpen(false);
      }
   }, [isPortable]);

   const [value, setValue] = useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <>
         <Titlebar />
         <Box sx={{ display: 'flex' }}>
            <Drawer
               variant="permanent"
               sx={{ maxHeight: '100vh' }}
               PaperProps={{ style: { borderRadius: `0 12px 12px 0`, paddingTop: 25 } }}
               open={open}
            >
               <Toolbar sx={{ pl: '28px !important' }}>
                  <IconButton
                     edge="start"
                     color="inherit"
                     aria-label="open drawer"
                     onClick={toggleDrawer}
                  >
                     <MenuOutlinedIcon />
                  </IconButton>
               </Toolbar>
               <List sx={{ p: 1 }}>
                  <ListSubheader sx={{ mt: -2.6 }} inset={open ? false : true}>
                     {APP_NAME} {APP_VERSION}
                  </ListSubheader>
                  <CustomLink to="/main_window">
                     <ListItemIcon>
                        <LibraryMusicOutlinedIcon />
                     </ListItemIcon>
                     <ListItemText primary="Library" />
                  </CustomLink>
                  <CustomLink to="/main_window/search">
                     <ListItemIcon>
                        <SearchOutlinedIcon />
                     </ListItemIcon>
                     <ListItemText primary="Search" />
                  </CustomLink>
                  <CustomLink to="/main_window/eq">
                     <ListItemIcon>
                        <AdbOutlinedIcon />
                     </ListItemIcon>
                     <ListItemText primary="Equalizer" />
                  </CustomLink>
               </List>
               <List sx={{ mt: 'auto', p: 1 }}>
                  <ListItem
                     button
                     sx={{ borderRadius: 15, mb: 1 }}
                     onClick={() => dispatch({ type: 'SET_THEME', payload: !state.isLightTheme })}
                  >
                     <ListItemIcon>
                        <AdbOutlinedIcon />
                     </ListItemIcon>
                     <ListItemText primary="Dark Mode" />
                     <Switch
                        edge="end"
                        checked={!state.isLightTheme}
                        onChange={() =>
                           dispatch({ type: 'SET_THEME', payload: !state.isLightTheme })
                        }
                        inputProps={{
                           'aria-labelledby': 'theme-toggle',
                        }}
                     />
                  </ListItem>
                  <CustomLink to="/brunch-pwa/settings">
                     <ListItemIcon>
                        <SettingsOutlinedIcon />
                     </ListItemIcon>
                     <ListItemText primary="Settings" />
                  </CustomLink>
               </List>
            </Drawer>

            <Grid component="main" container sx={{ maxHeight: '100vh' }}>
               <Grid container item xs={12} /* sx={{ mb: -20 }} */>
                  <Outlet />
               </Grid>
               <Grid container item spacing={2} xs={12} sx={{ mt: -22, height: 160, zIndex: 1 }}>
                  <PlayBar />
               </Grid>
            </Grid>
         </Box>
      </>
   );
}

function CustomLink({ children, to, ...props }) {
   let resolved = useResolvedPath(to);
   let match = useMatch({ path: resolved.pathname, end: true });

   return (
      <ListItem
         component={Link}
         button
         sx={{ borderRadius: 15, mb: 1 }}
         selected={!!match}
         to={to}
         {...props}
      >
         {children}
      </ListItem>
   );
}

export default Layout;
