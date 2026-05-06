import React from 'react';
import { View, ScrollView, Pressable, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/lib/use-breakpoint';
import { usePersistentTheme } from '@/lib/theme-store';
import { companyProfile } from '@/lib/company-data';
import { useRouter } from 'expo-router';
import {
  Camera,
  ImageIcon,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Building2,
  MapPin,
  Users,
  Calendar,
} from 'lucide-react-native';

export function CompanyProfileForm() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const { theme, toggleTheme } = usePersistentTheme();
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        paddingBottom: isMobile ? 120 : 64,
      }}
    >
      <View className={cn('w-full px-4 pt-4 gap-6', !isMobile && 'self-center max-w-[800px] px-6 pt-6')}>
        {/* Banner Upload */}
        <View className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <Pressable className="h-[140px] bg-primary-soft items-center justify-center">
            <View className="items-center gap-2">
              <View className="size-10 rounded-full bg-background/60 items-center justify-center">
                <Icon as={ImageIcon} className="size-5 text-muted-foreground" />
              </View>
              <Text className="text-xs text-muted-foreground font-medium">Tap to upload banner</Text>
            </View>
          </Pressable>

          {/* Logo Upload */}
          <View className="px-4 -mt-10 mb-4">
            <Pressable className="size-20 rounded-2xl bg-card border-2 border-border items-center justify-center shadow-sm">
              <View className="items-center gap-1">
                <Icon as={Camera} className="size-5 text-muted-foreground" />
                <Text className="text-[9px] text-muted-foreground">Logo</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Company Name */}
        <View className="gap-2">
          <Label className="text-sm font-medium text-foreground">Company Name</Label>
          <Input defaultValue={companyProfile.name} />
        </View>

        {/* Industry + Size */}
        <View className={cn('gap-4', !isMobile && 'flex-row')}>
          <View className={cn('gap-2', !isMobile && 'flex-1')}>
            <Label className="text-sm font-medium text-foreground">Industry</Label>
            <Input defaultValue={companyProfile.industry} />
          </View>
          <View className={cn('gap-2', !isMobile && 'flex-1')}>
            <Label className="text-sm font-medium text-foreground">Company Size</Label>
            <Input defaultValue={companyProfile.size} />
          </View>
        </View>

        {/* Location */}
        <View className="gap-2">
          <Label className="text-sm font-medium text-foreground">Location</Label>
          <Input defaultValue={companyProfile.location} />
        </View>

        {/* Website */}
        <View className="gap-2">
          <Label className="text-sm font-medium text-foreground">Website</Label>
          <Input defaultValue={companyProfile.website} keyboardType="url" />
        </View>

        {/* Description */}
        <View className="gap-2">
          <Label className="text-sm font-medium text-foreground">About</Label>
          <Input
            defaultValue={companyProfile.description}
            multiline
            numberOfLines={4}
            style={{ height: 100, textAlignVertical: 'top' }}
            className="py-3"
          />
        </View>

        {/* Founded */}
        <View className="gap-2">
          <Label className="text-sm font-medium text-foreground">Founded Year</Label>
          <Input defaultValue={companyProfile.founded} keyboardType="numeric" />
        </View>

        {/* Social Links */}
        <View className="gap-3">
          <Text className="text-sm font-semibold text-foreground uppercase tracking-widest">Social Links</Text>
          <View className="gap-3">
            <View className="flex-row items-center gap-3">
              <View className="size-9 rounded-xl bg-[var(--color-blue-soft)] items-center justify-center">
                <Icon as={Linkedin} className="size-4 text-[var(--color-blue)]" />
              </View>
              <View className="flex-1">
                <Input defaultValue={companyProfile.social_links.linkedin} placeholder="LinkedIn URL" />
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="size-9 rounded-xl bg-muted items-center justify-center">
                <Icon as={Twitter} className="size-4 text-foreground" />
              </View>
              <View className="flex-1">
                <Input defaultValue={companyProfile.social_links.twitter} placeholder="Twitter URL" />
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="size-9 rounded-xl bg-muted items-center justify-center">
                <Icon as={Github} className="size-4 text-foreground" />
              </View>
              <View className="flex-1">
                <Input defaultValue={companyProfile.social_links.github} placeholder="GitHub URL" />
              </View>
            </View>
          </View>
        </View>

        {/* Theme Toggle */}
        <View className="flex-row items-center justify-between border border-border/50 bg-muted/20 p-4 rounded-xl">
          <Label className="text-base" onPress={toggleTheme}>Dark Mode</Label>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </View>

        {/* Save + Logout */}
        <Button className="w-full">
          <Text>Save Changes</Text>
        </Button>

        <Button
          onPress={() => router.replace('/login')}
          className="w-full mb-4"
          variant="destructive"
        >
          <Text>Log out</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
