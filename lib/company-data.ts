export type CompanyStatus = 'approved' | 'pending' | 'rejected' | 'suspended';

export const companyProfile = {
  name: 'NovaTech Solutions',
  industry: 'Information Technology',
  size: '51-200 employees',
  location: 'Bangalore, India',
  website: 'https://novatech.example.com',
  description:
    'NovaTech Solutions is a fast-growing product company building developer tools and cloud infrastructure for startups across India and Southeast Asia.',
  logo_url: '',
  banner_url: '',
  founded: '2019',
  social_links: {
    linkedin: 'https://linkedin.com/company/novatech',
    twitter: 'https://twitter.com/novatech',
    github: 'https://github.com/novatech',
  },
  moderation_status: 'approved' as CompanyStatus,
};

export const companySummary = {
  total_jobs_posted: 18,
  active_listings: 6,
  total_applications: 142,
  new_applications_this_week: 23,
};

export const companyDonutData = [
  { status: 'APPLIED', count: 52 },
  { status: 'SCREENING', count: 28 },
  { status: 'INTERVIEW', count: 31 },
  { status: 'HIRED', count: 14 },
  { status: 'REJECTED', count: 17 },
];

export const companyRecentActivity = [
  {
    type: 'NEW_APPLICATION',
    candidate_name: 'Priya Sharma',
    job_title: 'React Developer',
    created_at: '2026-05-06T08:30:00Z',
  },
  {
    type: 'STATUS_CHANGE',
    candidate_name: 'Rahul Mehta',
    job_title: 'Backend Engineer',
    status: 'INTERVIEW',
    created_at: '2026-05-05T16:00:00Z',
  },
  {
    type: 'NEW_APPLICATION',
    candidate_name: 'Ananya Iyer',
    job_title: 'UI/UX Designer',
    created_at: '2026-05-05T11:45:00Z',
  },
  {
    type: 'STATUS_CHANGE',
    candidate_name: 'Vikram Singh',
    job_title: 'DevOps Engineer',
    status: 'HIRED',
    created_at: '2026-05-04T14:20:00Z',
  },
  {
    type: 'NEW_APPLICATION',
    candidate_name: 'Sneha Patel',
    job_title: 'React Developer',
    created_at: '2026-05-04T09:10:00Z',
  },
];

export const companyRecentJobs = [
  {
    id: 'cjob_001',
    title: 'React Developer',
    status: 'published' as const,
    applicant_count: 34,
    posted_at: '2026-04-28T10:00:00Z',
    employment_type: 'full-time',
    location: 'Bangalore, India',
  },
  {
    id: 'cjob_002',
    title: 'Backend Engineer',
    status: 'published' as const,
    applicant_count: 21,
    posted_at: '2026-04-25T09:00:00Z',
    employment_type: 'full-time',
    location: 'Remote',
  },
  {
    id: 'cjob_003',
    title: 'UI/UX Designer',
    status: 'paused' as const,
    applicant_count: 12,
    posted_at: '2026-04-20T14:00:00Z',
    employment_type: 'full-time',
    location: 'Mumbai, India',
  },
];
