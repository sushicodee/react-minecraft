import create from 'zustand';

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const names = {
  world: 'world',
};

export const useStore = create((set) => ({
  cubes: getLocalStorage(names.world) || [],
  addCube: ({ x, y, z, texture = 'wood' }) =>
    set((state) => ({
      cubes: [...state.cubes, { pos: [x, y, z], type: texture }],
    })),
  removeCube: ({ x, y, z }) =>
    set((state) =>
      state.cubes.filter(
        ({ pos }) => pos[0] !== x || pos[1] !== y || pos[2] !== z
      )
    ),
  texture: 'wood',
  setTexture: (texture) => {
    set((state) => (state.texture = texture));
  },
  saveWorld: () => {
    set((state) => setLocalStorage(names.world, state.cubes));
  },
}));
