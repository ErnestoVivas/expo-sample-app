import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { globalStyles } from '../global-styles';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [selectedItem, setSelectedItem] = useState('item 1');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownItems = ['item 1', 'item 2', 'item 3'];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={globalStyles.titleContainerRow}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Buttons</ThemedText>
        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, { backgroundColor: theme.tint }]}>
            <ThemedText style={styles.filledText}>Normal</ThemedText>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#2b353a' : '#dff2f7' }]}>
            <ThemedText>Filled</ThemedText>
          </Pressable>
          <Pressable style={styles.buttonTextOnly}>
            <ThemedText style={{ color: theme.tint }}>Text</ThemedText>
          </Pressable>
          <Pressable style={[styles.button, styles.iconOnlyButton, { borderColor: theme.icon }]}>
            <IconSymbol name="person.fill" size={16} color={theme.tint} />
          </Pressable>
          <Pressable style={styles.buttonTextOnly}>
            <ThemedText style={[styles.linkText, { color: theme.tint }]}>Link</ThemedText>
          </Pressable>
        </View>
      </ThemedView>

      <View style={[styles.divider, { backgroundColor: theme.icon }]} />

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Scrollable List</ThemedText>
        <View style={[styles.listContainer, { borderColor: theme.icon }]}>
          <ScrollView>
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={String(i)}>
                <ThemedText style={styles.listItem}>item {i + 1}</ThemedText>
                {i < 9 ? <View style={[styles.divider, { backgroundColor: theme.icon }]} /> : null}
              </View>
            ))}
          </ScrollView>
        </View>
      </ThemedView>

      <View style={[styles.divider, { backgroundColor: theme.icon }]} />

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Expanded Row</ThemedText>
        <View style={styles.expandedRow}>
          <View style={[styles.expandedItem, { backgroundColor: theme.tint }]}>
            <ThemedText style={styles.filledText}>expanded</ThemedText>
          </View>
          <View style={[styles.itemTwo, { backgroundColor: colorScheme === 'dark' ? '#2b353a' : '#dff2f7' }]}>
            <ThemedText>Item 2</ThemedText>
          </View>
        </View>
      </ThemedView>

      <View style={[styles.divider, { backgroundColor: theme.icon }]} />

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Dropdown</ThemedText>
        <View style={styles.dropdownContainer}>
          <Pressable
            style={[styles.dropdownTrigger, { borderColor: theme.icon }]}
            onPress={() => setDropdownOpen((prev) => !prev)}>
            <ThemedText>{selectedItem}</ThemedText>
            <IconSymbol name="chevron.right" size={16} color={theme.icon} />
          </Pressable>
          {dropdownOpen ? (
            <View style={[styles.dropdownList, { borderColor: theme.icon }]}>
              {dropdownItems.map((item, index) => (
                <Pressable
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedItem(item);
                    setDropdownOpen(false);
                  }}>
                  <ThemedText>{item}</ThemedText>
                  {index < dropdownItems.length - 1 ? (
                    <View style={[styles.divider, { backgroundColor: theme.icon }]} />
                  ) : null}
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 8,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  buttonTextOnly: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  iconOnlyButton: {
    borderWidth: 1,
    width: 40,
    alignItems: 'center',
  },
  filledText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    opacity: 0.6,
  },
  listContainer: {
    height: 180,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  expandedRow: {
    flexDirection: 'row',
    gap: 8,
  },
  expandedItem: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  itemTwo: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownContainer: {
    alignSelf: 'flex-start',
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  dropdownList: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
