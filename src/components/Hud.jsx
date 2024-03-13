import { Box, Button, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import { Image } from 'mui-image';
import useGameStore from '../store/store';

export const Hud = () => {
  const { targetsRemaining, speed, turboing, gameRunning, music, setMusic, sound, setSound } = useGameStore();
  let airplaneSpeed = '100';
  if (speed < '0.001') {
    airplaneSpeed = '50';
  }
  if (turboing) {
    airplaneSpeed = '200';
  }

  const toggleMusic = () => {
    setMusic(!music);
  };

  const toggleSound = () => {
    setSound(!sound);
  };
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '1%',
          right: '1%',
        }}
      >
        <Box display='flex' flexDirection='column'>
          <Button
            onClick={() => {
              toggleMusic();
            }}
          >
            {music ? (
              <MusicNoteIcon fontSize='small' sx={{ color: 'white' }} />
            ) : (
              <MusicOffIcon fontSize='small' sx={{ color: 'white' }} />
            )}
          </Button>
          <Button
            onClick={() => {
              toggleSound();
            }}
          >
            {sound ? (
              <VolumeUpIcon fontSize='small' sx={{ color: 'white' }} />
            ) : (
              <VolumeOffIcon fontSize='small' sx={{ color: 'white' }} />
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        textAlign='center'
      >
        <Box display='flex' gap={2}>
          <Box
            sx={{
              height: '75px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
            }}
            display='flex'
            alignItems='center'
            justifyContent='center'
            px={2}
            py={0.5}
          >
            <Box display='flex' flexDirection='column'>
              <Typography sx={{ color: 'white' }} variant='overline'>
                TARGETS
              </Typography>
              <Box display='flex' alignSelf='center'>
                <Image
                  width={35}
                  src={gameRunning ? `./assets/Light/${targetsRemaining}-Key.png` : './assets/Light/0-Key.png'}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
            }}
            display='flex'
            alignItems='center'
            justifyContent='center'
            gap={2}
            px={2}
          >
            <Box display='flex' flexDirection='column'>
              <Typography sx={{ color: 'white' }} variant='overline'>
                Roll
              </Typography>
              <Box display='flex' gap={0.5}>
                <Image width={25} src='./assets/Dark/A-Key.png' />
                <Image width={25} src='./assets/Dark/D-Key.png' />
              </Box>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography sx={{ color: 'white' }} variant='overline'>
                Pitch
              </Typography>
              <Box display='flex' gap={0.5}>
                <Image width={25} src='./assets/Dark/W-Key.png' />
                <Image width={25} src='./assets/Dark/S-Key.png' />
              </Box>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography sx={{ color: 'white' }} variant='overline'>
                Yaw
              </Typography>
              <Box display='flex' gap={0.5}>
                <Image width={25} src='./assets/Dark/Q-Key.png' />
                <Image width={25} src='./assets/Dark/E-Key.png' />
              </Box>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography sx={{ color: 'white' }} variant='overline'>
                Turbo
              </Typography>
              <Box display='flex'>
                <Image width={50} src='./assets/Dark/Shift-Key.png' />
              </Box>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography sx={{ color: 'white' }} variant='overline'>
                Brake
              </Typography>
              <Box display='flex'>
                <Image width={62} src='./assets/Dark/Space-Key.png' />
              </Box>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography sx={{ color: 'white' }} variant='overline'>
                Reset
              </Typography>
              <Box display='flex' height={25} alignSelf='center'>
                <Image width={25} src='./assets/Dark/R-Key.png' />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
            }}
            display='flex'
            alignItems='center'
            justifyContent='center'
            px={2}
            py={0.5}
          >
            <Box display='flex' flexDirection='column'>
              <Typography sx={{ color: 'white' }} variant='overline'>
                SPEED
              </Typography>
              <Box display='flex' alignSelf='center'>
                <Typography sx={{ fontSize: '20px', color: 'white' }}>{gameRunning ? airplaneSpeed : '0'}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
