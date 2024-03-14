import { Box, Button, Typography } from '@mui/material';
import useGameStore from '../store/store';

export const Menu = () => {
  const { gameRunning, setGameRunning, targetsRemaining, setTargetsRemaining } = useGameStore();

  const handleStart = () => {
    setGameRunning(true);
  };

  const handleRestart = () => {
    setGameRunning(true);
    setTargetsRemaining(9);
  };

  return (
    <>
      {!gameRunning && targetsRemaining > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
          }}
          textAlign='center'
        >
          <Box display='flex' flexDirection='column' p={2}>
            <Typography sx={{ fontSize: '28px', color: 'white' }} variant='h6' p={2}>
              Airplane Demo
            </Typography>
            <Box display='flex' alignSelf='center'>
              <Button
                size='large'
                variant='contained'
                onClick={() => {
                  handleStart();
                }}
              >
                Start
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {!gameRunning && targetsRemaining < 1 && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
          }}
          textAlign='center'
        >
          <Box display='flex' flexDirection='column' p={2}>
            <Typography sx={{ fontSize: '28px', color: 'white' }} variant='h6' p={2}>
              Game Over
            </Typography>
            <Box display='flex' alignSelf='center'>
              <Button
                size='large'
                variant='contained'
                onClick={() => {
                  handleRestart();
                }}
              >
                Restart
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
