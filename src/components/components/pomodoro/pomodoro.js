import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import Count from './count';
import NavBar from '../../navigation/navbar';

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

  const switchTypeTimer = (type) => {
    if (!play) {
      switch (type) {
        case "pomodoro":
          setMaxTime(CONSTANTS.POMODORO_TIME);
          setInitialDate(CONSTANTS.POMODORO_TIME * 60 * 1000);
          break;
        case "shortbreak":
          setMaxTime(CONSTANTS.SHORTBREAK_TIME);
          setInitialDate(CONSTANTS.SHORTBREAK_TIME * 60 * 1000);
          break;
        case "longbreak":
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
      switchTypeTimer("longbreak");
    } else {
      switchTypeTimer("shortbreak");
    }
    setPlay(false);
    setReset(true);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.topBar}>
        <Text style={[styles.title, darkMode && styles.darkTitle]}>Pomodoro</Text>
        <View style={styles.darkModeToggle}>
          <Text style={[styles.toggleText, darkMode && styles.darkToggleText]}></Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
      </View>
      <View style={styles.timerContainer}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.modeButton, { backgroundColor: '#FF6F61' }]}
            onPress={() => switchTypeTimer('pomodoro')}
          >
            <Text style={[styles.modeText, darkMode && styles.darkModeText]}>Pomodoro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, { backgroundColor: '#FFA177' }]}
            onPress={() => switchTypeTimer('shortbreak')}
          >
            <Text style={[styles.modeText, darkMode && styles.darkModeText]}>Short Break</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, { backgroundColor: '#6D9EEB' }]}
            onPress={() => switchTypeTimer('longbreak')}
          >
            <Text style={[styles.modeText, darkMode && styles.darkModeText]}>Long Break</Text>
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
          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#5CB85C' }]} onPress={startControl}>
            <Text style={[styles.startButtonText, darkMode && styles.darkStartButtonText]}>START</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.resetButton, { backgroundColor: '#D9534F' }]} onPress={resetControl}>
            <Text style={[styles.resetButtonText, darkMode && styles.darkResetButtonText]}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.footerText, darkMode && styles.darkFooterText]}>
        Completed Sessions: {completedSessions}
      </Text>
      <NavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9E4D4',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  darkContainer: {
    backgroundColor: '#2C2C2C',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginTop: 10
  },
  darkTitle: {
    color: '#FFAB91',
  },
  timerContainer: {
    width: '90%',
    backgroundColor: '#FFD3B6',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modeButton: {
    padding: 8,
    borderRadius: 10,
    elevation: 2,
  },
  modeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkModeText: {
    color: '#333333',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footerText: {
    color: '#6D9EEB',
    fontSize: 16,
    fontWeight: '600',
  },
  darkFooterText: {
    color: '#AAAAAA',
  },
  darkModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginRight: 5,
    fontSize: 14,
    color: '#333333',
  },
  darkToggleText: {
    color: '#FFFFFF',
  },
});
