// ──────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────

export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'freelance';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
export type LocationType = 'remote' | 'hybrid' | 'onsite';

export interface Company {
  id: string;
  name: string;
  logo_url: string;
}

export interface JobLocation {
  type: LocationType;
  city: string | null;
  country: string;
}

export interface Salary {
  min: number;
  max: number;
  currency: string;
  visible: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: JobLocation;
  employment_type: EmploymentType;
  experience_level: ExperienceLevel;
  salary: Salary;
  skills: string[];
  tags: string[];
  posted_at: string;
  expires_at: string;
  is_saved: boolean;
  has_applied: boolean;
  description: string;
  requirements: string[];
}

// ──────────────────────────────────────────────────
// Filter option labels
// ──────────────────────────────────────────────────

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
  freelance: 'Freelance',
};

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  entry: 'Entry Level',
  mid: 'Mid Level',
  senior: 'Senior',
  lead: 'Lead',
  executive: 'Executive',
};

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
};

// ──────────────────────────────────────────────────
// Filter state type
// ──────────────────────────────────────────────────

export interface JobFilters {
  employmentTypes: EmploymentType[];
  experienceLevels: ExperienceLevel[];
  locationTypes: LocationType[];
  skills: string[];
}

export const EMPTY_FILTERS: JobFilters = {
  employmentTypes: [],
  experienceLevels: [],
  locationTypes: [],
  skills: [],
};

// ──────────────────────────────────────────────────
// Sort options
// ──────────────────────────────────────────────────

export type SortOption = 'newest' | 'salary_high' | 'salary_low';

export const SORT_LABELS: Record<SortOption, string> = {
  newest: 'Newest First',
  salary_high: 'Salary: High → Low',
  salary_low: 'Salary: Low → High',
};

// ──────────────────────────────────────────────────
// All unique skills (for filter panel)
// ──────────────────────────────────────────────────

export const ALL_SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
  'CSS', 'Next.js', 'GraphQL', 'AWS', 'Docker',
  'Figma', 'Swift', 'Kotlin', 'Go', 'SQL',
  'React Native', 'Vue.js', 'Java', 'Rust', 'Kubernetes',
];

// ──────────────────────────────────────────────────
// Dummy data
// ──────────────────────────────────────────────────

export const DUMMY_JOBS: Job[] = [
  {
    id: 'job_001',
    title: 'Frontend Engineer',
    company: { id: 'comp_1', name: 'Acme Inc', logo_url: '' },
    location: { type: 'remote', city: null, country: 'India' },
    employment_type: 'full_time',
    experience_level: 'mid',
    salary: { min: 800000, max: 1500000, currency: 'INR', visible: true },
    skills: ['React', 'TypeScript', 'CSS'],
    tags: ['remote-friendly', 'startup'],
    posted_at: '2026-04-20T10:00:00Z',
    expires_at: '2026-05-20T10:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'We are looking for a talented Frontend Engineer to build beautiful, performant web interfaces using React and TypeScript. You will work closely with designers and backend engineers to deliver pixel-perfect experiences.',
    requirements: ['3+ years of React experience', 'Strong TypeScript skills', 'Experience with CSS-in-JS or Tailwind', 'Familiarity with REST & GraphQL APIs'],
  },
  {
    id: 'job_002',
    title: 'Senior Backend Developer',
    company: { id: 'comp_2', name: 'TechCorp Global', logo_url: '' },
    location: { type: 'hybrid', city: 'Bangalore', country: 'India' },
    employment_type: 'full_time',
    experience_level: 'senior',
    salary: { min: 2000000, max: 3500000, currency: 'INR', visible: true },
    skills: ['Node.js', 'Python', 'AWS', 'Docker'],
    tags: ['benefits', 'growth'],
    posted_at: '2026-04-18T08:30:00Z',
    expires_at: '2026-05-18T08:30:00Z',
    is_saved: true,
    has_applied: false,
    description: 'Join our backend team to design and scale distributed systems powering millions of users. You will lead architecture decisions and mentor junior engineers.',
    requirements: ['5+ years backend experience', 'Node.js or Python proficiency', 'AWS infrastructure knowledge', 'Experience with microservices'],
  },
  {
    id: 'job_003',
    title: 'UI/UX Designer',
    company: { id: 'comp_3', name: 'DesignHouse', logo_url: '' },
    location: { type: 'remote', city: null, country: 'United States' },
    employment_type: 'contract',
    experience_level: 'mid',
    salary: { min: 60000, max: 90000, currency: 'USD', visible: true },
    skills: ['Figma', 'CSS', 'JavaScript'],
    tags: ['creative', 'remote-friendly'],
    posted_at: '2026-04-19T14:00:00Z',
    expires_at: '2026-05-19T14:00:00Z',
    is_saved: false,
    has_applied: true,
    description: 'We need a creative UI/UX designer to craft delightful user experiences for our SaaS product. You will own the design process from wireframes to high-fidelity prototypes.',
    requirements: ['3+ years design experience', 'Expert Figma skills', 'Understanding of design systems', 'Portfolio demonstrating SaaS work'],
  },
  {
    id: 'job_004',
    title: 'DevOps Engineer',
    company: { id: 'comp_4', name: 'CloudFirst Systems', logo_url: '' },
    location: { type: 'onsite', city: 'Mumbai', country: 'India' },
    employment_type: 'full_time',
    experience_level: 'senior',
    salary: { min: 1800000, max: 2800000, currency: 'INR', visible: true },
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python'],
    tags: ['enterprise', 'benefits'],
    posted_at: '2026-04-17T09:00:00Z',
    expires_at: '2026-05-17T09:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Manage and automate cloud infrastructure for enterprise clients. Build CI/CD pipelines, monitor systems, and ensure 99.99% uptime.',
    requirements: ['4+ years DevOps experience', 'Kubernetes expertise', 'CI/CD pipeline design', 'Scripting in Python or Bash'],
  },
  {
    id: 'job_005',
    title: 'React Native Developer',
    company: { id: 'comp_5', name: 'MobileFirst Labs', logo_url: '' },
    location: { type: 'remote', city: null, country: 'Germany' },
    employment_type: 'full_time',
    experience_level: 'mid',
    salary: { min: 55000, max: 80000, currency: 'EUR', visible: true },
    skills: ['React Native', 'TypeScript', 'JavaScript'],
    tags: ['remote-friendly', 'international'],
    posted_at: '2026-04-21T11:00:00Z',
    expires_at: '2026-05-21T11:00:00Z',
    is_saved: true,
    has_applied: false,
    description: 'Build cross-platform mobile applications for a fast-growing fintech startup. Work with a distributed team across Europe and Asia.',
    requirements: ['2+ years React Native experience', 'TypeScript proficiency', 'App Store & Play Store publishing', 'Understanding of native modules'],
  },
  {
    id: 'job_006',
    title: 'Full Stack Engineer',
    company: { id: 'comp_6', name: 'Nexus Solutions', logo_url: '' },
    location: { type: 'hybrid', city: 'Delhi', country: 'India' },
    employment_type: 'full_time',
    experience_level: 'lead',
    salary: { min: 2500000, max: 4000000, currency: 'INR', visible: true },
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    tags: ['leadership', 'growth'],
    posted_at: '2026-04-16T07:00:00Z',
    expires_at: '2026-05-16T07:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Lead a team of engineers building a next-generation e-commerce platform. You will own the full stack from frontend to backend, making key architecture decisions.',
    requirements: ['6+ years full stack experience', 'React and Node.js mastery', 'GraphQL experience', 'Team leadership experience'],
  },
  {
    id: 'job_007',
    title: 'Data Analyst Intern',
    company: { id: 'comp_7', name: 'DataDriven Co', logo_url: '' },
    location: { type: 'onsite', city: 'Hyderabad', country: 'India' },
    employment_type: 'internship',
    experience_level: 'entry',
    salary: { min: 15000, max: 25000, currency: 'INR', visible: true },
    skills: ['Python', 'SQL'],
    tags: ['internship', 'learning'],
    posted_at: '2026-04-22T06:00:00Z',
    expires_at: '2026-05-22T06:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Kickstart your career in data analytics! Work with real datasets, build dashboards, and learn from experienced analysts at a data-first company.',
    requirements: ['Pursuing CS/Analytics degree', 'Basic Python knowledge', 'SQL fundamentals', 'Eagerness to learn'],
  },
  {
    id: 'job_008',
    title: 'iOS Developer',
    company: { id: 'comp_8', name: 'AppleCraft Studios', logo_url: '' },
    location: { type: 'remote', city: null, country: 'United Kingdom' },
    employment_type: 'contract',
    experience_level: 'senior',
    salary: { min: 70000, max: 100000, currency: 'GBP', visible: true },
    skills: ['Swift', 'JavaScript'],
    tags: ['remote-friendly', 'contract'],
    posted_at: '2026-04-15T12:00:00Z',
    expires_at: '2026-05-15T12:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Develop and maintain iOS applications for our suite of productivity tools. Collaborate with the product team to define roadmaps and ship features.',
    requirements: ['5+ years iOS development', 'Swift expertise', 'App Store deployment', 'Understanding of accessibility standards'],
  },
  {
    id: 'job_009',
    title: 'Product Manager',
    company: { id: 'comp_9', name: 'Innovate Hub', logo_url: '' },
    location: { type: 'hybrid', city: 'Pune', country: 'India' },
    employment_type: 'full_time',
    experience_level: 'lead',
    salary: { min: 2200000, max: 3600000, currency: 'INR', visible: true },
    skills: ['Figma', 'SQL', 'JavaScript'],
    tags: ['leadership', 'product'],
    posted_at: '2026-04-14T10:00:00Z',
    expires_at: '2026-05-14T10:00:00Z',
    is_saved: true,
    has_applied: false,
    description: 'Drive product strategy and execution for our B2B SaaS platform. Work with cross-functional teams to define requirements, prioritize features, and measure outcomes.',
    requirements: ['4+ years PM experience', 'B2B SaaS background', 'Data-driven decision making', 'Excellent stakeholder management'],
  },
  {
    id: 'job_010',
    title: 'Cloud Architect',
    company: { id: 'comp_10', name: 'SkyOps Technologies', logo_url: '' },
    location: { type: 'onsite', city: 'Chennai', country: 'India' },
    employment_type: 'full_time',
    experience_level: 'executive',
    salary: { min: 4000000, max: 6000000, currency: 'INR', visible: true },
    skills: ['AWS', 'Kubernetes', 'Docker', 'Go'],
    tags: ['enterprise', 'executive'],
    posted_at: '2026-04-13T08:00:00Z',
    expires_at: '2026-05-13T08:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Define and execute cloud strategy across multi-cloud environments. Lead a team of 20+ engineers in building resilient, cost-optimized infrastructure.',
    requirements: ['10+ years infrastructure experience', 'Multi-cloud expertise', 'Architecture design at scale', 'Team management experience'],
  },
  {
    id: 'job_011',
    title: 'Frontend Intern',
    company: { id: 'comp_11', name: 'WebSpark Academy', logo_url: '' },
    location: { type: 'remote', city: null, country: 'India' },
    employment_type: 'internship',
    experience_level: 'entry',
    salary: { min: 10000, max: 20000, currency: 'INR', visible: true },
    skills: ['React', 'CSS', 'JavaScript'],
    tags: ['internship', 'remote-friendly'],
    posted_at: '2026-04-22T14:00:00Z',
    expires_at: '2026-05-22T14:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Learn frontend development by building real projects. Mentored by senior engineers, you will work on React-based web applications.',
    requirements: ['Basic React knowledge', 'HTML & CSS fundamentals', 'JavaScript basics', 'Willingness to learn'],
  },
  {
    id: 'job_012',
    title: 'Machine Learning Engineer',
    company: { id: 'comp_12', name: 'AI Vision Labs', logo_url: '' },
    location: { type: 'hybrid', city: 'Bangalore', country: 'India' },
    employment_type: 'full_time',
    experience_level: 'senior',
    salary: { min: 2500000, max: 4500000, currency: 'INR', visible: true },
    skills: ['Python', 'Docker', 'AWS'],
    tags: ['AI', 'research'],
    posted_at: '2026-04-12T09:00:00Z',
    expires_at: '2026-05-12T09:00:00Z',
    is_saved: false,
    has_applied: true,
    description: 'Build and deploy ML models at scale for computer vision applications. Collaborate with research scientists and backend engineers.',
    requirements: ['3+ years ML experience', 'Python proficiency', 'Deep learning frameworks', 'MLOps experience'],
  },
  {
    id: 'job_013',
    title: 'Freelance Web Developer',
    company: { id: 'comp_13', name: 'PixelPerfect Agency', logo_url: '' },
    location: { type: 'remote', city: null, country: 'Australia' },
    employment_type: 'freelance',
    experience_level: 'mid',
    salary: { min: 50, max: 100, currency: 'AUD', visible: true },
    skills: ['Next.js', 'React', 'CSS', 'TypeScript'],
    tags: ['freelance', 'remote-friendly'],
    posted_at: '2026-04-11T16:00:00Z',
    expires_at: '2026-05-11T16:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Build stunning websites and landing pages for our agency clients on a per-project basis. Flexible hours. Work from anywhere.',
    requirements: ['Next.js experience', 'Eye for design', 'Responsive web development', 'Portfolio of past projects'],
  },
  {
    id: 'job_014',
    title: 'Backend Engineer (Go)',
    company: { id: 'comp_14', name: 'GoScale Systems', logo_url: '' },
    location: { type: 'onsite', city: 'San Francisco', country: 'United States' },
    employment_type: 'full_time',
    experience_level: 'mid',
    salary: { min: 120000, max: 180000, currency: 'USD', visible: true },
    skills: ['Go', 'Docker', 'Kubernetes', 'SQL'],
    tags: ['high-growth', 'visa-sponsor'],
    posted_at: '2026-04-10T10:00:00Z',
    expires_at: '2026-05-10T10:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Design and implement high-throughput backend services in Go for our real-time data platform. Contribute to open-source projects.',
    requirements: ['2+ years Go experience', 'Distributed systems fundamentals', 'Container orchestration', 'SQL/NoSQL databases'],
  },
  {
    id: 'job_015',
    title: 'Vue.js Developer',
    company: { id: 'comp_15', name: 'GreenTech Solutions', logo_url: '' },
    location: { type: 'hybrid', city: 'Berlin', country: 'Germany' },
    employment_type: 'part_time',
    experience_level: 'mid',
    salary: { min: 30000, max: 45000, currency: 'EUR', visible: true },
    skills: ['Vue.js', 'JavaScript', 'CSS', 'TypeScript'],
    tags: ['sustainability', 'part-time'],
    posted_at: '2026-04-09T11:00:00Z',
    expires_at: '2026-05-09T11:00:00Z',
    is_saved: false,
    has_applied: false,
    description: 'Help us build dashboards and tools for sustainability tracking. Part-time position ideal for students or parents.',
    requirements: ['Vue.js 3 experience', 'TypeScript knowledge', 'CSS/Sass proficiency', 'Attention to detail'],
  },
];

// ──────────────────────────────────────────────────
// Helper: format salary for display
// ──────────────────────────────────────────────────

export function formatSalary(salary: Salary): string {
  if (!salary.visible) return 'Undisclosed';
  const fmt = (n: number) => {
    if (n >= 100000) return `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n.toString();
  };
  // For hourly-style (small numbers), show as-is
  if (salary.max < 1000) {
    return `${salary.currency} ${salary.min}–${salary.max}/hr`;
  }
  return `${salary.currency} ${fmt(salary.min)} – ${fmt(salary.max)}`;
}

// ──────────────────────────────────────────────────
// Helper: relative time
// ──────────────────────────────────────────────────

export function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

// ──────────────────────────────────────────────────
// Filter + sort logic
// ──────────────────────────────────────────────────

export function filterJobs(jobs: Job[], filters: JobFilters, searchQuery: string, locationQuery: string): Job[] {
  return jobs.filter((job) => {
    // Text search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches =
        job.title.toLowerCase().includes(q) ||
        job.company.name.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));
      if (!matches) return false;
    }

    // Location search
    if (locationQuery) {
      const lq = locationQuery.toLowerCase();
      const matches =
        (job.location.city?.toLowerCase().includes(lq)) ||
        job.location.country.toLowerCase().includes(lq) ||
        job.location.type.toLowerCase().includes(lq);
      if (!matches) return false;
    }

    // Employment type
    if (filters.employmentTypes.length > 0 && !filters.employmentTypes.includes(job.employment_type)) return false;

    // Experience level
    if (filters.experienceLevels.length > 0 && !filters.experienceLevels.includes(job.experience_level)) return false;

    // Location type
    if (filters.locationTypes.length > 0 && !filters.locationTypes.includes(job.location.type)) return false;

    // Skills
    if (filters.skills.length > 0 && !filters.skills.some((s) => job.skills.includes(s))) return false;

    return true;
  });
}

export function sortJobs(jobs: Job[], sort: SortOption): Job[] {
  const sorted = [...jobs];
  switch (sort) {
    case 'newest':
      sorted.sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime());
      break;
    case 'salary_high':
      sorted.sort((a, b) => b.salary.max - a.salary.max);
      break;
    case 'salary_low':
      sorted.sort((a, b) => a.salary.min - b.salary.min);
      break;
  }
  return sorted;
}
