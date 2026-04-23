import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TagInput } from '@/components/ui/tag-input';
import { Text } from '@/components/ui/text';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';
import { Pressable, View } from 'react-native';

const NOTICE_PERIODS = [
  'Immediately', '15 days', '30 days', '60 days', '90 days', '3+ months',
];

export type PreferencesData = {
  preferredRoles: string[];
  expectedSalary: string;
  preferredLocations: string[];
  noticePeriod: string;
  openToRelocation: boolean;
};

type Props = {
  data: PreferencesData;
  onUpdate: (data: PreferencesData) => void;
  mode: 'new' | 'update';
};

export function StepPreferences({ data, onUpdate, mode }: Props) {
  function update<K extends keyof PreferencesData>(
    key: K,
    value: PreferencesData[K]
  ) {
    onUpdate({ ...data, [key]: value });
  }

  return (
    <View className="gap-5">
      <View className="gap-1">
        <Text className="text-xl font-semibold">Preferences & Filters</Text>
        <Text className="text-muted-foreground text-sm">
          Help us find the right opportunities for you
        </Text>
      </View>

      {/* Preferred Roles */}
      <View className="gap-1.5">
        <Label>Preferred Roles</Label>
        <TagInput
          value={data.preferredRoles}
          onValueChange={(tags) => update('preferredRoles', tags)}
          placeholder="Add a role and press enter…"
        />
      </View>

      {/* Expected Salary */}
      <View className="gap-1.5">
        <Label htmlFor="salary">Expected Salary (Annual, ₹)</Label>
        <Input
          id="salary"
          value={data.expectedSalary}
          onChangeText={(v) => update('expectedSalary', v)}
          placeholder="e.g. 1200000"
          keyboardType="numeric"
        />
      </View>

      {/* Preferred Locations */}
      <View className="gap-1.5">
        <Label>Preferred Locations</Label>
        <TagInput
          value={data.preferredLocations}
          onValueChange={(tags) => update('preferredLocations', tags)}
          placeholder="Add a location and press enter…"
        />
      </View>

      {/* Notice Period */}
      <View className="gap-1.5">
        <Label>Notice Period</Label>
        <Select
          value={
            data.noticePeriod
              ? { value: data.noticePeriod, label: data.noticePeriod }
              : undefined
          }
          onValueChange={(option) =>
            update('noticePeriod', option?.value ?? '')
          }>
          <SelectTrigger>
            <SelectValue placeholder="Select notice period" />
          </SelectTrigger>
          <SelectContent>
            {NOTICE_PERIODS.map((period) => (
              <SelectItem key={period} value={period} label={period}>
                {period}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>

      {/* Open to Relocation */}
      <Pressable
        onPress={() => update('openToRelocation', !data.openToRelocation)}
        className="flex-row items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
        <Text className="text-foreground text-sm">Open to Relocation</Text>
        <Switch
          checked={data.openToRelocation}
          onCheckedChange={(val) => update('openToRelocation', val)}
        />
      </Pressable>
    </View>
  );
}
