export const mockProfiles = {
  pm: {
    id: "pm",
    name: "Senior Product Manager",
    jobTitle: "Senior Product Manager",
    score: 72,
    status: "Fair Match",
    resumeFileName: "amit_sharma_pm_resume.pdf",
    jobDescription: `Required: Senior Product Manager with 5+ years of experience.
Must have strong product management experience, especially in mobile applications (Android/iOS).
Key skills: Innovation, Strategic thinking, High quality, Competitive, Proactively, Judgment, Mobile, Product, Product management, Android.
Responsible for overall product lifecycle and cross-functional coordination. Focus is on user growth and metrics.`,
    resumeText: `Amit Sharma - Experienced PM
Experience:
Lead Product Manager - 8 Years
Managed mobile apps and led product strategy.
Achieved significant revenue growth and product alignment.
Education:
B.Tech in Computer Science`,
    
    formatting: {
      fontCheck: [
        { label: "Your resume makes use of sparse bold styling. This increases readability for a recruiter.", passed: true },
        { label: "Your font is in a readable color.", passed: true },
        { label: "Your resume does not overuse different fonts.", passed: true },
        { label: "Your resume uses a standard font.", passed: true },
        { label: "The average font size of your resume meets readability and ATS standards.", passed: true }
      ],
      layout: [
        { label: "Your resume doesn't contain images.", passed: true },
        { label: "Your resume does not contain any tables.", passed: true },
        { label: "Your resume primarily uses standardized left alignment for text sections.", passed: true }
      ],
      pageSetup: [
        { label: "Your resume does not contain information in footers.", passed: true },
        { label: "Your resume does not contain information in headers.", passed: true },
        { label: "Your margin sizes are all consistent and standard sizes.", passed: true },
        { label: "Your document page size is standard.", passed: true }
      ]
    },
    
    softSkills: [
      { name: "Innovation", resume: "cross", jd: 2 },
      { name: "Strategic thinking", resume: "cross", jd: 1 },
      { name: "High quality", resume: "1", jd: 1 },
      { name: "Competitive", resume: "3", jd: 1 },
      { name: "Proactively", resume: "1", jd: 1 },
      { name: "Judgment", resume: "cross", jd: 1 }
    ],
    
    hardSkills: [
      { name: "Mobile", resume: "8", jd: 9 },
      { name: "Product", resume: "35", jd: 7 },
      { name: "Product management", resume: "7", jd: 6 },
      { name: "Android", resume: "4", jd: 3 },
      { name: "Focus", resume: "cross", jd: 3 }
    ],
    
    recruiterTips: [
      {
        id: "jobLevel",
        title: "Job Level Match",
        status: "warning",
        message: "You have more years of experience than the role requires. Keep in mind that our assessment considers total experience, not just relevant years. If you're changing fields or have specific reasons for pursuing this role, consider adding a brief explanation in your application to provide context.",
        actionLabel: ""
      },
      {
        id: "measurableResults",
        title: "Measurable Results",
        status: "success",
        message: "There are five or more mentions of measurable results in your resume. Keep it up - employers like to see the impact and results that you had on the job.",
        actionLabel: "View Measurable Results"
      },
      {
        id: "paragraphLength",
        title: "Paragraph Length",
        status: "error",
        message: "Some of your paragraphs are longer than 40 words. Consider shortening them for readability to bring attention to your skills and accomplishments.",
        actionLabel: "View Paragraph Length"
      },
      {
        id: "resumeTone",
        title: "Resume Tone",
        status: "warning",
        message: "We've found some negative phrases or cliches in your resume:",
        actionLabel: "View Negative Words"
      },
      {
        id: "webPresence",
        title: "Web Presence",
        status: "error",
        message: "Consider adding a website or LinkedIn url to build your web credibility. Recruiters appreciate the convenience and credibility associated with a professional website.",
        actionLabel: ""
      }
    ],
    
    atsChecks: [
      {
        title: "Contact Information",
        passed: false,
        subchecks: [
          { message: "We did not find an address in your resume. Recruiters use your address to validate your location for job matches.", passed: false },
          { message: "We did not find an email in your resume. Add an email so that recruiters have a means to contact you.", passed: false },
          { message: "We did not find a phone number in your resume. Some recruiters prefer a phone call to email.", passed: false }
        ]
      },
      {
        title: "Summary",
        passed: true,
        subchecks: [
          { message: "We found a summary section on your resume. Good job! The summary provides a quick overview of the candidate's qualifications, helping recruiters and hiring managers promptly grasp the value the candidate can offer in the position.", passed: true }
        ]
      },
      {
        title: "Section Headings",
        passed: true,
        subchecks: [
          { message: "We found the education section in your resume.", passed: true },
          { message: "We found the work experience section in your resume.", passed: true }
        ]
      },
      {
        title: "Job Title Match",
        passed: false,
        subchecks: [
          { message: "The Senior Product Manager job title provided or found in the job description was not found in your resume. We recommend having the exact title of the job for which you're applying in your resume. This ensures you'll be found when a recruiter searches by job title. If you haven't held this position before, include it as part of your summary statement.", passed: false, actionLabel: "Update scan information" }
        ]
      },
      {
        title: "Date Formatting",
        passed: true,
        subchecks: [
          { message: 'ATS and recruiters prefer specific date formatting for your work experience. Please use the following formats: "MM/YY or MM/YYYY or Month YYYY" (e.g. 03/19, 03/2019, Mar 2019 or March 2019).', passed: true }
        ]
      },
      {
        title: "Education Match",
        passed: true,
        subchecks: [
          { message: "The job description does not list required or preferred education, but your education is noted.", passed: true, actionLabel: "Update required education level" }
        ]
      },
      {
        title: "File Format",
        passed: true,
        subchecks: [
          { message: "You are using a .pdf resume, which is the preferred format for most ATS systems.", passed: true }
        ]
      }
    ],

    scoreBreakdown: {
      keywords: { score: 17, max: 40 },
      formatting: { score: 30, max: 30 },
      atsChecks: { score: 25, max: 30 }
    },
    matchedHard: ['Mobile', 'Product', 'Product management', 'Android'],
    missingHard: ['Focus'],
    matchedSoft: ['High quality', 'Competitive', 'Proactively'],
    missingSoft: ['Innovation', 'Strategic thinking', 'Judgment'],
    recommendations: [
      "Incorporate missing key soft skills: 'Strategic thinking', 'Innovation', and 'Judgment' in your experience details.",
      "Add a professional email address and contact phone number to your resume header.",
      "Add your LinkedIn profile link to improve online credibility.",
      "Align your latest experience heading or summary title with the exact job title: 'Senior Product Manager'."
    ]
  },
  
  engineer: {
    id: "engineer",
    name: "Mobile Software Engineer",
    jobTitle: "Mobile Software Engineer (React Native / Flutter)",
    score: 85,
    status: "Strong Match",
    resumeFileName: "rahul_mobile_eng_resume.pdf",
    jobDescription: `Required: Mobile Software Engineer with 3+ years experience.
Skills: iOS Development, Swift, React Native, Git, API integration.
Must have experience building and launching apps on the App Store/Play Store.`,
    resumeText: `Rahul Kumar - Mobile Dev
Skills: React Native, Swift, iOS, Android, Git, REST APIs.
Experience:
Software Engineer at AppDev Corp (3 Years)
Built 4 React Native apps and launched them.
Education:
B.E. in Information Technology`,
    
    formatting: {
      fontCheck: [
        { label: "Your resume makes use of sparse bold styling. This increases readability for a recruiter.", passed: true },
        { label: "Your font is in a readable color.", passed: true },
        { label: "Your resume does not overuse different fonts.", passed: true },
        { label: "Your resume uses a standard font.", passed: true },
        { label: "The average font size of your resume meets readability and ATS standards.", passed: true }
      ],
      layout: [
        { label: "Your resume doesn't contain images.", passed: true },
        { label: "Your resume does not contain any tables.", passed: true },
        { label: "Your resume primarily uses standardized left alignment for text sections.", passed: true }
      ],
      pageSetup: [
        { label: "Your resume does not contain information in footers.", passed: true },
        { label: "Your resume does not contain information in headers.", passed: true },
        { label: "Your margin sizes are all consistent and standard sizes.", passed: true },
        { label: "Your document page size is standard.", passed: true }
      ]
    },
    
    softSkills: [
      { name: "Teamwork", resume: "2", jd: 2 },
      { name: "Communication", resume: "3", jd: 2 },
      { name: "Problem solving", resume: "1", jd: 1 },
      { name: "Proactively", resume: "cross", jd: 1 }
    ],
    
    hardSkills: [
      { name: "React Native", resume: "5", jd: 6 },
      { name: "Swift", resume: "4", jd: 3 },
      { name: "iOS", resume: "6", jd: 5 },
      { name: "Git", resume: "3", jd: 2 },
      { name: "API Integration", resume: "cross", jd: 2 }
    ],
    
    recruiterTips: [
      {
        id: "jobLevel",
        title: "Job Level Match",
        status: "success",
        message: "Your experience years (3 years) match the job requirements perfectly.",
        actionLabel: ""
      },
      {
        id: "measurableResults",
        title: "Measurable Results",
        status: "success",
        message: "You mentioned specific achievements like launching 4 apps on App Store.",
        actionLabel: ""
      },
      {
        id: "paragraphLength",
        title: "Paragraph Length",
        status: "success",
        message: "All paragraphs in your resume are clean and short (under 40 words).",
        actionLabel: ""
      },
      {
        id: "resumeTone",
        title: "Resume Tone",
        status: "success",
        message: "Tone is active and professional, no cliché buzzwords detected.",
        actionLabel: ""
      },
      {
        id: "webPresence",
        title: "Web Presence",
        status: "warning",
        message: "We found a github link, but recommending adding a LinkedIn profile link as well.",
        actionLabel: "Add LinkedIn Link"
      }
    ],
    
    atsChecks: [
      {
        title: "Contact Information",
        passed: true,
        subchecks: [
          { message: "Address: Found location (New Delhi, India).", passed: true },
          { message: "Email: Found (rahul.kumar@email.com).", passed: true },
          { message: "Phone number: Found (+91 99999-XXXXX).", passed: true }
        ]
      },
      {
        title: "Summary",
        passed: true,
        subchecks: [
          { message: "Summary section is present and matches typical ATS search queries.", passed: true }
        ]
      },
      {
        title: "Section Headings",
        passed: true,
        subchecks: [
          { message: "Found clear section headings for Education, Experience, and Skills.", passed: true }
        ]
      },
      {
        title: "Job Title Match",
        passed: true,
        subchecks: [
          { message: 'Perfect job title match! "Mobile Software Engineer" was found in your resume.', passed: true }
        ]
      },
      {
        title: "Date Formatting",
        passed: true,
        subchecks: [
          { message: "Clean date formats (e.g. Month YYYY) found.", passed: true }
        ]
      },
      {
        title: "Education Match",
        passed: true,
        subchecks: [
          { message: "Your Bachelor of Engineering matches typical candidate profile requirements.", passed: true }
        ]
      },
      {
        title: "File Format",
        passed: true,
        subchecks: [
          { message: "You uploaded a .pdf file which is optimal for resume scanning.", passed: true }
        ]
      }
    ],

    scoreBreakdown: {
      keywords: { score: 32, max: 40 },
      formatting: { score: 30, max: 30 },
      atsChecks: { score: 30, max: 30 }
    },
    matchedHard: ['React Native', 'Swift', 'iOS', 'Git'],
    missingHard: ['API Integration'],
    matchedSoft: ['Teamwork', 'Communication', 'Problem solving'],
    missingSoft: ['Proactively'],
    recommendations: [
      "Add missing keyword 'API Integration' inside your experience details.",
      "Add LinkedIn profile link to your resume."
    ]
  }
};
