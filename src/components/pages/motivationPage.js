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
        This app helps you conquer academic challenges and achieve your best performance!"  url="https://example.com/procrastinator"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Motivational Quotes for You</Text>
          <Text style={styles.descriptionTitle}>
            Boost your mindset with Daily Motivation
          </Text>
        </View>

        <View style={styles.qouteContainer}>
          <View style={styles.quoteCard}>
            <MotivationalCard text="Procrastination delays success, act now!" icon={require("../../../assets/sleep.png")} />
          </View>
          <View style={styles.quoteCard}>
            <MotivationalCard text="Study smarter, Work smarter, not harder" icon={require("../../../assets/grad.png")} />
          </View>
          <View style={styles.quoteCard}>
            <MotivationalCard text="Success is the way to honor your parents" icon={require("../../../assets/happy.png")}/>
          </View>
          <View style={styles.quoteCard}>
            <MotivationalCard text="A little Progress each day adds up to Big results" icon={require("../../../assets/smile.png")}/>
          </View>
        </View>

        <View style={styles.videoCard}>
          <VideoCard 
            title="How to cope with anxiety" 
            videoId="WWloIAQpMcQ"
            summary={"Olivia Remes, a researcher from the University of Cambridge, discusses the widespread impact of anxiety disorders and offers practical strategies for managing them. She notes that anxiety affects approximately 1 in 14 people globally, leading to conditions such as depression and increased suicide risk.Olivia Remes, a researcher from the University of Cambridge, discusses the widespread impact of anxiety disorders and offers practical strategies for managing them. She notes that anxiety affects approximately 1 in 14 people globally, leading to conditions such as depression and increased suicide risk."}
          />
          <VideoCard 
            title="The secret to self control" 
            videoId="tTb3d5cjSFI"
            summary={"Jonathan Bricker introduces the concept of willingness as a key strategy for managing cravings and altering unhealthy behaviors. This approach is rooted in Acceptance and Commitment Therapy (ACT), which emphasizes accepting thoughts and feelings without acting on them."}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MotivationalPage;
