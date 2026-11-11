import { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { ItemCard } from '@/components/ItemCard';
import { MACHINES } from '@/data/mockData';
import type { RootTabParamList } from '@/navigation/types';
import { useArcadeStore } from '@/store/useArcadeStore';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Machine } from '@/types';

function ItemSeparator() {
  return <View style={styles.separator} />;
}

function EmptyFavorites() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>Aún no tienes favoritas</Text>
      <Text style={styles.emptyHint}>Toca el corazón de una máquina para guardarla aquí.</Text>
    </View>
  );
}

export function FavoritesScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Favorites'>>();
  const favoriteIds = useArcadeStore((state) => state.favoriteIds);

  const favorites = useMemo(
    () => MACHINES.filter((machine) => favoriteIds.includes(machine.id)),
    [favoriteIds],
  );

  const renderItem: ListRenderItem<Machine> = useCallback(
    ({ item }) => (
      <ItemCard
        machine={item}
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'HomeDetail',
            params: { id: item.id, name: item.name },
          })
        }
      />
    ),
    [navigation],
  );

  return (
    <FlatList
      style={styles.screen}
      data={favorites}
      keyExtractor={(machine) => machine.id}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={EmptyFavorites}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.ink,
  },
  list: {
    flexGrow: 1,
    padding: SPACING.lg,
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
