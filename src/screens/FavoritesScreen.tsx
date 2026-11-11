import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { ItemCard } from '@/components/ItemCard';
import { MACHINES } from '@/data/mockData';
import type { RootTabParamList } from '@/navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Machine } from '@/types';

const FAVORITES: Machine[] = MACHINES.slice(0, 3);

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export function FavoritesScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Favorites'>>();

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
      data={FAVORITES}
      keyExtractor={(machine) => machine.id}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <Text style={styles.hint}>Lista fija por ahora. Pasará a Zustand en la semana 4.</Text>
      }
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
    padding: SPACING.lg,
  },
  hint: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.muted,
    marginBottom: SPACING.md,
  },
  separator: {
    height: SPACING.md,
  },
});
