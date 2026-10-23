import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Machine } from '@/types';

import { StatusBadge } from './StatusBadge';

interface ItemCardProps {
  machine: Machine;
}

export function ItemCard({ machine }: ItemCardProps) {
  const canPlay = machine.status === 'available';

  const handlePress = (): void => {
    Alert.alert(
      machine.name,
      canPlay
        ? `${machine.zone}. Cada partida cuesta ${machine.tokensPerPlay} fichas.`
        : `${machine.zone}. Esta máquina no está disponible ahora.`,
    );
  };

  return (
    <View style={styles.card}>
      <Image source={machine.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{machine.name}</Text>
        <Text style={styles.meta}>
          {machine.zone}, última revisión {machine.lastMaintenanceAt}
        </Text>
        <StatusBadge status={machine.status} />
        <View style={styles.footer}>
          <Text style={styles.cost}>{machine.tokensPerPlay} fichas</Text>
          <Pressable
            onPress={handlePress}
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
    </View>
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
  name: {
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
