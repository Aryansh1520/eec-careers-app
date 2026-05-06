export type JobStatus = 'draft' | 'published' | 'paused' | 'closed' | 'archived';

export interface CompanyJob {
  id: string;
  title: string;
  employment_type: string;
  experience_level: string;
  location: {
    type: 'onsite' | 'remote' | 'hybrid';
    city: string | null;
    country: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
    visible: boolean;
  };
  skills: string[];
  applicant_count: number;
  posted_at: string;
  expires_at: string;
  status: JobStatus;
  visibility: boolean;
  description: string;
}

export const companyJobsList: CompanyJob[] = [
  {
    id: 'cjob_001',
    title: 'React Developer',
    employment_type: 'full-time',
    experience_level: 'mid',
    location: { type: 'onsite', city: 'Bangalore', country: 'India' },
    salary: { min: 800000, max: 1400000, currency: 'INR', visible: true },
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    applicant_count: 34,
    posted_at: '2026-04-28T10:00:00Z',
    expires_at: '2026-05-28T10:00:00Z',
    status: 'published',
    visibility: true,
    description: 'We are looking for a mid-level React developer to join our product team.',
  },
  {
    id: 'cjob_002',
    title: 'Backend Engineer',
    employment_type: 'full-time',
    experience_level: 'senior',
    location: { type: 'remote', city: null, country: 'India' },
    salary: { min: 1200000, max: 2000000, currency: 'INR', visible: true },
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    applicant_count: 21,
    posted_at: '2026-04-25T09:00:00Z',
    expires_at: '2026-05-25T09:00:00Z',
    status: 'published',
    visibility: true,
    description: 'Senior backend engineer to architect and scale our microservices infrastructure.',
  },
  {
    id: 'cjob_003',
    title: 'UI/UX Designer',
    employment_type: 'full-time',
    experience_level: 'mid',
    location: { type: 'onsite', city: 'Mumbai', country: 'India' },
    salary: { min: 600000, max: 1000000, currency: 'INR', visible: true },
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
    applicant_count: 12,
    posted_at: '2026-04-20T14:00:00Z',
    expires_at: '2026-05-20T14:00:00Z',
    status: 'paused',
    visibility: false,
    description: 'Design intuitive and beautiful interfaces for our developer tools platform.',
  },
  {
    id: 'cjob_004',
    title: 'DevOps Engineer',
    employment_type: 'full-time',
    experience_level: 'mid',
    location: { type: 'hybrid', city: 'Bangalore', country: 'India' },
    salary: { min: 900000, max: 1500000, currency: 'INR', visible: false },
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    applicant_count: 8,
    posted_at: '2026-04-15T08:00:00Z',
    expires_at: '2026-05-15T08:00:00Z',
    status: 'closed',
    visibility: false,
    description: 'Manage and optimize our cloud infrastructure and deployment pipelines.',
  },
  {
    id: 'cjob_005',
    title: 'QA Intern',
    employment_type: 'internship',
    experience_level: 'entry',
    location: { type: 'remote', city: null, country: 'India' },
    salary: { min: 15000, max: 25000, currency: 'INR', visible: true },
    skills: ['Manual Testing', 'Selenium', 'JavaScript'],
    applicant_count: 45,
    posted_at: '2026-03-10T10:00:00Z',
    expires_at: '2026-04-10T10:00:00Z',
    status: 'archived',
    visibility: false,
    description: 'Join our QA team as an intern and learn industry-standard testing practices.',
  },
  {
    id: 'cjob_006',
    title: 'Product Manager',
    employment_type: 'full-time',
    experience_level: 'senior',
    location: { type: 'onsite', city: 'Bangalore', country: 'India' },
    salary: { min: 1500000, max: 2500000, currency: 'INR', visible: true },
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Roadmapping'],
    applicant_count: 0,
    posted_at: '2026-05-06T10:00:00Z',
    expires_at: '2026-06-06T10:00:00Z',
    status: 'draft',
    visibility: false,
    description: 'Lead product strategy and execution for our flagship developer tools platform.',
  },
];
