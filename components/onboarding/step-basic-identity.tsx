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
import * as React from 'react';
import { View } from 'react-native';

const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Singapore', 'UAE', 'Netherlands',
];

const CITIES = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'New York', 'San Francisco', 'London',
  'Toronto', 'Sydney', 'Berlin', 'Singapore', 'Dubai',
];

export type BasicIdentityData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
};

type Props = {
  data: BasicIdentityData;
  onUpdate: (data: BasicIdentityData) => void;
  mode: 'new' | 'update';
};

export function StepBasicIdentity({ data, onUpdate, mode }: Props) {
  function update<K extends keyof BasicIdentityData>(
    key: K,
    value: BasicIdentityData[K]
  ) {
    onUpdate({ ...data, [key]: value });
  }

  return (
    <View className="gap-5">
      <View className="gap-1">
        <Text className="text-xl font-semibold">Basic Identity</Text>
        <Text className="text-muted-foreground text-sm">
          Tell us who you are
        </Text>
      </View>

      {/* Full Name */}
      <View className="gap-1.5">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChangeText={(v) => update('fullName', v)}
          placeholder="John Doe"
          autoComplete="name"
        />
      </View>

      {/* Email */}
      <View className="gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={data.email}
          onChangeText={(v) => update('email', v)}
          placeholder="john@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          editable={mode !== 'update'}
        />
        {mode === 'update' && (
          <Text className="text-muted-foreground text-xs">
            Email cannot be changed after verification
          </Text>
        )}
      </View>

      {/* Phone */}
      <View className="gap-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={data.phone}
          onChangeText={(v) => update('phone', v)}
          placeholder="+91 98765 43210"
          keyboardType="phone-pad"
          autoComplete="tel"
        />
      </View>

      {/* City */}
      <View className="gap-1.5">
        <Label>Current City</Label>
        <Select
          value={data.city ? { value: data.city, label: data.city } : undefined}
          onValueChange={(option) =>
            update('city', option?.value ?? '')
          }>
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((city) => (
              <SelectItem key={city} value={city} label={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>

      {/* Country */}
      <View className="gap-1.5">
        <Label>Country</Label>
        <Select
          value={
            data.country
              ? { value: data.country, label: data.country }
              : undefined
          }
          onValueChange={(option) =>
            update('country', option?.value ?? '')
          }>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country} label={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}
