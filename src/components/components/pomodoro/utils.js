import { Vibration } from 'react-native';

export const vibrate = () => {
  Vibration.vibrate([500, 500, 500]);
};

export const convertSecondsToTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
