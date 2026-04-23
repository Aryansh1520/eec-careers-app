import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TagInput } from '@/components/ui/tag-input';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';
import { Pressable, View } from 'react-native';

const AVAILABILITY_OPTIONS = [
  'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance',
];

export type FinalDetailsData = {
  strengths: string[];
  weaknesses: string[];
  careerGoals: string;
  availability: string;
  willingToAssess: boolean;
};

type Props = {
  data: FinalDetailsData;
  onUpdate: (data: FinalDetailsData) => void;
  mode: 'new' | 'update';
};

export function StepFinalDetails({ data, onUpdate, mode }: Props) {
  function update<K extends keyof FinalDetailsData>(
    key: K,
    value: FinalDetailsData[K]
  ) {
    onUpdate({ ...data, [key]: value });
  }

  return (
    <View className="gap-5">
      <View className="gap-1">
        <Text className="text-xl font-semibold">Final Details</Text>
        <Text className="text-muted-foreground text-sm">
          Almost there — just a few more things
        </Text>
      </View>

      {/* Strengths */}
      <View className="gap-1.5">
        <Label>Strengths</Label>
        <TagInput
          value={data.strengths}
          onValueChange={(tags) => update('strengths', tags)}
          placeholder="Add a strength and press enter…"
        />
      </View>

      {/* Weaknesses */}
      <View className="gap-1.5">
        <Label>Weaknesses</Label>
        <TagInput
          value={data.weaknesses}
          onValueChange={(tags) => update('weaknesses', tags)}
          placeholder="Add a weakness and press enter…"
        />
      </View>

      {/* Career Goals */}
      <View className="gap-1.5">
        <Label>Career Goals</Label>
        <Textarea
          value={data.careerGoals}
          onChangeText={(v) => update('careerGoals', v)}
          placeholder="Describe your short-term and long-term career goals…"
          numberOfLines={4}
        />
      </View>

      {/* Availability */}
      <View className="gap-1.5">
        <Label>Availability</Label>
        <Select
          value={
            data.availability
              ? { value: data.availability, label: data.availability }
              : undefined
          }
          onValueChange={(option) =>
            update('availability', option?.value ?? '')
          }>
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABILITY_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={opt} label={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>

      {/* Willing to take assessments */}
      <Pressable
        onPress={() => update('willingToAssess', !data.willingToAssess)}
        className="flex-row items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
        <Text className="text-foreground text-sm">
          Willing to take assessments
        </Text>
        <Switch
          checked={data.willingToAssess}
          onCheckedChange={(val) => update('willingToAssess', val)}
        />
      </Pressable>
    </View>
  );
}
