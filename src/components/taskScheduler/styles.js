import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#054f5f',
    width: '100%'
  },
  section: {
    backgroundColor: '#054f5f',
    width: '100%',
    padding: 10
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  header: {
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white'
  },
  taskCount: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    marginLeft: 20
  },
  task: {
    height: '63%',
    width: '100%',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    backgroundColor: 'white',
    
  },
  dates:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  dateItem: {
    margin: 15,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    width: 40
  },
   dateLetter:{
     fontWeight: 'bold',
     fontSize: 10,
     marginBottom: -5
   },
   dateNumber: {
    fontWeight: '900',
    fontSize: 25
   },
  selectedDate: {
    backgroundColor: '#007AFF',
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
  },
  taskHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    alignSelf: 'flex-start'
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  taskContent: {
    flex: 1,
    marginLeft: 10,
  },
  taskList:{
    flexDirection: 'row',
    
  },
  taskDes: {
   marginLeft: 30,
   
  },
  taskTime: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#777',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  addButton: {
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: 100,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,  // Take full height of the screen
    justifyContent: 'flex-start',  // Align content at the top
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Slightly dark background for better contrast
    paddingTop: 50,  // Optional: Add some padding at the top to give it space
  },
  modalContent: {
    backgroundColor: '#054f5f',
    padding: 10,
    borderRadius: 10,
    width: '100%',  // Make modal content take full width
    height: '100%',  // Make modal content take full height
    paddingTop: 25,  // Optional: Adds space from the top
    justifyContent: 'flex-start',  // Start from the top
  },
  inputTitle: {
    height: 50,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 18,
  },
  inputDescription: {
    height: '50%',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 15,
    paddingTop: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',  // Align text to the top in multiline input
  },
  setTime: {
    flexDirection: 'row', 
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    padding: 13,
    justifyContent: 'space-between',
    marginBottom: 5
  },
  setDate: {
    flexDirection: 'row', 
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    padding: 13,
    justifyContent: 'space-between',
    marginBottom: 5
  },
  setRepeat: {
    flexDirection: 'row', 
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    padding: 13,
    justifyContent: 'space-between'
  },
  submitTask: {
    alignItems: 'center',
    flexDirection: 'row', 
     
  },
  submitButton:{
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30
  },
  customButton: {
    backgroundColor: 'cyan', // Set your desired color here
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: '#F44336', // Set your desired cancel button color here
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  repeatContainer: {
    marginTop: 200,
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20
  },
  repeatTitle: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  repeatOption: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin:10
  },
  dateContainer: {
      marginTop: 60,
      height: '50%',
      width: '98%',
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 20
  }
  
  
});

export default styles;
