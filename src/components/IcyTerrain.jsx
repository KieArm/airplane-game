import { useGLTF } from '@react-three/drei';

export default function IcyTerrain(props) {
  const { nodes, materials } = useGLTF('./models/terrain/icy4k.glb');
  return (
    <group {...props} dispose={null} scale={1.2}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.Material} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

useGLTF.preload('./models/terrain/icy4k.glb');
