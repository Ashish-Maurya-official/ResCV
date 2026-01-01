'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';


interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string; // Bullet points separated by newlines
}

interface Project {
  id: number;
  title: string;
  description: string; // Bullet points separated by newlines
}

interface Education {
  id: number;
  degree: string;
  fieldOfStudy: string;
  school: string;
  date: string;
}

interface ResumeData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  summary: string;
  skills: string; // Comma separated
  softSkills: string; // Comma separated
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

const initialData: ResumeData = {
  fullName: 'Ashish Maurya',
  address: 'Chandauli 232110',
  phone: '+91 8887798423',
  email: 'Ashish53245@gmail.com',
  summary: 'Software Developer with hands-on experience in React Native, Flutter, Next.js, and Java. Strong logical thinking ability with experience building real-world web and mobile applications.',
  skills: 'React Native, Next.js, Flutter, Java, Spring Boot, REST APIs, C/C++, HTML/CSS/JS, SQL, Git & GitHub, CI/CD, Docker, AWS, Android/iOS, Linux',
  softSkills: 'Logical Thinking, Team Collaboration, Problem Solving, Communication',
  experience: [
    {
      id: 1,
      jobTitle: 'Software Developer',
      company: 'YmGrad',
      startDate: '11/2025',
      endDate: 'Current',
      description: 'Developing and maintaining YmGrad website and mobile applications using React Native and Next.js.\nContributing to production apps available on Play Store and App Store.\nCollaborating with team members in an agile environment.',
    },
    {
      id: 2,
      jobTitle: 'Software Engineer Intern',
      company: 'YmGrad',
      startDate: '07/2025',
      endDate: '11/2025',
      description: 'Worked on React Native and Next.js projects, contributed to the YmGrad website and mobile applications.\nApplied strong logical thinking and problem-solving skills.',
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Wadorwas',
      description: 'Full-stack Next.js web application with Spring Boot backend and AWS EC2 deployment.'
    },
    {
      id: 2,
      title: 'Recovator',
      description: 'Windows desktop file recovery software built with Flutter and C++ integration.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Bachelor of Computer Applications',
      fieldOfStudy: 'Computer Science',
      school: 'Microtek College of Management & Technology',
      date: 'Expected 08/2025'
    }
  ]
};

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [isClient, setIsClient] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse resume data', e);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('resumeData', JSON.stringify(data));
    }
  }, [data, isClient]);

  const downloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;
    const opt = {
      margin: 0,
      filename: `${data.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Dynamically import html2pdf.js to avoid "self is not defined" error during SSR
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf().set(opt).from(element).save();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, field: keyof ResumeData, subField: string, value: string) => {
    setData(prev => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const array = [...(prev[field] as any[])];
      array[index] = { ...array[index], [subField]: value };
      return { ...prev, [field]: array };
    });
  };

  const addItem = (field: 'experience' | 'projects' | 'education') => {
    setData(prev => {
      const newItem = field === 'experience' ? { id: Date.now(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' }
        : field === 'projects' ? { id: Date.now(), title: '', description: '' }
          : { id: Date.now(), degree: '', fieldOfStudy: '', school: '', date: '' };
      return { ...prev, [field]: [...prev[field], newItem] };
    });
  };

  const removeItem = (field: 'experience' | 'projects' | 'education', index: number) => {
    setData(prev => {
      const array = [...prev[field]];
      array.splice(index, 1);
      return { ...prev, [field]: array };
    });
  };

  if (!isClient) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* Sidebar / Editor */}
      <div style={styles.editor}>
        <h2 style={styles.editorTitle}>Resume Editor</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input style={styles.input} name="fullName" value={data.fullName} onChange={handleInputChange} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address</label>
          <input style={styles.input} name="address" value={data.address} onChange={handleInputChange} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone</label>
          <input style={styles.input} name="phone" value={data.phone} onChange={handleInputChange} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} name="email" value={data.email} onChange={handleInputChange} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Summary</label>
          <textarea style={{ ...styles.input, height: '100px' }} name="summary" value={data.summary} onChange={handleInputChange} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Technical Skills (comma separated)</label>
          <textarea style={styles.input} name="skills" value={data.skills} onChange={handleInputChange} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Soft Skills (comma separated)</label>
          <textarea style={styles.input} name="softSkills" value={data.softSkills} onChange={handleInputChange} />
        </div>

        <hr style={styles.hr} />
        <h3 style={styles.sectionTitle}>Experience</h3>
        {data.experience.map((exp, index) => (
          <div key={exp.id} style={styles.card}>
            <input style={styles.input} placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleArrayChange(index, 'experience', 'jobTitle', e.target.value)} />
            <input style={styles.input} placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange(index, 'experience', 'company', e.target.value)} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input style={styles.input} placeholder="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange(index, 'experience', 'startDate', e.target.value)} />
              <input style={styles.input} placeholder="End Date" value={exp.endDate} onChange={(e) => handleArrayChange(index, 'experience', 'endDate', e.target.value)} />
            </div>
            <textarea style={{ ...styles.input, height: '80px' }} placeholder="Description (bullet points)" value={exp.description} onChange={(e) => handleArrayChange(index, 'experience', 'description', e.target.value)} />
            <button style={styles.deleteBtn} onClick={() => removeItem('experience', index)}>Remove</button>
          </div>
        ))}
        <button style={styles.addBtn} onClick={() => addItem('experience')}>+ Add Experience</button>

        <hr style={styles.hr} />
        <h3 style={styles.sectionTitle}>Projects</h3>
        {data.projects.map((proj, index) => (
          <div key={proj.id} style={styles.card}>
            <input style={styles.input} placeholder="Project Title" value={proj.title} onChange={(e) => handleArrayChange(index, 'projects', 'title', e.target.value)} />
            <textarea style={{ ...styles.input, height: '80px' }} placeholder="Description" value={proj.description} onChange={(e) => handleArrayChange(index, 'projects', 'description', e.target.value)} />
            <button style={styles.deleteBtn} onClick={() => removeItem('projects', index)}>Remove</button>
          </div>
        ))}
        <button style={styles.addBtn} onClick={() => addItem('projects')}>+ Add Project</button>

        <hr style={styles.hr} />
        <h3 style={styles.sectionTitle}>Education</h3>
        {data.education.map((edu, index) => (
          <div key={edu.id} style={styles.card}>
            <input style={styles.input} placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange(index, 'education', 'degree', e.target.value)} />
            <input style={styles.input} placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleArrayChange(index, 'education', 'fieldOfStudy', e.target.value)} />
            <input style={styles.input} placeholder="School" value={edu.school} onChange={(e) => handleArrayChange(index, 'education', 'school', e.target.value)} />
            <input style={styles.input} placeholder="Date" value={edu.date} onChange={(e) => handleArrayChange(index, 'education', 'date', e.target.value)} />
            <button style={styles.deleteBtn} onClick={() => removeItem('education', index)}>Remove</button>
          </div>
        ))}
        <button style={styles.addBtn} onClick={() => addItem('education')}>+ Add Education</button>
      </div>

      {/* Preview Area */}
      <div style={styles.preview}>
        <div style={styles.toolbar}>
          <button onClick={downloadPDF} style={styles.downloadBtn}>Download PDF</button>
        </div>

        <div ref={resumeRef} id="resume-preview" style={resumeStyles.container}>
          <header style={resumeStyles.header}>
            <h1 style={resumeStyles.h1}>{data.fullName}</h1>
            <div style={resumeStyles.contactInfo}>
              <span style={resumeStyles.contactItem}>{data.address}</span>
              <span style={resumeStyles.separator}>|</span>
              <span style={resumeStyles.contactItem}>{data.phone}</span>
              <span style={resumeStyles.separator}>|</span>
              <span style={resumeStyles.contactItem}>{data.email}</span>
            </div>
          </header>

          <section style={resumeStyles.section}>
            <h2 style={resumeStyles.h2}>Summary</h2>
            <p style={resumeStyles.summaryText}>
              {data.summary}
            </p>
          </section>

          <section style={resumeStyles.section}>
            <h2 style={resumeStyles.h2}>Technical Skills</h2>
            <div style={resumeStyles.skillsGrid}>
              {data.skills.split(',').map(skill => skill.trim()).filter(s => s).map(skill => (
                <div key={skill} style={resumeStyles.skillTag}>{skill}</div>
              ))}
            </div>
          </section>

          <section style={resumeStyles.section}>
            <h2 style={resumeStyles.h2}>Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} style={resumeStyles.experienceItem}>
                <div style={resumeStyles.itemHeader}>
                  <span style={resumeStyles.itemTitle}>{exp.jobTitle}</span>
                  <span style={resumeStyles.itemDate}>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div style={resumeStyles.itemSubtitle}>{exp.company}</div>
                <ul style={resumeStyles.ul}>
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i} style={resumeStyles.li}>{line.trim()}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section style={resumeStyles.section}>
            <h2 style={resumeStyles.h2}>Projects</h2>
            {data.projects.map(proj => (
              <div key={proj.id} style={resumeStyles.projectItem}>
                <div style={resumeStyles.itemTitle}>{proj.title}</div>
                <ul style={resumeStyles.ul}>
                  {proj.description.split('\n').map((line, i) => line.trim() && <li key={i} style={resumeStyles.li}>{line.trim()}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section style={resumeStyles.section}>
            <h2 style={resumeStyles.h2}>Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} style={resumeStyles.educationItem}>
                <div style={resumeStyles.itemHeader}>
                  <span style={resumeStyles.itemTitle}>{edu.degree}</span>
                  <span style={resumeStyles.itemDate}>{edu.date}</span>
                </div>
                <div style={resumeStyles.itemSubtitle}>{edu.fieldOfStudy}</div>
                <div style={resumeStyles.itemLocation}>{edu.school}</div>
              </div>
            ))}
          </section>

          <section style={resumeStyles.section}>
            <h2 style={resumeStyles.h2}>Soft Skills</h2>
            <div style={resumeStyles.skillsGrid}>
              {data.softSkills.split(',').map(skill => skill.trim()).filter(s => s).map(skill => (
                <div key={skill} style={resumeStyles.skillTag}>{skill}</div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Editor Styles
const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden', fontFamily: 'sans-serif' },
  editor: { width: '40%', padding: '20px', overflowY: 'auto', backgroundColor: '#f8f9fa', borderRight: '1px solid #ddd' },
  preview: { width: '60%', padding: '20px', overflowY: 'auto', backgroundColor: '#525659', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  editorTitle: { marginBottom: '20px', color: '#333' },
  sectionTitle: { marginTop: '20px', marginBottom: '10px', color: '#555', borderBottom: '1px solid #ccc', paddingBottom: '5px' },
  formGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#666' },
  input: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginBottom: '8px' },
  card: { backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  addBtn: { backgroundColor: '#4caf50', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' },
  deleteBtn: { backgroundColor: '#ff4d4f', color: 'white', padding: '4px 8px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginTop: '5px' },
  hr: { margin: '30px 0', border: 'none', borderTop: '1px solid #ddd' },
  toolbar: { marginBottom: '20px', display: 'flex', gap: '10px' },
  downloadBtn: { backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
};

// Resume View Styles (Copied from previous step but scoped)
const resumeStyles: Record<string, React.CSSProperties> = {
  container: {
    width: '210mm',
    minHeight: '297mm', // Visual min height for preview
    backgroundColor: 'white',
    padding: '20px 40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    color: '#1f2937',
    fontFamily: '"Inter", sans-serif',
    lineHeight: 1.5,
  },
  header: { textAlign: 'center', borderBottom: '2px solid #e5e7eb', paddingBottom: '16px', marginBottom: '12px' },
  h1: { color: '#1f2937', fontSize: '26px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', textTransform: 'uppercase' },
  contactInfo: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', color: '#6b7280', fontSize: '13px' },
  contactItem: { display: 'flex', alignItems: 'center' },
  separator: { color: '#d1d5db', marginLeft: '5px', marginRight: '5px' },
  section: { marginBottom: '12px' },
  h2: { fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', color: '#2563eb', margin: '0 0 10px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', letterSpacing: '0.5px' },
  summaryText: { fontSize: '13px', color: '#1f2937', textAlign: 'justify' },
  skillsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' },
  skillTag: { backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, textAlign: 'center', border: '1px solid #dbeafe' },
  experienceItem: { marginBottom: '12px' },
  projectItem: { marginBottom: '12px' },
  educationItem: { marginBottom: '12px' },
  itemHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' },
  itemTitle: { fontWeight: 600, fontSize: '14px', color: '#1f2937' },
  itemSubtitle: { fontWeight: 500, fontSize: '13px', color: '#1f2937' },
  itemDate: { fontSize: '12px', color: '#6b7280', fontWeight: 500 },
  itemLocation: { fontSize: '12px', color: '#6b7280', fontStyle: 'italic' },
  ul: { margin: '4px 0 0 18px', padding: 0, listStyleType: 'disc' },
  li: { fontSize: '13px', color: '#374151', marginBottom: '2px' },
};
