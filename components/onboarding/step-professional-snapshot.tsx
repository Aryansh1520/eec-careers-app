import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TagInput } from '@/components/ui/tag-input';
import * as React from 'react';
import { Pressable, View } from 'react-native';

const STATUS_OPTIONS = ['Student', 'Working', 'Fresher', 'Freelancer'] as const;

const EXPERIENCE_OPTIONS = [
  '0-1 years', '1-2 years', '2-3 years', '3-5 years',
  '5-7 years', '7-10 years', '10+ years',
];

const ROLES = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Mobile Developer', 'DevOps Engineer', 'Data Scientist',
  'Product Manager', 'UI/UX Designer', 'QA Engineer',
  'Machine Learning Engineer', 'Cloud Architect', 'Security Engineer',
];

const JOB_TYPES = ['Remote', 'Hybrid', 'Onsite'] as const;

export type ProfessionalSnapshotData = {
  currentStatus: string;
  yearsOfExperience: string;
  primaryRole: string;
  skills: string[];
  preferredJobType: string[];
};

type Props = {
  data: ProfessionalSnapshotData;
  onUpdate: (data: ProfessionalSnapshotData) => void;
  mode: 'new' | 'update';
};

export function StepProfessionalSnapshot({ data, onUpdate, mode }: Props) {
  function update<K extends keyof ProfessionalSnapshotData>(
    key: K,
    value: ProfessionalSnapshotData[K]
  ) {
    onUpdate({ ...data, [key]: value });
  }

  function toggleJobType(type: string) {
    const current = data.preferredJobType;
    if (current.includes(type)) {
      update('preferredJobType', current.filter((t) => t !== type));
    } else {
      update('preferredJobType', [...current, type]);
    }
  }

  return (
    <View className="gap-5">
      <View className="gap-1">
        <Text className="text-xl font-semibold">Professional Snapshot</Text>
        <Text className="text-muted-foreground text-sm">
          Tell us about your career
        </Text>
      </View>

      {/* Current Status */}
      <View className="gap-2">
        <Label>Current Status</Label>
        <RadioGroup
          value={data.currentStatus}
          onValueChange={(val) => update('currentStatus', val)}>
          <View className="flex-row flex-wrap gap-3">
            {STATUS_OPTIONS.map((status) => (
              <Pressable
                key={status}
                onPress={() => update('currentStatus', status)}
                className="flex-row items-center gap-2">
                <RadioGroupItem value={status} />
                <Text className="text-foreground text-sm">{status}</Text>
              </Pressable>
            ))}
          </View>
        </RadioGroup>
      </View>

      {/* Years of Experience */}
      <View className="gap-1.5">
        <Label>Years of Experience</Label>
        <Select
          value={
            data.yearsOfExperience
              ? { value: data.yearsOfExperience, label: data.yearsOfExperience }
              : undefined
          }
          onValueChange={(option) =>
            update('yearsOfExperience', option?.value ?? '')
          }>
          <SelectTrigger>
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            {EXPERIENCE_OPTIONS.map((exp) => (
              <SelectItem key={exp} value={exp} label={exp}>
                {exp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>

      {/* Primary Role */}
      <View className="gap-1.5">
        <Label>Primary Role / Domain</Label>
        <Select
          value={
            data.primaryRole
              ? { value: data.primaryRole, label: data.primaryRole }
              : undefined
          }
          onValueChange={(option) =>
            update('primaryRole', option?.value ?? '')
          }>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((role) => (
              <SelectItem key={role} value={role} label={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>

      {/* Skills */}
      <View className="gap-1.5">
        <Label>Skills</Label>
        <TagInput
          value={data.skills}
          onValueChange={(tags) => update('skills', tags)}
          placeholder="Add a skill and press enter…"
        />
      </View>

      {/* Preferred Job Type */}
      <View className="gap-2">
        <Label>Preferred Job Type</Label>
        <View className="flex-row flex-wrap gap-4">
          {JOB_TYPES.map((type) => (
            <Pressable
              key={type}
              onPress={() => toggleJobType(type)}
              className="flex-row items-center gap-2">
              <Checkbox
                checked={data.preferredJobType.includes(type)}
                onCheckedChange={() => toggleJobType(type)}
              />
              <Text className="text-foreground text-sm">{type}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
