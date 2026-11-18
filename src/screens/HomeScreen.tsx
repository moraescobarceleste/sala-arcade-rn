import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ItemCard } from '@/components/ItemCard';
import { useMachines } from '@/hooks/useMachines';
import type { HomeStackParamList } from '@/navigation/types';
import { useArcadeStore } from '@/store/useArcadeStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Machine } from '@/types';
import { formatTokens } from '@/utils/format';
import { filterMachines } from '@/utils/search';

const NO_MACHINES: Machine[] = [];

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'HomeList'>>();
  const [query, setQuery] = useState('');
  const tokenBalance = useArcadeStore((state) => state.tokenBalance);
  const { data, isPending, isError, isRefetching, refetch } = useMachines();

  const machines = data ?? NO_MACHINES;
  const visibleMachines = useMemo(() => filterMachines(machines, query), [machines, query]);
  const availableCount = useMemo(
    () => machines.filter((machine) => machine.status === 'available').length,
    [machines],
  );

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const renderItem: ListRenderItem<Machine> = useCallback(
    ({ item }) => (
      <ItemCard
        machine={item}
        onPress={() => navigation.navigate('HomeDetail', { id: item.id, name: item.name })}
      />
    ),
    [navigation],
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

  const renderBody = () => {
    if (isPending) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.token} />
          <Text style={styles.emptyHint}>Cargando máquinas...</Text>
        </View>
      );
    }
    if (isError) {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>No pudimos cargar las máquinas</Text>
          <Pressable onPress={handleRefresh} style={styles.retry}>
            <Text style={styles.retryLabel}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }
    return (
      <FlatList
        data={visibleMachines}
        keyExtractor={(machine) => machine.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshing={isRefetching}
        onRefresh={handleRefresh}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sala Arcade</Text>
          <Text style={styles.subtitle}>
            {machines.length} máquinas, {availableCount} disponibles
          </Text>
          <Text style={styles.balance}>Tu saldo: {formatTokens(tokenBalance)}</Text>
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
        {renderBody()}
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
  },
  balance: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.screen,
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
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
  retry: {
    backgroundColor: COLORS.token,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  retryLabel: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.ink,
  },
});
