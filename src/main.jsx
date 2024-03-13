import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { isMobile } from 'react-device-detect';
import { Box } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import App from './App.jsx';
import './index.css';
import { Hud } from './components/Hud';
import { Menu } from './components/Menu';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {isMobile ? (
      <Box>Mobile devices are not supported</Box>
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
