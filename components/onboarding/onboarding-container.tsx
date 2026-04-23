import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { OnboardingProgress } from './onboarding-progress';
import {
  StepBasicIdentity,
  type BasicIdentityData,
} from './step-basic-identity';
import {
  StepProfessionalSnapshot,
  type ProfessionalSnapshotData,
} from './step-professional-snapshot';
import { StepEducation, type EducationData } from './step-education';
import {
  StepWorkExperience,
  type WorkExperienceData,
} from './step-work-experience';
import { StepResumeLinks, type ResumeLinksData } from './step-resume-links';
import { StepPreferences, type PreferencesData } from './step-preferences';
import {
  StepFinalDetails,
  type FinalDetailsData,
} from './step-final-details';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  LogOut,
} from 'lucide-react-native';
import * as React from 'react';
import { Platform, View } from 'react-native';
import Animated, {
  FadeInRight,
  FadeInLeft,
  FadeOutLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';

/* ─── Form Data Shape ─── */
export type OnboardingFormData = {
  basicIdentity: BasicIdentityData;
  professionalSnapshot: ProfessionalSnapshotData;
  education: EducationData;
  workExperience: WorkExperienceData;
  resumeLinks: ResumeLinksData;
  preferences: PreferencesData;
  finalDetails: FinalDetailsData;
};

/* ─── Defaults ─── */
function emptyFormData(): OnboardingFormData {
  return {
    basicIdentity: {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      country: '',
    },
    professionalSnapshot: {
      currentStatus: '',
      yearsOfExperience: '',
      primaryRole: '',
      skills: [],
      preferredJobType: [],
    },
    education: {
      entries: [
        {
          qualification: '',
          university: '',
          fieldOfStudy: '',
          graduationYear: '',
          cgpa: '',
        },
      ],
    },
    workExperience: {
      entries: [
        {
          companyName: '',
          role: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          description: '',
          achievements: [],
        },
      ],
      skipped: false,
    },
    resumeLinks: {
      resumeFileName: '',
      linkedIn: '',
      github: '',
      personalWebsite: '',
    },
    preferences: {
      preferredRoles: [],
      expectedSalary: '',
      preferredLocations: [],
      noticePeriod: '',
      openToRelocation: false,
    },
    finalDetails: {
      strengths: [],
      weaknesses: [],
      careerGoals: '',
      availability: '',
      willingToAssess: false,
    },
  };
}

function mockFormData(): OnboardingFormData {
  return {
    basicIdentity: {
      fullName: 'Aryan Sharma',
      email: 'aryan@example.com',
      phone: '+91 98765 43210',
      city: 'Bangalore',
      country: 'India',
    },
    professionalSnapshot: {
      currentStatus: 'Working',
      yearsOfExperience: '3-5 years',
      primaryRole: 'Full Stack Developer',
      skills: ['React', 'TypeScript', 'Node.js', 'Python'],
      preferredJobType: ['Remote', 'Hybrid'],
    },
    education: {
      entries: [
        {
          qualification: "Bachelor's Degree",
          university: 'IIT Delhi',
          fieldOfStudy: 'Computer Science',
          graduationYear: '2021',
          cgpa: '8.7',
        },
      ],
    },
    workExperience: {
      entries: [
        {
          companyName: 'TechCorp',
          role: 'Software Engineer',
          startDate: 'Jan 2022',
          endDate: '',
          currentlyWorking: true,
          description: 'Building scalable web applications and APIs.',
          achievements: ['Led migration to microservices', 'Reduced load time by 40%'],
        },
      ],
      skipped: false,
    },
    resumeLinks: {
      resumeFileName: 'aryan_resume_2024.pdf',
      linkedIn: 'https://linkedin.com/in/aryan-sharma',
      github: 'https://github.com/aryan-sharma',
      personalWebsite: 'https://aryan.dev',
    },
    preferences: {
      preferredRoles: ['Full Stack Developer', 'Frontend Lead'],
      expectedSalary: '2500000',
      preferredLocations: ['Bangalore', 'Remote'],
      noticePeriod: '30 days',
      openToRelocation: true,
    },
    finalDetails: {
      strengths: ['Problem Solving', 'Team Leadership', 'Quick Learner'],
      weaknesses: ['Perfectionism', 'Over-commitment'],
      careerGoals:
        'Aspiring to lead engineering teams and build products that impact millions.',
      availability: 'Full-time',
      willingToAssess: true,
    },
  };
}

/* ─── Props ─── */
type Props = {
  mode: 'new' | 'update';
  onComplete: () => void;
  onSaveExit: () => void;
};

const TOTAL_STEPS = 7;

export function OnboardingContainer({ mode, onComplete, onSaveExit }: Props) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [direction, setDirection] = React.useState<'forward' | 'back'>(
    'forward'
  );
  const [formData, setFormData] = React.useState<OnboardingFormData>(
    mode === 'update' ? mockFormData() : emptyFormData()
  );

  function goNext() {
    if (currentStep < TOTAL_STEPS - 1) {
      setDirection('forward');
      setCurrentStep((s) => s + 1);
    } else {
      onComplete();
    }
  }

  function goBack() {
    if (currentStep > 0) {
      setDirection('back');
      setCurrentStep((s) => s - 1);
    }
  }

  function updateSection<K extends keyof OnboardingFormData>(
    key: K,
    value: OnboardingFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const isFirst = currentStep === 0;
  const isLast = currentStep === TOTAL_STEPS - 1;

  const enteringAnim =
    direction === 'forward'
      ? FadeInRight.duration(300)
      : FadeInLeft.duration(300);

  return (
    <View className="flex-1 gap-6">
      {/* Top progress */}
      <OnboardingProgress currentStep={currentStep} />

      {/* Step content */}
      <View className="flex-1">
        <Animated.View key={currentStep} entering={enteringAnim} className="flex-1">
          {currentStep === 0 && (
            <StepBasicIdentity
              data={formData.basicIdentity}
              onUpdate={(d) => updateSection('basicIdentity', d)}
              mode={mode}
            />
          )}
          {currentStep === 1 && (
            <StepProfessionalSnapshot
              data={formData.professionalSnapshot}
              onUpdate={(d) => updateSection('professionalSnapshot', d)}
              mode={mode}
            />
          )}
          {currentStep === 2 && (
            <StepEducation
              data={formData.education}
              onUpdate={(d) => updateSection('education', d)}
              mode={mode}
            />
          )}
          {currentStep === 3 && (
            <StepWorkExperience
              data={formData.workExperience}
              onUpdate={(d) => updateSection('workExperience', d)}
              mode={mode}
            />
          )}
          {currentStep === 4 && (
            <StepResumeLinks
              data={formData.resumeLinks}
              onUpdate={(d) => updateSection('resumeLinks', d)}
              mode={mode}
            />
          )}
          {currentStep === 5 && (
            <StepPreferences
              data={formData.preferences}
              onUpdate={(d) => updateSection('preferences', d)}
              mode={mode}
            />
          )}
          {currentStep === 6 && (
            <StepFinalDetails
              data={formData.finalDetails}
              onUpdate={(d) => updateSection('finalDetails', d)}
              mode={mode}
            />
          )}
        </Animated.View>
      </View>

      {/* Bottom navigation */}
      <View className="gap-3 pb-2">
        <View className="flex-row gap-3">
          {/* Back */}
          <Button
            variant="outline"
            onPress={goBack}
            disabled={isFirst}
            className={cn('flex-1 flex-row gap-2', isFirst && 'opacity-40')}>
            <Icon as={ArrowLeft} size={16} className="text-foreground" />
            <Text>Back</Text>
          </Button>

          {/* Next / Complete */}
          <Button
            onPress={goNext}
            className="flex-1 flex-row gap-2">
            <Text>{isLast ? 'Complete' : 'Next'}</Text>
            <Icon
              as={isLast ? CheckCircle : ArrowRight}
              size={16}
              className="text-primary-foreground"
            />
          </Button>
        </View>

        {/* Save & Exit — only in update mode */}
        {mode === 'update' && (
          <Button
            variant="ghost"
            onPress={onSaveExit}
            className="flex-row gap-2">
            <Icon as={LogOut} size={14} className="text-muted-foreground" />
            <Text className="text-muted-foreground text-sm">Save & Exit</Text>
          </Button>
        )}
      </View>
    </View>
  );
}
