import useGameStore from '../store/store';

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export let controls = {};

window.addEventListener('keydown', (e) => {
  controls[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
  controls[e.key.toLowerCase()] = false;
});

let maxVelocity = 0.01;
let jawVelocity = 0;
let yawVelocity = 0;
let pitchVelocity = 0;
export let turbo = 0;

export function updatePlaneAxis(x, y, z, planePosition, camera, planeSpeed) {
  if (planeSpeed == 0) {
    return null;
  }

  jawVelocity *= 0.75;
  yawVelocity *= 0.75;
  pitchVelocity *= 0.75;
  turbo = 0;

  if (Math.abs(jawVelocity) > maxVelocity) {
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;
  }

  if (Math.abs(pitchVelocity) > maxVelocity) {
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;
  }

  if (controls['a']) {
    jawVelocity -= 0.005;
  }

  if (controls['d']) {
    jawVelocity += 0.005;
  }

  if (controls['s']) {
    pitchVelocity -= 0.0015;
  }

  if (controls['w']) {
    pitchVelocity += 0.0015;
  }

  if (controls['q']) {
    yawVelocity += 0.0015;
  }

  if (controls['e']) {
    yawVelocity -= 0.0015;
  }

  if (controls['r']) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 0, -4.5);
  }

  if (controls[' ']) {
    planeSpeed = 0.0005;
  } else if (controls[' '] == false) {
    planeSpeed = 0.001;
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  x.applyAxisAngle(y, yawVelocity);
  z.applyAxisAngle(y, yawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  if (controls.shift) {
    turbo += 0.02;
    useGameStore.setState({ turboing: true });
  } else {
    turbo *= 0.5;
    useGameStore.setState({ turboing: false });
  }

  turbo = Math.min(Math.max(turbo, 0), 1);
  let turboSpeed = easeOutQuad(turbo) * 0.03;
  useGameStore.setState({ speed: planeSpeed });

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(planeSpeed + turboSpeed));
}
