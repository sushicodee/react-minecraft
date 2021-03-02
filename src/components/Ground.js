import React from 'react';
import { usePlane } from 'use-cannon';
import { TextureLoader, RepeatWrapping } from 'three';
import grass from '../images/grass.jpg';

import { useStore } from '../hooks/useStore';

export default function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const [addCube, activeTexture] = useStore((state) => [
    state.addCube,
    state.texture,
  ]);
  const texture = new TextureLoader().load(grass);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);
  return (
    <mesh
      ref={ref}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        const { x, y, z } = e.point;
        addCube({
          x: Math.ceil(x),
          y: Math.ceil(y),
          z: Math.ceil(z),
          type: activeTexture,
        });
      }}
    >
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial map={texture} attach='material' />
    </mesh>
  );
}
