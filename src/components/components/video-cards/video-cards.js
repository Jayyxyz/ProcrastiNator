import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import styles from "./styles";

const VideoCard = ({ title, videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Replace with a custom thumbnail if desired
  const customThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.videoContainer}>
        {!isPlaying ? (
          // Display custom thumbnail with play button
          <TouchableOpacity
            style={styles.thumbnailContainer}
            onPress={() => setIsPlaying(true)}
          >
            <Image source={{ uri: customThumbnail }} style={styles.thumbnail} />
            <View style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </View>
          </TouchableOpacity>
        ) : (
          // Play the video
          <YoutubeIframe
            videoId={videoId}
            height={200}
            play={true}
            onChangeState={(state) => {
              if (state === "ended") {
                setIsPlaying(false); // Reset to thumbnail after video ends
              }
            }}
            initialPlayerParams={{
              modestbranding: true, // Minimize YouTube logo
              rel: false,           // No related videos
              controls: true,       // Minimal controls
              showinfo: false,      // No video title/uploader info
              disablekb: true,      // Disable keyboard interactions
            }}
          />
        )}
      </View>
    </View>
  );
};

export default VideoCard;
