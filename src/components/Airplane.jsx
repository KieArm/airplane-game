import * as THREE from 'three';
import { useThree, useLoader } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { updatePlaneAxis } from '../controls/controls';
import useGameStore from '../store/store';

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
// eslint-disable-next-line react-refresh/only-export-components
export const planePosition = new Vector3(0, 0, -4.5);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export default function Airplane(props) {
  const { targetsRemaining, speed, setSpeed, gameRunning, music, sound } = useGameStore();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('./models/p-51/scene.glb');
  const { actions } = useAnimations(animations, group);

  const soundBackground = useRef();
  const [listenerBackground] = useState(() => new THREE.AudioListener());
  const bufferBackground = useLoader(THREE.AudioLoader, './sounds/outer-space.mp3');

  const airplaneSound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, './sounds/propeller.mp3');

  useEffect(() => {
    if (!gameRunning || targetsRemaining < 1) {
      airplaneSound.current.pause();
      setSpeed(0);
      actions['propeler|propeler|propeler|propelerAction|propeler|propelerAction'].stop();
      x.set(1, 0, 0);
      y.set(0, 1, 0);
      z.set(0, 0, 1);
      planePosition.set(0, 0, -4.5);
    } else {
      camera.add(listener, listenerBackground);
      setSpeed(0.001);
      actions['propeler|propeler|propeler|propelerAction|propeler|propelerAction'].play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, targetsRemaining, gameRunning]);

  useEffect(() => {
    airplaneSound.current.setBuffer(buffer);
    airplaneSound.current.setRefDistance(1);
    airplaneSound.current.setVolume(0.5);
    airplaneSound.current.setLoop(true);
    if (sound && gameRunning) {
      airplaneSound.current.play();
    } else {
      airplaneSound.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound, gameRunning]);

  useEffect(() => {
    soundBackground.current.setBuffer(bufferBackground);
    soundBackground.current.setRefDistance(1);
    soundBackground.current.setVolume(0.3);
    soundBackground.current.setLoop(true);
    if (music && gameRunning) {
      soundBackground.current.play();
    } else {
      soundBackground.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music, gameRunning]);

  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera, speed);
    const rotMatrix = new Matrix4().makeBasis(x, y, z);
    const matrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
      .multiply(rotMatrix);

    group.current.matrixAutoUpdate = false;
    group.current.matrix.copy(matrix);
    group.current.matrixWorldNeedsUpdate = true;

    var quaternionA = new Quaternion().copy(delayedQuaternion);
    var quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    var interpolationFactor = 0.05;
    var interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(0.2))
      .multiply(new Matrix4().makeRotationY(Math.PI))
      .multiply(new Matrix4().makeTranslation(0, 0.015, 0.3));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;
  });

  return (
    <group ref={group}>
      <group {...props} dispose={null} scale={0.0001}>
        <group name='RootNode'>
          <group name='propeler' position={[0, 0.093, 377.462]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh name='propeler_BLADES_0' geometry={nodes.propeler_BLADES_0.geometry} material={materials.BLADES} />
          </group>
        </group>
        <mesh
          name='WINGS_Wings_0'
          geometry={nodes.WINGS_Wings_0.geometry}
          material={materials.Wings}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          name='FUZELAGE_Fuzelage_0'
          geometry={nodes.FUZELAGE_Fuzelage_0.geometry}
          material={materials.Fuzelage}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          name='PROPELER_Cone_0'
          geometry={nodes.PROPELER_Cone_0.geometry}
          material={materials.Cone}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          name='EXHAUST_EXHAUST_0'
          geometry={nodes.EXHAUST_EXHAUST_0.geometry}
          material={materials.EXHAUST}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          name='CANNON_CANNON_0'
          geometry={nodes.CANNON_CANNON_0.geometry}
          material={materials.CANNON}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <positionalAudio ref={airplaneSound} args={[listener]} />
        <positionalAudio ref={soundBackground} args={[listenerBackground]} />
      </group>
    </group>
  );
}

useGLTF.preload('./models/p-51/scene.glb');
