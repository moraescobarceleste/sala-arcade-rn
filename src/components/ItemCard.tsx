import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { GENRE_LABEL } from '@/data/labels';
import { useArcadeStore } from '@/store/useArcadeStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Machine } from '@/types';
import { formatTokens } from '@/utils/format';

import { StatusBadge } from './StatusBadge';

interface ItemCardProps {
  machine: Machine;
  onPress?: () => void;
}

export function ItemCard({ machine, onPress }: ItemCardProps) {
  const canPlay = machine.status === 'available';
  const isFavorite = useArcadeStore((state) => state.favoriteIds.includes(machine.id));
  const toggleFavorite = useArcadeStore((state) => state.toggleFavorite);
  const spendTokens = useArcadeStore((state) => state.spendTokens);

  const handleAction = (): void => {
    if (!canPlay) {
      onPress?.();
      return;
    }
    if (spendTokens(machine.tokensPerPlay)) {
      Alert.alert(machine.name, `Pagaste ${formatTokens(machine.tokensPerPlay)}. ¡Buena partida!`);
      return;
    }
    Alert.alert('Fichas insuficientes', `Necesitas ${formatTokens(machine.tokensPerPlay)}.`);
  };

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={machine.image} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{machine.name}</Text>
          <Pressable onPress={() => toggleFavorite(machine.id)} hitSlop={SPACING.sm}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? COLORS.cabinet : COLORS.muted}
            />
          </Pressable>
        </View>
        <Text style={styles.meta}>
          {GENRE_LABEL[machine.genre]}, {machine.zone}
        </Text>
        <Text style={styles.meta}>Última revisión {machine.lastMaintenanceAt}</Text>
        <StatusBadge status={machine.status} />
        <View style={styles.footer}>
          <Text style={styles.cost}>{formatTokens(machine.tokensPerPlay)}</Text>
          <Pressable
            onPress={handleAction}
            style={({ pressed }) => [
              styles.action,
              !canPlay && styles.actionDisabled,
              pressed && styles.actionPressed,
            ]}
          >
            <Text style={styles.actionLabel}>{canPlay ? 'Jugar' : 'Ver detalle'}</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.md,
  },
  info: {
    flex: 1,
    gap: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  name: {
    flex: 1,
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '700',
    color: COLORS.bone,
  },
  meta: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.muted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cost: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.token,
  },
  action: {
    backgroundColor: COLORS.token,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  actionDisabled: {
    backgroundColor: COLORS.surfaceRaised,
  },
  actionPressed: {
    opacity: 0.6,
    backgroundColor: COLORS.tokenDark,
  },
  actionLabel: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.bone,
  },
});
