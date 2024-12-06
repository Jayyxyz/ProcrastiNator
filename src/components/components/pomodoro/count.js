import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { vibrate, convertSecondsToTime } from './utils';

const Count = ({ initialDate, play, reset, resetControl, completeSession }) => {
  const [time, setTime] = useState(initialDate);

  useEffect(() => {
    setTime(initialDate);
  }, [initialDate]);

  useEffect(() => {
    let interval;

    if (play) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            vibrate();
            completeSession();
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }

    if (reset) {
      clearInterval(interval);
      setTime(initialDate);
    }

    return () => clearInterval(interval);
  }, [play, reset, initialDate, completeSession]);

  return (
    <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#ffffff', marginVertical: 30 }}>
      {convertSecondsToTime(time)}
    </Text>
  );
};

Count.propTypes = {
  initialDate: PropTypes.number.isRequired,
  play: PropTypes.bool.isRequired,
  reset: PropTypes.bool.isRequired,
  resetControl: PropTypes.func.isRequired,
  completeSession: PropTypes.func.isRequired,
};

export default Count;
