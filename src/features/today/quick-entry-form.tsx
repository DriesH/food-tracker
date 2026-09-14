import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { addQuickEntry, deleteLogEntry, updateQuickEntry, useLogEntry } from '@/db/log-entries';
import type { LogEntry, Meal } from '@/db/schema';
import { Button } from '@/ui/components/button';
import { Screen } from '@/ui/components/screen';
import { TextField } from '@/ui/components/text-field';
import { Typography } from '@/ui/components/typography';
import { isValidOptionalAmount, parseDecimal } from '@/ui/format';

type QuickEntryFormProps = {
  id: number | null;
  date?: string;
  meal?: Meal;
};

export function QuickEntryForm({ id, date, meal }: QuickEntryFormProps) {
  const entry = useLogEntry(id);

  if (id !== null) {
    return entry && <QuickEntryFields entry={entry} />;
  }

  return date && meal ? <QuickEntryFields date={date} meal={meal} /> : null;
}

type QuickEntryFieldsProps = { entry: LogEntry } | { entry?: undefined; date: string; meal: Meal };

function QuickEntryFields(props: QuickEntryFieldsProps) {
  const { entry } = props;
  const [name, setName] = useState(entry?.name ?? '');
  const [kcal, setKcal] = useState(toInput(entry?.kcal));
  const [protein, setProtein] = useState(toInput(entry?.protein));
  const [carbs, setCarbs] = useState(toInput(entry?.carbs));
  const [fat, setFat] = useState(toInput(entry?.fat));

  const kcalValue = parseDecimal(kcal);
  const isValid =
    name.trim() !== '' &&
    kcalValue !== null &&
    kcalValue > 0 &&
    [protein, carbs, fat].every(isValidOptionalAmount);

  async function save() {
    if (!isValid) {
      return;
    }

    const values = {
      name: name.trim(),
      kcal: kcalValue,
      protein: parseDecimal(protein),
      carbs: parseDecimal(carbs),
      fat: parseDecimal(fat),
    };

    if (props.entry) {
      await updateQuickEntry(props.entry.id, values);
    } else {
      await addQuickEntry(props.date, props.meal, values);
    }

    router.back();
  }

  async function remove() {
    if (props.entry) {
      await deleteLogEntry(props.entry.id);
      router.back();
    }
  }

  return (
    <Screen>
      <Typography variant="heading">{entry ? 'Edit entry' : 'Quick Entry'}</Typography>

      <TextField label="Name" value={name} onChangeText={setName} placeholder="Restaurant pasta" autoFocus={!entry} />
      <TextField label="Energy" suffix="kcal" value={kcal} onChangeText={setKcal} keyboardType="decimal-pad" />
      <TextField
        label="Protein"
        suffix="g"
        value={protein}
        onChangeText={setProtein}
        keyboardType="decimal-pad"
        placeholder="Optional"
      />
      <TextField
        label="Carbs"
        suffix="g"
        value={carbs}
        onChangeText={setCarbs}
        keyboardType="decimal-pad"
        placeholder="Optional"
      />
      <TextField label="Fat" suffix="g" value={fat} onChangeText={setFat} keyboardType="decimal-pad" placeholder="Optional" />

      <View style={styles.actions}>
        <Button title="Save" disabled={!isValid} onPress={save} />
        {entry && <Button title="Delete" variant="destructive" onPress={remove} />}
      </View>
    </Screen>
  );
}

function toInput(value: number | null | undefined): string {
  return value === null || value === undefined ? '' : String(value);
}

const styles = StyleSheet.create((theme) => ({
  actions: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
}));
