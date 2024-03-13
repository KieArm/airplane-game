import { useTexture } from '@react-three/drei';
import { BackSide } from 'three';

export default function SphereEnv() {
  const map = useTexture('./textures/puresky4k.jpg');

  return (
    <mesh>
      <sphereGeometry args={[60, 50, 50]} />
      <meshBasicMaterial side={BackSide} map={map} />
    </mesh>
  );
}
