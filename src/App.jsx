import { PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import SphereEnv from './components/SphereEnv';
import IcyTerrain from './components/IcyTerrain';
import Airplane from './components/Airplane';
import Targets from './components/Targets';

import { MotionBlur } from './components/MotionBlur';

export default function App() {
  return (
    <>
      <SphereEnv />
      <Environment background={false} files={'./textures/puresky2k.hdr'} />
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />

      <IcyTerrain />
      <Airplane />
      <Targets />

      <EffectComposer>
        <MotionBlur />
      </EffectComposer>
    </>
  );
}
