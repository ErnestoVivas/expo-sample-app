import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useUser } from '@/context/user-context';
import { globalStyles } from '../global-styles';

export default function UserScreen() {
  const router = useRouter();
  const { firstName, lastName } = useUser();
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'Not set';

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
      <View style={styles.row}>
        <ThemedText style={styles.label}>Name:</ThemedText>
        <ThemedText style={styles.value}>{displayName}</ThemedText>
        <Pressable onPress={() => router.push('/modal')} hitSlop={8}>
          <IconSymbol name="pencil" size={18} color="#0a7ea4" />
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  label: {
    fontWeight: '600',
  },
  value: {
    marginRight: 4,
  },
  headerImage: {
    color: '#808080',
    bottom: -78,
    left: -18,
    position: 'absolute',
  },
});
