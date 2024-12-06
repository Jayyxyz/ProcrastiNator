import { Text, View, TouchableOpacity } from "react-native";
import styles from "../home/home.styles"
import { PaperProvider, IconButton } from "react-native-paper";
import NavBar from "../../navigation/navbar";
import MotivationalPage from "../../pages/motivationPage";



export default function Home() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <IconButton icon="bell"  size={35} style={styles.IconButton}/>
        </View>

        <View style={styles.toDo}>
            <MotivationalPage />
        </View>

        <View style={styles.navBar}>
          <NavBar/>
        </View>
      </View>
    </PaperProvider>
  );
}
