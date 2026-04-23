import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

export type ResumeLinksData = {
  resumeFileName: string;
  linkedIn: string;
  github: string;
  personalWebsite: string;
};

type Props = {
  data: ResumeLinksData;
  onUpdate: (data: ResumeLinksData) => void;
  mode: 'new' | 'update';
};

export function StepResumeLinks({ data, onUpdate, mode }: Props) {
  function update<K extends keyof ResumeLinksData>(
    key: K,
    value: ResumeLinksData[K]
  ) {
    onUpdate({ ...data, [key]: value });
  }

  return (
    <View className="gap-5">
      <View className="gap-1">
        <Text className="text-xl font-semibold">Resume & Links</Text>
        <Text className="text-muted-foreground text-sm">
          Upload your resume and share your online profiles
        </Text>
      </View>

      {/* Resume Upload */}
      <View className="gap-1.5">
        <Label>Resume</Label>
        <FileUpload
          fileName={data.resumeFileName || null}
          onPress={() => {
            // UI only — placeholder for file picker
            update('resumeFileName', 'resume_john_doe.pdf');
          }}
        />
      </View>

      {/* LinkedIn */}
      <View className="gap-1.5">
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          value={data.linkedIn}
          onChangeText={(v) => update('linkedIn', v)}
          placeholder="https://linkedin.com/in/your-profile"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      {/* GitHub / Portfolio */}
      <View className="gap-1.5">
        <Label htmlFor="github">GitHub / Portfolio</Label>
        <Input
          id="github"
          value={data.github}
          onChangeText={(v) => update('github', v)}
          placeholder="https://github.com/your-username"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      {/* Personal Website */}
      <View className="gap-1.5">
        <Label htmlFor="website">Personal Website</Label>
        <Input
          id="website"
          value={data.personalWebsite}
          onChangeText={(v) => update('personalWebsite', v)}
          placeholder="https://your-website.com"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
