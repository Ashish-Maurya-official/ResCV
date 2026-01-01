'use client';

import { useRef } from 'react';

// You might need to check if window is defined for html2pdf if it's not SSR compatible
// or standard import. Since we are in 'use client', we can dynamic import or use existing script approach.
// But installing html2pdf.js via npm is better in React.
import html2pdf from 'html2pdf.js';

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    const element = resumeRef.current;
    if (!element) return;

    const opt = {
      margin: 0,
      filename: 'Ashish_Maurya_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="text-center mb-6 no-print">
        <button 
          onClick={downloadPDF}
          className="bg-blue-600 text-white border-none py-3 px-6 text-base font-semibold rounded-lg cursor-pointer shadow-md inline-flex items-center gap-2 hover:bg-blue-700 transition-all hover:-translate-y-px active:translate-y-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download PDF
        </button>
      </div>

      <div ref={resumeRef} className="resume-container bg-white" style={styles.resumeContainer}>
        <header style={styles.header}>
          <h1 style={styles.h1}>Ashish Maurya</h1>
          <div style={styles.contactInfo}>
            <span style={styles.contactItem}>Chandauli 232110</span>
            <span style={styles.separator}>|</span>
            <span style={styles.contactItem}>+91 8887798423</span>
            <span style={styles.separator}>|</span>
            <span style={styles.contactItem}>Ashish53245@gmail.com</span>
          </div>
        </header>

        <section style={styles.section}>
          <h2 style={styles.h2}>Summary</h2>
          <p style={styles.summaryText}>
            Software Developer with hands-on experience in React Native, Flutter, Next.js, and Java. Strong logical thinking ability with experience building real-world web and mobile applications. Seeking opportunities to grow as a full-stack and cross-platform developer while contributing to production-level systems.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Technical Skills</h2>
          <div style={styles.skillsGrid}>
            {['React Native', 'Next.js', 'Flutter', 'Java', 'Spring Boot', 'REST APIs', 'C/C++', 'HTML/CSS/JS', 'SQL', 'Git & GitHub', 'CI/CD', 'Docker', 'AWS', 'Android/iOS', 'Linux'].map(skill => (
              <div key={skill} style={styles.skillTag}>{skill}</div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Experience</h2>
          
          <div style={styles.experienceItem}>
            <div style={styles.itemHeader}>
              <span style={styles.itemTitle}>Software Developer</span>
              <span style={styles.itemDate}>11/2025 – Current</span>
            </div>
            <div style={styles.itemSubtitle}>YmGrad</div>
            <ul style={styles.ul}>
              <li style={styles.li}>Developing and maintaining YmGrad website and mobile applications using React Native and Next.js.</li>
              <li style={styles.li}>Contributing to production apps available on Play Store and App Store.</li>
              <li style={styles.li}>Collaborating with team members in an agile environment.</li>
              <li style={styles.li}>Applying strong logical thinking and problem-solving skills to build production-level systems.</li>
            </ul>
          </div>

          <div style={styles.experienceItem}>
            <div style={styles.itemHeader}>
              <span style={styles.itemTitle}>Software Engineer Intern</span>
              <span style={styles.itemDate}>07/2025 – 11/2025</span>
            </div>
            <div style={styles.itemSubtitle}>YmGrad</div>
            <ul style={styles.ul}>
              <li style={styles.li}>Worked on React Native and Next.js projects, contributed to the YmGrad website and mobile applications.</li>
              <li style={styles.li}>Applied strong logical thinking and problem-solving skills, and collaborated with the development team on production applications.</li>
            </ul>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Projects</h2>
          <div style={styles.projectItem}>
            <div style={styles.itemTitle}>Wadorwas</div>
            <ul style={styles.ul}>
              <li style={styles.li}>Full-stack Next.js web application with Spring Boot backend and AWS EC2 deployment.</li>
            </ul>
          </div>
          <div style={styles.projectItem}>
            <div style={styles.itemTitle}>Recovator</div>
            <ul style={styles.ul}>
              <li style={styles.li}>Windows desktop file recovery software built with Flutter and C++ integration.</li>
            </ul>
          </div>
          <div style={styles.projectItem}>
            <div style={styles.itemTitle}>Movie Search Application</div>
            <ul style={styles.ul}>
              <li style={styles.li}>Flutter mobile app using movie API with optimized search UI.</li>
            </ul>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Education</h2>
          <div style={styles.educationItem}>
            <div style={styles.itemHeader}>
              <span style={styles.itemTitle}>Bachelor of Computer Applications</span>
              <span style={styles.itemDate}>Expected 08/2025</span>
            </div>
            <div style={styles.itemSubtitle}>Computer Science</div>
            <div style={styles.itemLocation}>Microtek College of Management & Technology, Varanasi, India</div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Soft Skills</h2>
          <div style={styles.skillsGrid}>
            {['Logical Thinking', 'Team Collaboration', 'Problem Solving', 'Communication'].map(skill => (
              <div key={skill} style={styles.skillTag}>{skill}</div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  resumeContainer: {
    width: '210mm',
    minHeight: 'auto',
    margin: '0 auto',
    padding: '20px 40px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontFamily: '"Inter", sans-serif',
    color: '#1f2937',
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: '16px',
    marginBottom: '12px',
  },
  h1: {
    color: '#1f2937',
    fontSize: '26px',
    fontWeight: 700,
    margin: '0 0 6px 0',
    letterSpacing: '-0.5px',
    textTransform: 'uppercase',
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    color: '#6b7280',
    fontSize: '13px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
  },
  separator: {
    color: '#d1d5db',
    marginLeft: '5px',
    marginRight: '5px',
  },
  section: {
    marginBottom: '12px',
  },
  h2: {
    fontSize: '15px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#2563eb',
    margin: '0 0 10px 0',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '4px',
    letterSpacing: '0.5px',
  },
  summaryText: {
    fontSize: '13px',
    color: '#1f2937',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: '12px',
  },
  projectItem: {
    marginBottom: '12px',
  },
  educationItem: {
    marginBottom: '12px',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '2px',
  },
  itemTitle: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#1f2937',
  },
  itemSubtitle: {
    fontWeight: 500,
    fontSize: '13px',
    color: '#1f2937',
  },
  itemDate: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: 500,
  },
  itemLocation: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  ul: {
    margin: '4px 0 0 18px',
    padding: 0,
    listStyleType: 'disc',
  },
  li: {
    fontSize: '13px',
    color: '#374151',
    marginBottom: '2px',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '8px',
  },
  skillTag: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    textAlign: 'center',
    border: '1px solid #dbeafe',
  },
};
