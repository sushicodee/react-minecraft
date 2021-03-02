import { useEffect, useState } from 'react';
import { useStore } from './useStore';

const actionByKey = (key) => {
  const keys = {
    KeyW: 'moveUp',
    ArrowUp: 'moveUp',
    KeyS: 'moveDown',
    ArrowDown: 'moveDown',
    KeyA: 'moveLeft',
    ArrowLeft: 'moveLeft',
    KeyD: 'moveRight',
    ArrowRight: 'moveRight',
    Space: 'jump',
    ShiftLeft: 'run',
    ShiftRight: 'run',
  };
  return keys[key];
};

function textureByKey(key) {
  const keys = {
    Digit1: 'wood',
    Digit2: 'grass',
    Digit3: 'glass',
    Digit4: 'log',
    Digit5: 'dirt',
  };
  return keys[key];
}

export const useKeyboardControls = () => {
  const initialState = {
    speed: 6,
    runSpeed: 10,
    jumpVelocity: 8,
  };
  const [speed, setspeed] = useState(initialState.speed);
  const [jumpVelocity, setJumpVelocity] = useState(initialState.speed);
  const [movement, setmovement] = useState({
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    run: false,
  });
  const setTexture = useStore((state) => state.setTexture);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { code } = e;
      if (actionByKey(code)) {
        setmovement((state) => ({ ...state, [actionByKey(code)]: true }));
        if (actionByKey(code) === 'run') {
          setspeed(initialState.runSpeed);
        }
      }
      if (textureByKey(code)) {
        setTexture(textureByKey(code));
      }
    };
    const handleKeyUp = (e) => {
      const { code } = e;
      if (actionByKey(code)) {
        setmovement((state) => ({ ...state, [actionByKey(code)]: false }));
        if (actionByKey(code) === 'run') {
          setspeed(initialState.speed);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });
  return { movement, speed, jumpVelocity };
};
