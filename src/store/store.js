import { create } from 'zustand';

const useGameStore = create((set) => ({
  gameRunning: false,
  setGameRunning: (value) => set({ gameRunning: value }),
  targetsRemaining: 9,
  setTargetsRemaining: (value) => set({ targetsRemaining: value }),
  speed: 0.001,
  setSpeed: (value) => set({ speed: value }),
  turboing: false,
  setTurboing: (value) => set({ turboing: value }),
  music: true,
  setMusic: (value) => set({ music: value }),
  sound: true,
  setSound: (value) => set({ sound: value }),
}));

export default useGameStore;
