export const dashboardData = {
  summary: {
    jobs_applied: 24,
    jobs_saved: 12,
    applications_total: 24,
    applications_accepted: 3,
    applications_rejected: 7
  },

  donut_data: [
    { status: "APPLIED", count: 10 },
    { status: "SCREENING", count: 4 },
    { status: "INTERVIEW", count: 5 },
    { status: "ACCEPTED", count: 3 },
    { status: "REJECTED", count: 7 }
  ],

  recent_activity: [
    {
      type: "STATUS_CHANGE",
      status: "INTERVIEW",
      job_title: "Frontend Intern",
      company: "WebSpark Academy",
      created_at: "2026-04-25T11:00:00Z"
    },
    {
      type: "STATUS_CHANGE",
      status: "APPLIED",
      job_title: "React Developer",
      company: "TechNova",
      created_at: "2026-04-24T09:00:00Z"
    }
  ],

  top_jobs: [
    {
      id: "job_021",
      title: "React Developer",
      company: {
        id: "comp_21",
        name: "TechNova",
        logo_url: ""
      },
      location: {
        type: "onsite",
        city: "Mumbai",
        country: "India"
      },
      employment_type: "full-time",
      experience_level: "mid",
      salary: {
        min: 600000,
        max: 900000,
        currency: "INR",
        visible: true
      },
      skills: ["React Native", "TypeScript", "Tailwind"],
      posted_at: "2026-04-20T10:00:00Z",
      is_saved: false,
      has_applied: false
    }
  ]
};
