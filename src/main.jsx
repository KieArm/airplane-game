import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { isMobile } from 'react-device-detect';
import { Box, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import App from './App.jsx';
import './index.css';
import { Hud } from './components/Hud';
import { Menu } from './components/Menu';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {isMobile ? (
      <Box display='flex' justifyContent='center' alignItems='center' height='100%' width='100%'>
        <Box m={2} textAlign='center'>
          <Typography variant='caption' style={{ color: 'white', display: 'inline-block', whiteSpace: 'pre-line' }}>
            This demo is not available on mobiles. Please visit the desktop site.
          </Typography>
        </Box>
      </Box>
    ) : (
      <>
        <Canvas shadows>
          <Suspense fallback={null}>
            <App />
          </Suspense>
        </Canvas>
        <Hud />
        <Menu />
      </>
    )}
  </>
);
