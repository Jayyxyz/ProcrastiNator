import { Text, View, TouchableOpacity } from "react-native";
import styles from "./home.styles";
import { PaperProvider, IconButton } from "react-native-paper";
import TaskScheduler from "../taskScheduler/taskScheduler";


export default function Home() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <IconButton icon="bell"  size={35} style={styles.IconButton}/>
        </View>

        <View style={styles.toDo}>
            <TaskScheduler/>
        </View>
      </View>
    </PaperProvider>
  );
}
