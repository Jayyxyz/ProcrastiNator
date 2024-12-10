import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const SpotifyPlayerWebView = ({ accessToken, onPlayerStateChange }) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </head>
      <body>
        <div id="player"></div>
        <script>
          window.onSpotifyWebPlaybackSDKReady = () => {
            const token = '${accessToken}';
            const player = new Spotify.Player({
              name: 'React Native Spotify Player',
              getOAuthToken: cb => { cb(token); },
              volume: 0.5
            });

            player.addListener('ready', ({ device_id }) => {
              console.log('Ready with Device ID', device_id);
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready', device_id }));
            });

            player.addListener('player_state_changed', state => {
              console.log('Player State Changed:', state);
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'player_state', state }));
            });

            player.connect();
          };
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      style={styles.webview}
      source={{ html: htmlContent }}
      javaScriptEnabled={true}
      onMessage={(event) => {
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === 'player_state') {
          onPlayerStateChange(message.state);
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default SpotifyPlayerWebView;
