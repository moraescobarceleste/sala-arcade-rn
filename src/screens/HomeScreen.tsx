import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ItemCard } from '@/components/ItemCard';
import { MACHINES } from '@/data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Machine } from '@/types';
import { filterMachines } from '@/utils/search';

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export function HomeScreen() {
  const [query, setQuery] = useState('');

  const visibleMachines = useMemo(() => filterMachines(MACHINES, query), [query]);
  const availableCount = useMemo(
    () => MACHINES.filter((machine) => machine.status === 'available').length,
    [],
  );

  const renderItem: ListRenderItem<Machine> = useCallback(
    ({ item }) => <ItemCard machine={item} />,
    [],
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Ninguna máquina coincide con «{query.trim()}»</Text>
        <Text style={styles.emptyHint}>Prueba con el nombre, el género o la zona.</Text>
      </View>
    ),
    [query],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sala Arcade</Text>
          <Text style={styles.subtitle}>
            {MACHINES.length} máquinas, {availableCount} disponibles
          </Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por nombre, género o zona"
            placeholderTextColor={COLORS.muted}
            style={styles.search}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
        <FlatList
          data={visibleMachines}
          keyExtractor={(machine) => machine.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.ink,
  },
  flex: {
    flex: 1,
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
    marginBottom: SPACING.sm,
  },
  search: {
    backgroundColor: COLORS.surface,
    color: COLORS.bone,
    fontSize: TYPOGRAPHY.body,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  separator: {
    height: SPACING.md,
  },
  empty: {
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.xl,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '700',
    color: COLORS.bone,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    textAlign: 'center',
  },
});
