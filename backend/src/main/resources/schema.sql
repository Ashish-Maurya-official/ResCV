CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    full_name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    summary TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resume_skills (
    resume_id BIGINT,
    skill VARCHAR(255),
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS experiences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT,
    job_title VARCHAR(255),
    company VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    description TEXT,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT,
    title VARCHAR(255),
    link VARCHAR(255),
    description TEXT,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS educations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    school VARCHAR(255),
    date VARCHAR(50),
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS standard_sections (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

INSERT IGNORE INTO standard_sections (name, description) VALUES 
('Summary', 'A brief overview of your professional background and key achievements.'),
('Experience', 'Your work history, including job titles, companies, and dates.'),
('Education', 'Your academic qualifications, degrees, and schools.'),
('Projects', 'Key projects you have worked on, including descriptions and links.'),
('Skills', 'Technical and soft skills relevant to the job.'),
('Languages', 'Languages you speak and your proficiency level.'),
('Certifications', 'Professional certifications and licenses.'),
('Awards', 'Awards and honors you have received.');
