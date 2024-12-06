import { StyleSheet } from "react-native";
import VideoCard from "../components/video-cards/video-cards";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#054f5f',
    },

    contentContainer: {
      padding: 10, // Space inside the scrollable content
    },

    titleContainer: {
        width: '100%',
        padding: 5,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 5,
      color: 'white',
    },

    descriptionTitle: {
      color: 'white',
    },

    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },

    quoteCard: {
        width: '50%',
         // Add some space between cards
    },

    qouteContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    },

    videoCard: {
        width: '100%'
    }
});

export default styles;
