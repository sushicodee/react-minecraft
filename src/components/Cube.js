import React, { useState } from 'react';
import { useBox } from 'use-cannon';
import { useStore } from '../hooks/useStore';
import * as textures from './../textures';
const Cube = ({ position, type, ...props }) => {
  const [hovered, sethovered] = useState(false);
  const [addCube, removeCube, texture] = useStore((state) => [
    state.addCube,
    state.removeCube,
    state.texture,
  ]);
  const [ref] = useBox(() => ({
    type: 'static',
    position,
    ...props,
  }));
  return (
    <mesh
      ref={ref}
      castShadow
      onPointerMove={(e) => {
        e.stopPropagation();
        sethovered(Math.floor(e.faceIndex / 2));
      }}
      onPointerOut={(e) => {
        sethovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (clickedFace === 0) {
          e.altKey
            ? removeCube({ x, y, z })
            : addCube({ x: x + 1, y, z, texture });
          return;
        }
        if (clickedFace === 1) {
          e.altKey
            ? removeCube({ x, y, z })
            : addCube({ x: x - 1, y, z, texture });
          return;
        }
        if (clickedFace === 2) {
          e.altKey
            ? removeCube({ x, y, z })
            : addCube({ x, y: y + 1, z, texture });
          return;
        }
        if (clickedFace === 3) {
          e.altKey
            ? removeCube({ x, y, z })
            : addCube({ x, y: y - 1, z, texture });
          return;
        }
        if (clickedFace === 4) {
          e.altKey
            ? removeCube({ x, y, z })
            : addCube({ x, y, z: z + 1, texture });
          return;
        }
        if (clickedFace === 5) {
          e.altKey
            ? removeCube({ x, y, z })
            : addCube({ x, y, z: z - 1, texture });
          return;
        }
      }}
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attachArray='material'
          map={textures[type]}
          key={index}
          color={hovered === index ? 'gray' : 'white'}
          opacity={type === 'glass' ? 0.7 : 1}
          transparent={true}
        />
      ))}
      <boxBufferGeometry attach='geometry' />
    </mesh>
  );
};

export default Cube;
