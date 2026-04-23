import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';

const QUALIFICATIONS = [
  'High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree',
  'PhD', 'Post-Doctoral', 'Other',
];

const GRADUATION_YEARS = Array.from(
  { length: 30 },
  (_, i) => String(2030 - i)
);

export type EducationEntry = {
  qualification: string;
  university: string;
  fieldOfStudy: string;
  graduationYear: string;
  cgpa: string;
};

export type EducationData = {
  entries: EducationEntry[];
};

function emptyEntry(): EducationEntry {
  return {
    qualification: '',
    university: '',
    fieldOfStudy: '',
    graduationYear: '',
    cgpa: '',
  };
}

type Props = {
  data: EducationData;
  onUpdate: (data: EducationData) => void;
  mode: 'new' | 'update';
};

export function StepEducation({ data, onUpdate, mode }: Props) {
  function updateEntry(index: number, entry: EducationEntry) {
    const next = [...data.entries];
    next[index] = entry;
    onUpdate({ entries: next });
  }

  function addEntry() {
    onUpdate({ entries: [...data.entries, emptyEntry()] });
  }

  function removeEntry(index: number) {
    if (data.entries.length <= 1) return;
    const next = [...data.entries];
    next.splice(index, 1);
    onUpdate({ entries: next });
  }

  return (
    <View className="gap-5">
      <View className="gap-1">
        <Text className="text-xl font-semibold">Education</Text>
        <Text className="text-muted-foreground text-sm">
          Add your educational background
        </Text>
      </View>

      {data.entries.map((entry, index) => (
        <View
          key={index}
          className="bg-card border-border gap-4 rounded-xl border p-4">
          {/* Entry header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-foreground text-sm font-semibold">
              Education {index + 1}
            </Text>
            {data.entries.length > 1 && (
              <Pressable
                onPress={() => removeEntry(index)}
                className={cn(
                  'rounded-md p-1.5',
                  Platform.select({ web: 'hover:bg-destructive/10 cursor-pointer' })
                )}>
                <Icon as={Trash2} size={16} className="text-destructive" />
              </Pressable>
            )}
          </View>

          {/* Qualification */}
          <View className="gap-1.5">
            <Label>Highest Qualification</Label>
            <Select
              value={
                entry.qualification
                  ? { value: entry.qualification, label: entry.qualification }
                  : undefined
              }
              onValueChange={(option) =>
                updateEntry(index, {
                  ...entry,
                  qualification: option?.value ?? '',
                })
              }>
              <SelectTrigger>
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                {QUALIFICATIONS.map((q) => (
                  <SelectItem key={q} value={q} label={q}>
                    {q}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </View>

          {/* University */}
          <View className="gap-1.5">
            <Label>University / College</Label>
            <Input
              value={entry.university}
              onChangeText={(v) =>
                updateEntry(index, { ...entry, university: v })
              }
              placeholder="e.g. IIT Delhi"
            />
          </View>

          {/* Field of Study */}
          <View className="gap-1.5">
            <Label>Field of Study</Label>
            <Input
              value={entry.fieldOfStudy}
              onChangeText={(v) =>
                updateEntry(index, { ...entry, fieldOfStudy: v })
              }
              placeholder="e.g. Computer Science"
            />
          </View>

          {/* Graduation Year & CGPA row */}
          <View className="flex-row gap-3">
            <View className="flex-1 gap-1.5">
              <Label>Graduation Year</Label>
              <Select
                value={
                  entry.graduationYear
                    ? { value: entry.graduationYear, label: entry.graduationYear }
                    : undefined
                }
                onValueChange={(option) =>
                  updateEntry(index, {
                    ...entry,
                    graduationYear: option?.value ?? '',
                  })
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {GRADUATION_YEARS.map((y) => (
                    <SelectItem key={y} value={y} label={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>
            <View className="flex-1 gap-1.5">
              <Label>CGPA / Percentage</Label>
              <Input
                value={entry.cgpa}
                onChangeText={(v) =>
                  updateEntry(index, { ...entry, cgpa: v })
                }
                placeholder="e.g. 8.5"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      ))}

      {/* Add another education */}
      <Button variant="outline" onPress={addEntry} className="flex-row gap-2">
        <Icon as={Plus} size={16} className="text-foreground" />
        <Text>Add Another Education</Text>
      </Button>
    </View>
  );
}
