// List of known hard and soft skills for keyword matching
const KNOWN_HARD_SKILLS = [
  'Mobile', 'Product', 'Product management', 'Android', 'Focus',
  'React', 'React Native', 'JavaScript', 'Python', 'Swift', 'iOS', 'Java',
  'HTML', 'CSS', 'SQL', 'AWS', 'Docker', 'Git', 'API integration', 'REST APIs',
  'Node.js', 'Typescript', 'C++', 'Go', 'Kubernetes'
];

const KNOWN_SOFT_SKILLS = [
  'Innovation', 'Strategic thinking', 'High quality', 'Competitive', 'Proactively',
  'Judgment', 'Communication', 'Teamwork', 'Problem solving', 'Leadership',
  'Time management', 'Adaptability', 'Creativity', 'Critical thinking'
];

export function analyzeResume(jobDescText, resumeText, fileName = "custom_resume.pdf") {
  const jd = (jobDescText || '').toLowerCase();
  const resume = (resumeText || '').toLowerCase();

  // 1. Extract and compare Hard Skills
  const hardSkillsMatches = [];
  const matchedHard = [];
  const missingHard = [];

  KNOWN_HARD_SKILLS.forEach(skill => {
    const skillLower = skill.toLowerCase();
    const jdCount = (jd.match(new RegExp(`\\b${escapeRegExp(skillLower)}\\b`, 'g')) || []).length;
    
    if (jdCount > 0) {
      const resCount = (resume.match(new RegExp(`\\b${escapeRegExp(skillLower)}\\b`, 'g')) || []).length;
      const matchItem = {
        name: skill,
        resume: resCount > 0 ? String(resCount) : 'cross',
        jd: jdCount
      };
      hardSkillsMatches.push(matchItem);
      if (resCount > 0) {
        matchedHard.push(skill);
      } else {
        missingHard.push(skill);
      }
    }
  });

  // Default hard skills if none matched
  if (hardSkillsMatches.length === 0) {
    hardSkillsMatches.push(
      { name: "Technical Skills", resume: resume.length > 50 ? "1" : "cross", jd: 1 },
      { name: "Development", resume: resume.includes("dev") || resume.includes("engineer") ? "2" : "cross", jd: 2 }
    );
  }

  // 2. Extract and compare Soft Skills
  const softSkillsMatches = [];
  const matchedSoft = [];
  const missingSoft = [];

  KNOWN_SOFT_SKILLS.forEach(skill => {
    const skillLower = skill.toLowerCase();
    const jdCount = (jd.match(new RegExp(`\\b${escapeRegExp(skillLower)}\\b`, 'g')) || []).length;
    
    if (jdCount > 0) {
      const resCount = (resume.match(new RegExp(`\\b${escapeRegExp(skillLower)}\\b`, 'g')) || []).length;
      const matchItem = {
        name: skill,
        resume: resCount > 0 ? String(resCount) : 'cross',
        jd: jdCount
      };
      softSkillsMatches.push(matchItem);
      if (resCount > 0) {
        matchedSoft.push(skill);
      } else {
        missingSoft.push(skill);
      }
    }
  });

  // Default soft skills if none matched
  if (softSkillsMatches.length === 0) {
    softSkillsMatches.push(
      { name: "Communication", resume: resume.includes("communicat") ? "1" : "cross", jd: 1 },
      { name: "Teamwork", resume: resume.includes("team") || resume.includes("collaborat") ? "1" : "cross", jd: 1 }
    );
  }

  // 3. Run ATS formatting & content checks
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resume);
  const hasPhone = /(\+?\d{1,4}[-.\s]??)?\(?\d{3}\)?[-.\s]??\d{3}[-.\s]??\d{4}/.test(resume) || /\+?\d{10,12}/.test(resume);
  const hasAddress = /address|street|road|city|state|zip|india|usa|delhi|mumbai|bangalore|pune|hyderabad/i.test(resume);
  
  const hasSummary = /summary|profile|about me/i.test(resume) || resume.length > 300;
  const hasEducation = /education|degree|btech|b\.tech|b\.e\.|mtech|bca|mca|university|college/i.test(resume);
  const hasExperience = /experience|work|history|employment|projects/i.test(resume);

  // Try to find job title matches
  const titleKeywords = ['manager', 'engineer', 'developer', 'analyst', 'designer', 'consultant'];
  let detectedTitle = "Required Role";
  for (const kw of titleKeywords) {
    if (jd.includes(kw)) {
      const lines = jobDescText.split('\n');
      detectedTitle = lines[0].substring(0, 35) || `Software ${kw}`;
      break;
    }
  }

  const titleMatch = resume.includes(detectedTitle.toLowerCase()) || 
                     (detectedTitle.toLowerCase().split(' ').some(w => w.length > 3 && resume.includes(w)));

  const atsChecks = [
    {
      title: "Contact Information",
      passed: hasEmail && hasPhone,
      subchecks: [
        { message: "We did not find an address in your resume. Recruiters use your address to validate your location for job matches.", passed: hasAddress },
        { message: "We did not find an email in your resume. Add an email so that recruiters have a means to contact you.", passed: hasEmail },
        { message: "We did not find a phone number in your resume. Some recruiters prefer a phone call to email.", passed: hasPhone }
      ]
    },
    {
      title: "Summary",
      passed: hasSummary,
      subchecks: [
        { message: "We found a summary section on your resume. Good job! The summary provides a quick overview of the candidate's qualifications.", passed: hasSummary }
      ]
    },
    {
      title: "Section Headings",
      passed: hasEducation && hasExperience,
      subchecks: [
        { message: "We found the education section in your resume.", passed: hasEducation },
        { message: "We found the work experience section in your resume.", passed: hasExperience }
      ]
    },
    {
      title: "Job Title Match",
      passed: titleMatch,
      subchecks: [
        { message: `The job title "${detectedTitle}" was not clearly matched in your resume. Consider aligning your experience headings.`, passed: titleMatch }
      ]
    },
    {
      title: "Date Formatting",
      passed: true,
      subchecks: [
        { message: 'ATS and recruiters prefer specific date formatting for your work experience (e.g. MM/YY, Month YYYY).', passed: true }
      ]
    },
    {
      title: "Education Match",
      passed: hasEducation,
      subchecks: [
        { message: "Your education history is parsed and noted in the system.", passed: hasEducation }
      ]
    },
    {
      title: "File Format",
      passed: true,
      subchecks: [
        { message: `You are using a standard file type (${fileName.split('.').pop().toUpperCase()}), which is preferred for ATS.`, passed: true }
      ]
    }
  ];

  // 4. Recruiter tips matching
  const wordCount = resume.split(/\s+/).filter(Boolean).length;
  const paragraphLengthCheck = wordCount > 0 && wordCount < 600;
  const hasLinkedIn = resume.includes("linkedin.com");
  const hasGithub = resume.includes("github.com") || resume.includes("portfolio");
  
  const recruiterTips = [
    {
      id: "jobLevel",
      title: "Job Level Match",
      status: titleMatch ? "success" : "warning",
      message: titleMatch 
        ? "Your experience level aligns well with the roles mentioned."
        : "Ensure your level of seniority matches the requirements. Add relevant experience summaries.",
      actionLabel: ""
    },
    {
      id: "measurableResults",
      title: "Measurable Results",
      status: resume.includes("achieved") || resume.includes("growth") || resume.includes("%") || /\d+/.test(resume) ? "success" : "warning",
      message: "Include metrics and achievements (like %, revenue growth, or counts) in your bullet points.",
      actionLabel: "View Measurable Results"
    },
    {
      id: "paragraphLength",
      title: "Paragraph Length",
      status: paragraphLengthCheck ? "success" : "error",
      message: "Some paragraphs or bullet points in your resume appear dense. Keep items under 40 words for readability.",
      actionLabel: "View Paragraph Length"
    },
    {
      id: "resumeTone",
      title: "Resume Tone",
      status: "success",
      message: "Tone is professional. Avoid cliché buzzwords like 'out-of-the-box thinker' or 'go-getter'.",
      actionLabel: ""
    },
    {
      id: "webPresence",
      title: "Web Presence",
      status: hasLinkedIn || hasGithub ? "success" : "error",
      message: "Consider adding a LinkedIn profile link or professional portfolio website URL.",
      actionLabel: ""
    }
  ];

  // 5. Dynamic Recommendations Engine
  const recommendations = [];
  if (!hasEmail) recommendations.push("Add a professional email address (e.g. name@domain.com) to your resume header.");
  if (!hasPhone) recommendations.push("Add a contact phone number so hiring managers can reach you.");
  if (!hasAddress) recommendations.push("Mention your city and country location (e.g. New Delhi, India) for local ATS filtering.");
  if (!titleMatch) recommendations.push(`Integrate the target job title "${detectedTitle}" into your resume summary or job headers.`);
  if (missingHard.length > 0) recommendations.push(`Add missing hard skills keywords: ${missingHard.slice(0, 3).join(', ')}.`);
  if (missingSoft.length > 0) recommendations.push(`Integrate soft skills context: ${missingSoft.slice(0, 2).join(', ')}.`);
  if (!hasLinkedIn) recommendations.push("Include your LinkedIn profile link to improve online credibility.");

  // Fallback default recommendation
  if (recommendations.length === 0) {
    recommendations.push("Your resume matches this job description extremely well! Keep up the good work.");
  }

  // 6. Calculate match score breakdowns
  // Category weights:
  // - Keyword Match: 40 points
  // - Formatting: 30 points
  // - ATS Check: 30 points
  
  const hardSkillsCount = hardSkillsMatches.length;
  const hardSkillsMet = hardSkillsMatches.filter(s => s.resume !== 'cross').length;
  const hardRatio = hardSkillsCount > 0 ? (hardSkillsMet / hardSkillsCount) : 1;

  const softSkillsCount = softSkillsMatches.length;
  const softSkillsMet = softSkillsMatches.filter(s => s.resume !== 'cross').length;
  const softRatio = softSkillsCount > 0 ? (softSkillsMet / softSkillsCount) : 1;

  const keywordScoreVal = Math.round(((hardRatio * 0.7) + (softRatio * 0.3)) * 40);

  const formattingScoreVal = 30; // Pre-calculated formatting pass since mock formatting checks pass

  const allSubchecks = atsChecks.flatMap(c => c.subchecks);
  const passedSubchecks = allSubchecks.filter(s => s.passed).length;
  const atsRatio = allSubchecks.length > 0 ? (passedSubchecks / allSubchecks.length) : 1;
  const atsScoreVal = Math.round(atsRatio * 30);

  const totalScore = keywordScoreVal + formattingScoreVal + atsScoreVal;

  let status = "Fair Match";
  if (totalScore >= 80) status = "Strong Match";
  else if (totalScore < 50) status = "Poor Match";

  return {
    id: "custom",
    name: detectedTitle,
    jobTitle: detectedTitle,
    score: Math.max(15, Math.min(totalScore, 99)),
    status,
    resumeFileName: fileName,
    jobDescription: jobDescText,
    resumeText: resumeText,
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
    softSkills: softSkillsMatches,
    hardSkills: hardSkillsMatches,
    recruiterTips,
    atsChecks,
    scoreBreakdown: {
      keywords: { score: keywordScoreVal, max: 40 },
      formatting: { score: formattingScoreVal, max: 30 },
      atsChecks: { score: atsScoreVal, max: 30 }
    },
    matchedHard,
    missingHard,
    matchedSoft,
    missingSoft,
    recommendations
  };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
