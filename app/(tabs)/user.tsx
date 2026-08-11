import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

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
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your photo library to continue.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.length) {
      return;
    }

    setPhotoUri(result.assets[0].uri);
  };

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
        <Pressable onPress={() => router.push('/user-modal')} hitSlop={8}>
          <IconSymbol name="pencil" size={18} color="#0a7ea4" />
        </Pressable>
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Profile Photo</ThemedText>
        {photoUri ? <Image source={{ uri: photoUri }} style={styles.preview} contentFit="cover" /> : null}
        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={pickImage}>
            <ThemedText style={styles.buttonText}>Pick Photo</ThemedText>
          </Pressable>
        </View>
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
  section: {
    marginTop: 20,
    gap: 10,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  preview: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#e6e6e6',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  headerImage: {
    color: '#808080',
    bottom: -78,
    left: -18,
    position: 'absolute',
  },
});
