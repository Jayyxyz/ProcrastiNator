import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Switch } from 'react-native';
import Count from './count';
import NavBar from '../../navigation/navbar';
import styles from './styles'; // Import styles from the separate file

const CONSTANTS = {
  POMODORO_TIME: 25,
  SHORTBREAK_TIME: 5,
  LONGBREAK_TIME: 15,
};

export default function Pomodoro() {
  const [maxTime, setMaxTime] = useState(CONSTANTS.POMODORO_TIME);
  const [play, setPlay] = useState(false);
  const [reset, setReset] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [initialDate, setInitialDate] = useState(CONSTANTS.POMODORO_TIME * 60 * 1000);
  const [selectedTimer, setSelectedTimer] = useState('pomodoro');

  const switchTypeTimer = (type) => {
    if (!play) {
      setSelectedTimer(type);
      switch (type) {
        case 'pomodoro':
          setMaxTime(CONSTANTS.POMODORO_TIME);
          setInitialDate(CONSTANTS.POMODORO_TIME * 60 * 1000);
          break;
        case 'shortbreak':
          setMaxTime(CONSTANTS.SHORTBREAK_TIME);
          setInitialDate(CONSTANTS.SHORTBREAK_TIME * 60 * 1000);
          break;
        case 'longbreak':
          setMaxTime(CONSTANTS.LONGBREAK_TIME);
          setInitialDate(CONSTANTS.LONGBREAK_TIME * 60 * 1000);
          break;
        default:
          break;
      }
      setReset(true);
    }
  };

  const startControl = () => {
    setPlay(true);
    setReset(false);
  };

  const resetControl = () => {
    setPlay(false);
    setReset(true);
    setInitialDate(maxTime * 60 * 1000);
  };

  const completeSession = () => {
    setCompletedSessions((prev) => prev + 1);
    if (completedSessions % 4 === 0) {
      switchTypeTimer('longbreak');
    } else {
      switchTypeTimer('shortbreak');
    }
    setPlay(false);
    setReset(true);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const isSelected = (type) => selectedTimer === type;

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.topBar}>
        <Text style={[styles.title, darkMode && styles.darkTitle]}>Pomodoro</Text>
        <View style={styles.darkModeToggle}>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
      </View>
      <View style={[styles.timerContainer, darkMode && styles.darkTimerContainer]}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              isSelected('pomodoro') && styles.highlightedModeButton,
              darkMode && isSelected('pomodoro') && styles.darkHighlightedModeButton,
            ]}
            onPress={() => switchTypeTimer('pomodoro')}
          >
            <Text style={[styles.modeText, isSelected('pomodoro') && styles.highlightedModeText]}>
              Pomodoro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              isSelected('shortbreak') && styles.highlightedModeButton,
              darkMode && isSelected('shortbreak') && styles.darkHighlightedModeButton,
            ]}
            onPress={() => switchTypeTimer('shortbreak')}
          >
            <Text style={[styles.modeText, isSelected('shortbreak') && styles.highlightedModeText]}>
              Short Break
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              isSelected('longbreak') && styles.highlightedModeButton,
              darkMode && isSelected('longbreak') && styles.darkHighlightedModeButton,
            ]}
            onPress={() => switchTypeTimer('longbreak')}
          >
            <Text style={[styles.modeText, isSelected('longbreak') && styles.highlightedModeText]}>
              Long Break
            </Text>
          </TouchableOpacity>
        </View>
        <Count
          initialDate={initialDate}
          play={play}
          reset={reset}
          resetControl={resetControl}
          completeSession={completeSession}
        />
        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={[styles.startButton, darkMode && styles.darkButton]}
            onPress={startControl}
          >
            <Text style={[styles.startButtonText, darkMode && styles.darkStartButtonText]}>START</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.startButton, darkMode && styles.darkButton]}
            onPress={resetControl}
          >
            <Text style={[styles.startButtonText, darkMode && styles.darkStartButtonText]}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.footerText, darkMode && styles.darkFooterText]}>
        Completed Sessions: {completedSessions}
      </Text>
      <NavBar />
    </View>
  );
}
