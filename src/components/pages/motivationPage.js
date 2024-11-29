import React from "react";
import { ScrollView, View, Text } from "react-native";
import MotivationalCard from "../components/motivation-cards/motivation-cards";
import VideoCard from "../components/video-cards/video-cards";
import styles from "./styles";

const MotivationalPage = () => {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.cardContainer}>
        <MotivationalCard
          text="Meet Procrastinator! Your ultimate productivity partner! Designed specifically for students and young professionals.
        This app helps you conquer academic challenges and achieve your best performance!"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Motivational Quotes for You</Text>
          <Text style={styles.descriptionTitle}>
            Boost your mindset with Daily Motivation
          </Text>
        </View>

        <View style={styles.qouteContainer}>
          <View style={styles.quoteCard}>
            <MotivationalCard text="Procrastination delays success, act now!" />
          </View>
          <View style={styles.quoteCard}>
            <MotivationalCard text="Study smarter, Work smarter, not harder" />
          </View>
          <View style={styles.quoteCard}>
            <MotivationalCard text="Success is the way to honor your parents" />
          </View>
          <View style={styles.quoteCard}>
            <MotivationalCard text="A little Progress each day adds up to Big results" />
          </View>
        </View>

        <View style={styles.videoCard}>
          <VideoCard 
            title="Stay Motivated with This Powerful Speech" 
            videoId="7sxpKhIbr0E"
          />
          <VideoCard 
            title="Top 10 Productivity Tips" 
            videoId="7sxpKhIbr0E"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MotivationalPage;
