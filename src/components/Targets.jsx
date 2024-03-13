import { useState, useMemo, useEffect } from 'react';
import { Quaternion, TorusGeometry, Vector3 } from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import { planePosition } from './Airplane';
import useGameStore from '../store/store';

function randomPoint(scale) {
  return new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).multiply(
    scale || new Vector3(1, 1, 1)
  );
}

const TARGET_RAD = 0.15;

export default function Targets() {
  const { targetsRemaining, setTargetsRemaining, gameRunning, setGameRunning } = useGameStore();
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    if (gameRunning && targetsRemaining >= 9) {
      const arr = [];
      for (let i = 0; i < targetsRemaining; i++) {
        arr.push({
          center: randomPoint(new Vector3(3, 0.5, 3)),
          direction: randomPoint().normalize(),
          hit: false,
        });
      }
      setTargets(arr);
    }
  }, [targetsRemaining, gameRunning]);

  const geometry = useMemo(() => {
    let geo;

    targets.forEach((target) => {
      const torusGeo = new TorusGeometry(TARGET_RAD, 0.01, 5, 50);
      torusGeo.applyQuaternion(new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), target.direction));
      torusGeo.translate(target.center.x, target.center.y, target.center.z);

      if (!geo) geo = torusGeo;
      else geo = mergeBufferGeometries([geo, torusGeo]);
    });

    return geo;
  }, [targets]);

  useFrame(() => {
    targets.forEach((target) => {
      const v = planePosition.clone().sub(target.center);
      const dist = target.direction.dot(v);
      const projected = planePosition.clone().sub(target.direction.clone().multiplyScalar(dist));

      const hitDist = projected.distanceTo(target.center);
      if (hitDist < TARGET_RAD && Math.abs(dist) < 0.005) {
        target.hit = true;
      }
    });

    const atLeastOneHit = targets.find((target) => target.hit);
    if (atLeastOneHit) {
      const remainingTargets = targets.filter((target) => !target.hit);
      setTargets(remainingTargets);
      setTargetsRemaining(remainingTargets.length);
      if (remainingTargets.length == 0) {
        setGameRunning(false);
      }
    }
  });

  return (
    <>
      {geometry && (
        <mesh geometry={geometry}>
          <meshStandardMaterial wireframe={true} metalness={1} />
        </mesh>
      )}
    </>
  );
}
