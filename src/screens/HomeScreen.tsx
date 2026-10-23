import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ItemCard } from '@/components/ItemCard';
import { MACHINES } from '@/data/mockData';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export function HomeScreen() {
  const available = MACHINES.filter((machine) => machine.status === 'available').length;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Sala Arcade</Text>
        <Text style={styles.subtitle}>
          {MACHINES.length} máquinas, {available} disponibles
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {MACHINES.map((machine) => (
          <ItemCard key={machine.id} machine={machine} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.ink,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.xs,
  },
  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    color: COLORS.token,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
});
