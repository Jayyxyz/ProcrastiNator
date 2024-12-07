import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#054f5f',
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
    color: '#FFFFFF',
    marginTop: 10,
  },
  darkTitle: {
    color: '#AAAAAA',
  },
  timerContainer: {
    width: '90%',
    backgroundColor: '#056a74',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  darkTimerContainer: {
    backgroundColor: '#3A3A3A',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modeButton: {
    padding: 10,
    borderRadius: 10,
  },
  modeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  highlightedModeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#056a74',
    borderWidth: 2,
  },
  darkHighlightedModeButton: {
    backgroundColor: '#3A3A3A',
    borderColor: '#AAAAAA',
  },
  highlightedModeText: {
    color: '#056a74',
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
    backgroundColor: '#FFFFFF',
  },
  darkButton: {
    backgroundColor: '#555555',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#054f5f',
  },
  darkStartButtonText: {
    color: '#FFFFFF',
  },
  footerText: {
    color: '#FFFFFF',
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

export default styles;
