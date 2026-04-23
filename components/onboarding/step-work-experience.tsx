import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TagInput } from '@/components/ui/tag-input';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';

export type WorkExperienceEntry = {
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  achievements: string[];
};

export type WorkExperienceData = {
  entries: WorkExperienceEntry[];
  skipped: boolean;
};

function emptyEntry(): WorkExperienceEntry {
  return {
    companyName: '',
    role: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
    achievements: [],
  };
}

type Props = {
  data: WorkExperienceData;
  onUpdate: (data: WorkExperienceData) => void;
  mode: 'new' | 'update';
};

export function StepWorkExperience({ data, onUpdate, mode }: Props) {
  function updateEntry(index: number, entry: WorkExperienceEntry) {
    const next = [...data.entries];
    next[index] = entry;
    onUpdate({ ...data, entries: next });
  }

  function addEntry() {
    onUpdate({ ...data, entries: [...data.entries, emptyEntry()] });
  }

  function removeEntry(index: number) {
    if (data.entries.length <= 1) return;
    const next = [...data.entries];
    next.splice(index, 1);
    onUpdate({ ...data, entries: next });
  }

  function toggleSkip() {
    onUpdate({ ...data, skipped: !data.skipped });
  }

  return (
    <View className="gap-5">
      <View className="gap-1">
        <Text className="text-xl font-semibold">Work Experience</Text>
        <Text className="text-muted-foreground text-sm">
          Share your professional journey
        </Text>
      </View>

      {/* Skip option */}
      <Pressable
        onPress={toggleSkip}
        className="bg-muted/40 flex-row items-center justify-between rounded-lg px-4 py-3">
        <Text className="text-foreground text-sm">
          I don't have work experience yet
        </Text>
        <Switch checked={data.skipped} onCheckedChange={toggleSkip} />
      </Pressable>

      {!data.skipped && (
        <>
          {data.entries.map((entry, index) => (
            <View
              key={index}
              className="bg-card border-border gap-4 rounded-xl border p-4">
              {/* Entry header */}
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground text-sm font-semibold">
                  Experience {index + 1}
                </Text>
                {data.entries.length > 1 && (
                  <Pressable
                    onPress={() => removeEntry(index)}
                    className={cn(
                      'rounded-md p-1.5',
                      Platform.select({
                        web: 'hover:bg-destructive/10 cursor-pointer',
                      })
                    )}>
                    <Icon as={Trash2} size={16} className="text-destructive" />
                  </Pressable>
                )}
              </View>

              {/* Company */}
              <View className="gap-1.5">
                <Label>Company Name</Label>
                <Input
                  value={entry.companyName}
                  onChangeText={(v) =>
                    updateEntry(index, { ...entry, companyName: v })
                  }
                  placeholder="e.g. Google"
                />
              </View>

              {/* Role */}
              <View className="gap-1.5">
                <Label>Role / Title</Label>
                <Input
                  value={entry.role}
                  onChangeText={(v) =>
                    updateEntry(index, { ...entry, role: v })
                  }
                  placeholder="e.g. Software Engineer"
                />
              </View>

              {/* Dates row */}
              <View className="flex-row gap-3">
                <View className="flex-1 gap-1.5">
                  <Label>Start Date</Label>
                  <DatePicker
                    value={entry.startDate || null}
                    placeholder="Start date"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Label>End Date</Label>
                  <DatePicker
                    value={entry.endDate || null}
                    placeholder="End date"
                    disabled={entry.currentlyWorking}
                  />
                </View>
              </View>

              {/* Currently working */}
              <Pressable
                onPress={() =>
                  updateEntry(index, {
                    ...entry,
                    currentlyWorking: !entry.currentlyWorking,
                    endDate: !entry.currentlyWorking ? '' : entry.endDate,
                  })
                }
                className="flex-row items-center gap-2">
                <Switch
                  checked={entry.currentlyWorking}
                  onCheckedChange={(val) =>
                    updateEntry(index, {
                      ...entry,
                      currentlyWorking: val,
                      endDate: val ? '' : entry.endDate,
                    })
                  }
                />
                <Text className="text-foreground text-sm">
                  Currently working here
                </Text>
              </Pressable>

              {/* Description */}
              <View className="gap-1.5">
                <Label>Description</Label>
                <Textarea
                  value={entry.description}
                  onChangeText={(v) =>
                    updateEntry(index, { ...entry, description: v })
                  }
                  placeholder="Briefly describe your role and responsibilities…"
                />
              </View>

              {/* Key Achievements */}
              <View className="gap-1.5">
                <Label>Key Achievements</Label>
                <TagInput
                  value={entry.achievements}
                  onValueChange={(tags) =>
                    updateEntry(index, { ...entry, achievements: tags })
                  }
                  placeholder="Add achievement and press enter…"
                />
              </View>
            </View>
          ))}

          {/* Add another */}
          <Button
            variant="outline"
            onPress={addEntry}
            className="flex-row gap-2">
            <Icon as={Plus} size={16} className="text-foreground" />
            <Text>Add Another Experience</Text>
          </Button>
        </>
      )}
    </View>
  );
}
