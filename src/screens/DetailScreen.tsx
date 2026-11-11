import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import { StatusBadge } from '@/components/StatusBadge';
import { GENRE_LABEL } from '@/data/labels';
import { MACHINES } from '@/data/mockData';
import type { HomeStackParamList } from '@/navigation/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { formatTokens } from '@/utils/format';

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function DetailScreen() {
  const { params } = useRoute<RouteProp<HomeStackParamList, 'HomeDetail'>>();
  const machine = MACHINES.find((item) => item.id === params.id);

  if (!machine) {
    return (
      <View style={styles.missing}>
        <Text style={styles.name}>No encontramos «{params.name}»</Text>
        <Text style={styles.label}>Código: {params.id}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image source={machine.image} style={styles.image} />
      <Text style={styles.name}>{machine.name}</Text>
      <StatusBadge status={machine.status} />
      <View style={styles.card}>
        <DetailRow label="Código" value={params.id} />
        <DetailRow label="Género" value={GENRE_LABEL[machine.genre]} />
        <DetailRow label="Zona" value={machine.zone} />
        <DetailRow label="Costo por partida" value={formatTokens(machine.tokensPerPlay)} />
        <DetailRow label="Última revisión" value={machine.lastMaintenanceAt} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.ink,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.ink,
    padding: SPACING.lg,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: RADIUS.lg,
  },
  name: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    color: COLORS.token,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
  },
  value: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.bone,
    flexShrink: 1,
    textAlign: 'right',
  },
});
