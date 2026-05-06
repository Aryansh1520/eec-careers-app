import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { StatusBanner } from './StatusBanner';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/lib/use-breakpoint';
import { useCompanyStatus } from '@/lib/company-status-context';
import {
  Send, AlertTriangle, CheckCircle, Circle,
  Briefcase, MapPin, DollarSign, FileText, ListChecks,
} from 'lucide-react-native';

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface FormData {
  jobTitle: string;
  employmentType: string;
  experienceLevel: string;
  city: string;
  country: string;
  workMode: string;
  salaryMin: string;
  salaryMax: string;
  skills: string;
  description: string;
  requirements: string;
}

const EMPTY_FORM: FormData = {
  jobTitle: '', employmentType: '', experienceLevel: '',
  city: '', country: '', workMode: '',
  salaryMin: '', salaryMax: '',
  skills: '', description: '', requirements: '',
};

// ─────────────────────────────────────────────────
// Sections (mirrors JobsPage's FiltersPanel concept)
// ─────────────────────────────────────────────────

const SECTIONS = [
  { id: 'basic', label: 'Basic info', icon: Briefcase },
  { id: 'details', label: 'Details & location', icon: MapPin },
  { id: 'compensation', label: 'Compensation', icon: DollarSign },
  { id: 'description', label: 'Description', icon: FileText },
  { id: 'skills', label: 'Requirements & skills', icon: ListChecks },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

function isSectionComplete(id: SectionId, form: FormData): boolean {
  switch (id) {
    case 'basic': return !!form.jobTitle;
    case 'details': return !!(form.employmentType && form.city);
    case 'compensation': return !!(form.salaryMin && form.salaryMax);
    case 'description': return !!form.description;
    case 'skills': return !!form.skills;
  }
}

// ─────────────────────────────────────────────────
// Left panel — section nav (like FiltersPanel)
// ─────────────────────────────────────────────────

function SectionNav({
  activeSection,
  onSelect,
  form,
}: {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
  form: FormData;
}) {
  const completedCount = SECTIONS.filter((s) => isSectionComplete(s.id, form)).length;
  const progress = completedCount / SECTIONS.length;

  return (
    <View className="flex-1 bg-secondary/30">
      <View className="px-4 pt-5 pb-3">
        <Text className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sections
        </Text>
      </View>

      {SECTIONS.map((section, i) => {
        const isActive = activeSection === section.id;
        const isDone = isSectionComplete(section.id, form);
        return (
          <Pressable
            key={section.id}
            onPress={() => onSelect(section.id)}
            className={cn(
              'flex-row items-center gap-3 px-4 py-3',
              isActive && 'bg-background border-r-2 border-primary'
            )}
          >
            {/* Step indicator */}
            <View
              className={cn(
                'size-5 rounded-full items-center justify-center border',
                isDone
                  ? 'bg-green-100 border-green-400'
                  : isActive
                    ? 'bg-primary/10 border-primary'
                    : 'border-border'
              )}
            >
              {isDone ? (
                <Icon as={CheckCircle} className="size-3 text-green-600" />
              ) : (
                <Text
                  className={cn(
                    'text-[9px] font-bold',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {i + 1}
                </Text>
              )}
            </View>
            <Text
              className={cn(
                'text-sm flex-1',
                isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}
            >
              {section.label}
            </Text>
          </Pressable>
        );
      })}

      {/* Progress bar at bottom */}
      <View className="px-4 pt-4 mt-auto border-t border-border">
        <View className="h-1 bg-border rounded-full overflow-hidden">
          <View
            className="h-1 bg-primary rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
        <Text className="text-xs text-muted-foreground mt-1.5">
          {completedCount} of {SECTIONS.length} sections complete
        </Text>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Right panel — live preview + checklist (like JobPreview)
// ─────────────────────────────────────────────────

const CHECKLIST_ITEMS: { label: string; key: keyof FormData }[] = [
  { label: 'Job title', key: 'jobTitle' },
  { label: 'Employment type', key: 'employmentType' },
  { label: 'Location', key: 'city' },
  { label: 'Salary range', key: 'salaryMin' },
  { label: 'Description', key: 'description' },
  { label: 'Required skills', key: 'skills' },
];

const TIPS = [
  'Salary transparency boosts applications by up to 30%.',
  'Keep required skills under 8 to avoid deterring candidates.',
  'Mention growth opportunities to attract senior talent.',
];

function PreviewPanel({ form }: { form: FormData }) {
  const skills = form.skills
    ? form.skills.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 5)
    : [];

  const randomTip = TIPS[0];

  return (
    <ScrollView className="flex-1 bg-secondary/30" contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Live preview card */}
      <View className="px-4 pt-5">
        <Text className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Live preview
        </Text>
        <View className="bg-background border border-border rounded-xl overflow-hidden">
          <View className="px-4 pt-4 pb-3 border-b border-border">
            <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
              {form.jobTitle || 'Job title'}
            </Text>
            {(form.city || form.country) ? (
              <Text className="text-xs text-muted-foreground mt-0.5">
                {[form.city, form.country].filter(Boolean).join(', ')}
                {form.workMode ? ` · ${form.workMode}` : ''}
              </Text>
            ) : (
              <Text className="text-xs text-muted-foreground mt-0.5 italic">
                Location not set
              </Text>
            )}
          </View>

          {/* Chips row */}
          <View className="flex-row flex-wrap gap-1.5 px-4 py-3 border-b border-border">
            {form.employmentType ? (
              <View className="bg-primary/10 rounded-full px-2.5 py-0.5">
                <Text className="text-xs text-primary">{form.employmentType}</Text>
              </View>
            ) : null}
            {form.experienceLevel ? (
              <View className="bg-secondary rounded-full border border-border px-2.5 py-0.5">
                <Text className="text-xs text-muted-foreground">{form.experienceLevel}</Text>
              </View>
            ) : null}
            {skills.map((s) => (
              <View key={s} className="bg-secondary rounded-full border border-border px-2.5 py-0.5">
                <Text className="text-xs text-muted-foreground">{s}</Text>
              </View>
            ))}
            {!form.employmentType && !form.experienceLevel && skills.length === 0 && (
              <Text className="text-xs text-muted-foreground italic">Fill the form to see a preview</Text>
            )}
          </View>

          {/* Salary */}
          {(form.salaryMin || form.salaryMax) && (
            <View className="px-4 py-3 border-b border-border">
              <Text className="text-xs text-muted-foreground">Salary (annual)</Text>
              <Text className="text-sm font-medium text-foreground mt-0.5">
                ₹{form.salaryMin || '—'} – ₹{form.salaryMax || '—'}
              </Text>
            </View>
          )}

          {/* Description preview */}
          {form.description ? (
            <View className="px-4 py-3">
              <Text className="text-xs text-foreground" numberOfLines={3}>
                {form.description}
              </Text>
            </View>
          ) : (
            <View className="px-4 py-3 gap-1.5">
              <View className="h-2 bg-border rounded-full w-4/5" />
              <View className="h-2 bg-border rounded-full w-3/5" />
              <View className="h-2 bg-border rounded-full w-11/12" />
            </View>
          )}
        </View>
      </View>

      {/* Checklist */}
      <View className="px-4 pt-5">
        <Text className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Checklist
        </Text>
        <View className="bg-background border border-border rounded-xl overflow-hidden">
          {CHECKLIST_ITEMS.map((item, i) => {
            const done = !!form[item.key];
            return (
              <View
                key={item.key}
                className={cn(
                  'flex-row items-center gap-2.5 px-4 py-2.5',
                  i < CHECKLIST_ITEMS.length - 1 && 'border-b border-border'
                )}
              >
                <Icon
                  as={done ? CheckCircle : Circle}
                  className={cn('size-4', done ? 'text-green-500' : 'text-muted-foreground opacity-40')}
                />
                <Text className={cn('text-xs flex-1', done ? 'text-foreground' : 'text-muted-foreground')}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Tip */}
      <View className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <Text className="text-xs text-amber-800 leading-relaxed">{randomTip}</Text>
      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────
// Center — form sections
// ─────────────────────────────────────────────────

function FormField({
  label, placeholder, value, onChangeText,
  keyboardType = 'default', multiline = false, height,
  disabled = false, hint,
}: {
  label: string; placeholder: string; value: string;
  onChangeText: (v: string) => void; keyboardType?: any;
  multiline?: boolean; height?: number; disabled?: boolean; hint?: string;
}) {
  return (
    <View className="gap-1.5 mb-4">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        keyboardType={keyboardType}
        multiline={multiline}
        style={height ? { height, textAlignVertical: 'top' } : undefined}
        className={cn(multiline && 'py-3', disabled && 'opacity-50')}
      />
      {hint && <Text className="text-xs text-muted-foreground">{hint}</Text>}
    </View>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View className="mb-5 pb-4 border-b border-border">
      <Text className="text-base font-semibold text-foreground">{title}</Text>
      {subtitle && <Text className="text-xs text-muted-foreground mt-0.5">{subtitle}</Text>}
    </View>
  );
}

function CenterForm({
  activeSection,
  form,
  setForm,
  isRestricted,
  onNext,
}: {
  activeSection: SectionId;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  isRestricted: boolean;
  onNext: () => void;
}) {
  const set = (key: keyof FormData) => (v: string) => setForm((f) => ({ ...f, [key]: v }));
  const disabled = isRestricted;

  const isLast = activeSection === 'skills';

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 24, paddingBottom: 48 }}
    >
      {activeSection === 'basic' && (
        <View>
          <SectionHeader title="Basic info" subtitle="Start with the essentials for your job posting." />
          <FormField label="Job title" placeholder="e.g. Senior React Developer" value={form.jobTitle} onChangeText={set('jobTitle')} disabled={disabled} />
        </View>
      )}

      {activeSection === 'details' && (
        <View>
          <SectionHeader title="Details & location" subtitle="Help candidates understand the role and where it's based." />
          <View className="flex-row gap-4">
            <View className="flex-1">
              <FormField label="Employment type" placeholder="e.g. Full-time" value={form.employmentType} onChangeText={set('employmentType')} disabled={disabled} />
            </View>
            <View className="flex-1">
              <FormField label="Experience level" placeholder="e.g. Mid-level" value={form.experienceLevel} onChangeText={set('experienceLevel')} disabled={disabled} />
            </View>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <FormField label="City" placeholder="e.g. Bangalore" value={form.city} onChangeText={set('city')} disabled={disabled} />
            </View>
            <View className="flex-1">
              <FormField label="Country" placeholder="e.g. India" value={form.country} onChangeText={set('country')} disabled={disabled} />
            </View>
          </View>
          <FormField label="Work mode" placeholder="Remote, Onsite, or Hybrid" value={form.workMode} onChangeText={set('workMode')} disabled={disabled} />
        </View>
      )}

      {activeSection === 'compensation' && (
        <View>
          <SectionHeader title="Compensation" subtitle="Salary transparency increases applications by up to 30%." />
          <View className="flex-row gap-4">
            <View className="flex-1">
              <FormField label="Minimum (annual)" placeholder="e.g. 800000" value={form.salaryMin} onChangeText={set('salaryMin')} keyboardType="numeric" disabled={disabled} />
            </View>
            <View className="flex-1">
              <FormField label="Maximum (annual)" placeholder="e.g. 1400000" value={form.salaryMax} onChangeText={set('salaryMax')} keyboardType="numeric" disabled={disabled} />
            </View>
          </View>
        </View>
      )}

      {activeSection === 'description' && (
        <View>
          <SectionHeader title="Job description" subtitle="Describe the role, team, and what success looks like." />
          <FormField
            label="Description"
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            value={form.description}
            onChangeText={set('description')}
            multiline height={180}
            disabled={disabled}
          />
        </View>
      )}

      {activeSection === 'skills' && (
        <View>
          <SectionHeader title="Requirements & skills" subtitle="Be specific but not exhaustive — aim for 5–8 skills." />
          <FormField
            label="Required skills"
            placeholder="e.g. React, TypeScript, Node.js"
            value={form.skills}
            onChangeText={set('skills')}
            hint="Comma-separated list of skills"
            disabled={disabled}
          />
          <FormField
            label="Requirements"
            placeholder="List key requirements, one per line..."
            value={form.requirements}
            onChangeText={set('requirements')}
            multiline height={120}
            disabled={disabled}
          />
        </View>
      )}

      {/* Nav footer */}
      <View className="flex-row items-center justify-between mt-2">
        <View /> {/* spacer */}
        {isLast ? (
          <Button disabled={isRestricted} className="flex-row gap-2">
            <Icon as={Send} className="size-4 text-primary-foreground" />
            <Text>Publish job</Text>
          </Button>
        ) : (
          <Button variant="outline" onPress={onNext} className="flex-row gap-2">
            <Text>Next section</Text>
          </Button>
        )}
      </View>

      {isRestricted && (
        <Text className="text-xs text-muted-foreground text-center mt-3">
          Publishing is disabled until your account is approved
        </Text>
      )}
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────
// Top bar (like JobSearchBar)
// ─────────────────────────────────────────────────

function TopBar({
  status,
  isRestricted,
}: {
  status: string;
  isRestricted: boolean;
}) {
  return (
    <View className="flex-row items-center gap-3 px-5 py-3 border-b border-border bg-background">
      <Icon as={Briefcase} className="size-4 text-muted-foreground" />
      <Text className="text-sm font-semibold text-foreground">Create job posting</Text>
      {isRestricted && (
        <View className="flex-row items-center gap-1 bg-amber-100 border border-amber-300 rounded-full px-2.5 py-0.5">
          <Icon as={AlertTriangle} className="size-3 text-amber-700" />
          <Text className="text-[10px] font-medium text-amber-800">Pending approval</Text>
        </View>
      )}
      <View className="ml-auto flex-row gap-2">
        <Button variant="outline" size="sm">
          <Text className="text-xs">Save draft</Text>
        </Button>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────

export function CreateJobForm() {
  const { status, isApproved } = useCompanyStatus();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isRestricted = !isApproved;

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [activeSection, setActiveSection] = useState<SectionId>('basic');

  const sectionIds = SECTIONS.map((s) => s.id) as SectionId[];

  const goNext = () => {
    const idx = sectionIds.indexOf(activeSection);
    if (idx < sectionIds.length - 1) setActiveSection(sectionIds[idx + 1]);
  };

  // ── MOBILE: original single-column flow ──────────────────────
  if (isMobile) {
    return (
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="w-full px-4 pt-4 gap-5">
          {isRestricted && <StatusBanner status={status} />}
          {isRestricted && (
            <View className="flex-row items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <Icon as={AlertTriangle} className="size-4 text-amber-600" />
              <Text className="text-xs text-muted-foreground flex-1">
                Job creation is disabled until your account is approved.
              </Text>
            </View>
          )}
          <Text className="text-xl font-bold text-foreground">Create New Job Posting</Text>
          {/* All fields in one scroll — unchanged mobile UX */}
          <View className="gap-1.5"><Label>Job title</Label><Input placeholder="e.g. Senior React Developer" editable={!isRestricted} /></View>
          <View className="gap-4 flex-row"><View className="flex-1 gap-1.5"><Label>Employment type</Label><Input placeholder="e.g. Full-time" editable={!isRestricted} /></View><View className="flex-1 gap-1.5"><Label>Experience level</Label><Input placeholder="e.g. Mid-level" editable={!isRestricted} /></View></View>
          <View className="gap-4 flex-row"><View className="flex-1 gap-1.5"><Label>City</Label><Input placeholder="Bangalore" editable={!isRestricted} /></View><View className="flex-1 gap-1.5"><Label>Country</Label><Input placeholder="India" editable={!isRestricted} /></View></View>
          <View className="gap-1.5"><Label>Work mode</Label><Input placeholder="Remote, Onsite, Hybrid" editable={!isRestricted} /></View>
          <View className="gap-4 flex-row"><View className="flex-1 gap-1.5"><Label>Min salary</Label><Input placeholder="800000" keyboardType="numeric" editable={!isRestricted} /></View><View className="flex-1 gap-1.5"><Label>Max salary</Label><Input placeholder="1400000" keyboardType="numeric" editable={!isRestricted} /></View></View>
          <View className="gap-1.5"><Label>Required skills</Label><Input placeholder="React, TypeScript, Node.js" editable={!isRestricted} /><Text className="text-xs text-muted-foreground">Comma-separated</Text></View>
          <View className="gap-1.5"><Label>Job description</Label><Input placeholder="Describe the role..." multiline numberOfLines={6} editable={!isRestricted} style={{ height: 140, textAlignVertical: 'top' }} className="py-3" /></View>
          <View className="gap-1.5"><Label>Requirements</Label><Input placeholder="List key requirements..." multiline numberOfLines={4} editable={!isRestricted} style={{ height: 100, textAlignVertical: 'top' }} className="py-3" /></View>
          <View className="mt-2 mb-4">
            <Button disabled={isRestricted} className="w-full flex-row gap-2">
              <Icon as={Send} className="size-4 text-primary-foreground" />
              <Text>Publish Job</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  // ── DESKTOP: 3-column, mirrors JobsPage exactly ───────────────
  return (
    <View className="flex-1 bg-background">
      {/* Top bar — like JobSearchBar */}
      <TopBar status={status} isRestricted={isRestricted} />

      {/* Restricted banner */}
      {isRestricted && (
        <View className="px-5 py-2 border-b border-border">
          <StatusBanner status={status} />
        </View>
      )}

      {/* Three columns */}
      <View className="flex-1 flex-row">
        {/* Left: section nav — like FiltersPanel, fixed width */}
        <View className="border-r border-border" style={{ width: 220 }}>
          <SectionNav
            activeSection={activeSection}
            onSelect={setActiveSection}
            form={form}
          />
        </View>

        {/* Center: active section form — like JobList, flex-1 */}
        <View className="flex-1 border-r border-border min-w-0">
          <CenterForm
            activeSection={activeSection}
            form={form}
            setForm={setForm}
            isRestricted={isRestricted}
            onNext={goNext}
          />
        </View>

        {/* Right: live preview + checklist — like JobPreview, fixed width */}
        <View style={{ width: 260 }} className="min-w-0">
          <PreviewPanel form={form} />
        </View>
      </View>
    </View>
  );
}
