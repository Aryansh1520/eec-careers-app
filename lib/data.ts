export const applicationsList = {
  data: [
    {
      id: "app_101",
      current_status: "INTERVIEW",
      applied_at: "2026-04-23T10:00:00Z",

      job: {
        id: "job_011",
        title: "Frontend Intern",
        company: {
          id: "comp_11",
          name: "WebSpark Academy",
          logo_url: ""
        },
        location: {
          type: "remote",
          city: null,
          country: "India"
        },
        employment_type: "internship",
        experience_level: "entry",
        salary: {
          min: 10000,
          max: 20000,
          currency: "INR",
          visible: true
        },
        posted_at: "2026-04-22T14:00:00Z",
        expires_at: "2026-05-22T14:00:00Z",
        is_saved: false,
        has_applied: true
      }
    }
  ]
};

export const applicationDetail = {
  id: "app_101",
  current_status: "INTERVIEW",
  applied_at: "2026-04-23T10:00:00Z",

  job: {
    id: "job_011",
    title: "Frontend Intern",
    company: {
      id: "comp_11",
      name: "WebSpark Academy",
      logo_url: ""
    },
    location: {
      type: "remote",
      city: null,
      country: "India"
    },
    employment_type: "internship",
    experience_level: "entry",
    salary: {
      min: 10000,
      max: 20000,
      currency: "INR",
      visible: true
    },
    skills: ["React", "CSS", "JavaScript"],
    tags: ["internship", "remote-friendly"],
    posted_at: "2026-04-22T14:00:00Z",
    expires_at: "2026-05-22T14:00:00Z",
    is_saved: false,
    has_applied: true,
    description: "Learn frontend development by building real projects. Mentored by senior engineers, you will work on React-based web applications.",
    requirements: [
      "Basic React knowledge",
      "HTML & CSS fundamentals",
      "JavaScript basics",
      "Willingness to learn"
    ]
  },

  history: [
    {
      id: "evt_1",
      type: "STATUS_CHANGE",
      status: "APPLIED",
      created_at: "2026-04-23T10:00:00Z"
    },
    {
      id: "evt_2",
      type: "STATUS_CHANGE",
      status: "SCREENING",
      created_at: "2026-04-24T09:00:00Z"
    },
    {
      id: "evt_3",
      type: "STATUS_CHANGE",
      status: "INTERVIEW",
      created_at: "2026-04-25T11:00:00Z"
    }
  ]
};
