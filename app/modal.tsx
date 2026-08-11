import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useUser } from '@/context/user-context';

export default function ModalScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  const { firstName: savedFirst, lastName: savedLast, setFirstName: saveFirst, setLastName: saveLast } = useUser();
  const [firstName, setFirstName] = useState(savedFirst);
  const [lastName, setLastName] = useState(savedLast);

  useEffect(() => {
    setFirstName(savedFirst);
    setLastName(savedLast);
  }, [savedFirst, savedLast]);

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      borderColor: colors.icon,
      backgroundColor: scheme === 'dark' ? '#1e2022' : '#f5f5f5',
    },
  ];

  return (
    <Pressable style={styles.backdrop} onPress={() => router.back()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centerer}
      >
        <Pressable
          style={[styles.card, { backgroundColor: colors.background }]}
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedText type="title" style={styles.title}>
            Edit Name
          </ThemedText>

          <ThemedText style={styles.label}>First Name</ThemedText>
          <TextInput
            style={inputStyle}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
            placeholderTextColor={colors.icon}
            autoCapitalize="words"
          />

          <ThemedText style={styles.label}>Last Name</ThemedText>
          <TextInput
            style={inputStyle}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
            placeholderTextColor={colors.icon}
            autoCapitalize="words"
          />

          <View style={styles.actions}>
            <Pressable
              style={[styles.btn, styles.btnCancel, { borderColor: colors.icon }]}
              onPress={() => router.back()}
            >
              <ThemedText>Cancel</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.btn, styles.btnOk, { backgroundColor: colors.tint }]}
              onPress={() => { saveFirst(firstName); saveLast(lastName); router.back(); }}
            >
              <ThemedText style={{ color: '#fff' }}>OK</ThemedText>
            </Pressable>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 4,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  btnCancel: {
    borderWidth: 1,
  },
  btnOk: {},
});
