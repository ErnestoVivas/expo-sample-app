import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { globalStyles } from '../global-styles';

export default function UserScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={260}
          color="#808080"
          name="person.crop.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={globalStyles.titleContainerRow}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          User
        </ThemedText>
      </ThemedView>
      <ThemedText>User Data.</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -78,
    left: -18,
    position: 'absolute',
  },
});
