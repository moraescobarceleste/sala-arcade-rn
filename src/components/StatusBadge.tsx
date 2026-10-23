import { StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import type { MachineStatus } from '@/types';

interface StatusBadgeProps {
  status: MachineStatus;
}

const STATUS_LABEL: Record<MachineStatus, string> = {
  available: 'Disponible',
  'in-use': 'En uso',
  maintenance: 'En mantenimiento',
  'out-of-service': 'Fuera de servicio',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, badgeVariants[status]]}>
      <Text style={styles.label}>{STATUS_LABEL[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  label: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.ink,
  },
});

const badgeVariants = StyleSheet.create({
  available: { backgroundColor: COLORS.screen },
  'in-use': { backgroundColor: COLORS.token },
  maintenance: { backgroundColor: '#F28C5B' },
  'out-of-service': { backgroundColor: COLORS.cabinet },
});
