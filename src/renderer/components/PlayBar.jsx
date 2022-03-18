import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import { Card, Grid, Hidden, Paper } from '@mui/material';
import DiscordIcon from 'svg-react-loader?name=DiscordIcon!../../img/discord-logo.svg';
import { RepeatRounded, ShuffleRounded } from '@mui/icons-material';
import { sendMessageToNode } from '../../main/utils/renProcess';

const CoverImage = styled('div')({
   width: 140,
   height: 140,
   margin: 10,
   objectFit: 'cover',
   overflow: 'hidden',
   flexShrink: 0,
   borderRadius: 8,
   //    backgroundColor: 'rgba(0,0,0,0.08)',
   '& > img': {
      width: '100%',
   },
});

const TinyText = styled(Typography)({
   fontSize: '0.75rem',
   opacity: 0.38,
   fontWeight: 500,
   letterSpacing: 0.2,
});

export default function PlayBar() {
   const theme = useTheme();
   const duration = 200; // seconds
   const [position, setPosition] = React.useState(32);
   const [paused, setPaused] = React.useState(false);
   function formatDuration(value) {
      const minute = Math.floor(value / 60);
      const secondLeft = value - minute * 60;
      return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
   }
   const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
   const lightIconColor =
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
   return (
      <Grid
         container
         //  direction="column"
         //  alignh6s="center"
         //  justify="center"
         sx={{
            marginInline: 4,
            marginBottom: 2,
            backdropFilter: 'blur(40px)',
            backgroundColor:
               theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
         }}
         elevation={3}
         component={Card}
      >
         <Grid item xs={6}>
            {/* <CoverImage>
               <img alt="Cover" src="https://source.unsplash.com/random/500x500" />
            </CoverImage> */}
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
               <Hidden mdDown>
                  <CoverImage>
                     <img
                        alt="can't win - Chilling Sunday"
                        src="https://source.unsplash.com/random/500x500"
                     />
                  </CoverImage>
               </Hidden>
               <Box sx={{ ml: 1.5, minWidth: 0 }}>
                  <Typography variant="h6" component="h6" noWrap>
                     <b>Fallen Angel</b>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontWeight={500}>
                     Three Days Grace
                  </Typography>
                  <Typography noWrap>Human (2020)</Typography>
               </Box>
            </Box>
         </Grid>
         <Grid justifyContent="center" alignContent="center" item xs={5}>
            <Box marginInline={3} mt={2}>
               <Slider
                  aria-label="time-indicator"
                  size="small"
                  value={position}
                  min={0}
                  step={1}
                  max={duration}
                  onChange={(_, value) => setPosition(value)}
                  sx={{
                     color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                     '& .MuiSlider-track': {
                        border: 'none',
                     },
                     height: 4,
                     '& .MuiSlider-thumb': {
                        width: 20,
                        height: 20,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&:before': {
                           boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                           boxShadow: `0px 0px 0px 8px ${
                              theme.palette.mode === 'dark'
                                 ? 'rgb(255 255 255 / 16%)'
                                 : 'rgb(0 0 0 / 16%)'
                           }`,
                        },
                        '&.Mui-active': {
                           width: 20,
                           height: 20,
                        },
                     },
                     '& .MuiSlider-rail': {
                        opacity: 0.28,
                     },
                  }}
               />
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     mt: -2,
                  }}
               >
                  <TinyText>{formatDuration(position)}</TinyText>
                  <TinyText>-{formatDuration(duration - position)}</TinyText>
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     mt: -1,
                  }}
               >
                  <IconButton aria-label="previous song">
                     <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                  </IconButton>
                  <IconButton
                     aria-label={paused ? 'play' : 'pause'}
                     onClick={() => setPaused(!paused)}
                  >
                     {paused ? (
                        <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                     ) : (
                        <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                     )}
                  </IconButton>
                  <IconButton aria-label="next song">
                     <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                  </IconButton>
               </Box>
               <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1, px: 1, width: '50%', marginInline: 'auto' }}
                  alignItems="center"
               >
                  <VolumeDownRounded htmlColor={lightIconColor} />
                  <Slider
                     aria-label="Volume"
                     defaultValue={30}
                     sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        '& .MuiSlider-track': {
                           border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                           width: 15,
                           height: 15,
                           backgroundColor: '#fff',
                           '&:before': {
                              boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                           },
                           '&:hover, &.Mui-focusVisible, &.Mui-active': {
                              boxShadow: 'none',
                           },
                        },
                     }}
                  />
                  <VolumeUpRounded htmlColor={lightIconColor} />
               </Stack>
            </Box>
         </Grid>
         <Grid item xs={1} direction="row">
            <Box m={2}>
               <IconButton aria-label="shuffle">
                  <ShuffleRounded />
               </IconButton>
               <IconButton aria-label="repeat">
                  <RepeatRounded />
               </IconButton>
               <IconButton
                  onClick={() => sendMessageToNode('show-file-picker', { title: 'add-to-playlist' })}
                  aria-label="discord visibility"
               >
                  <DiscordIcon style={{ width: 25, height: 25 }} />
               </IconButton>
            </Box>
         </Grid>
      </Grid>
   );
}
