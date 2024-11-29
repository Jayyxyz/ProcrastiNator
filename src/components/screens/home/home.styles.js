import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Navbar from "../../navigation/navbar"

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
    
  },
  header: {
    width: '100%',
    height: 55,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: 'e0e0e0'
  },
  IconButton: {
    marginRight: 0,
    
  },
  toDo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
  navBar: {
   
  }
  

});

export default styles;
