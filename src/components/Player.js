import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';
import { useSphere } from 'use-cannon';
import { useKeyboardControls } from './../hooks/useKeyboardControls';
import { FPVControls } from './FPVControls';
const Player = (props) => {
  const {
    movement: { moveUp, moveDown, moveLeft, moveRight, jump },
    speed,
    jumpVelocity,
  } = useKeyboardControls();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    ...props,
  }));
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);
  useFrame(() => {
    camera.position.copy(ref.current.position);
    const direction = new Vector3();
    const upVector = new Vector3(0, 0, (moveDown ? 1 : 0) - (moveUp ? 1 : 0));
    const leftVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );
    direction
      .subVectors(upVector, leftVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(velocity.current[1].toFixed(2) < 0.5)) {
      api.velocity.set(velocity.current[0], jumpVelocity, velocity.current[2]);
    }
  });
  return (
    <>
      <FPVControls />
      <mesh ref={ref}></mesh>
    </>
  );
};

export default Player;
