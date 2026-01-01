package com.resume.resume_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

import com.resume.resume_backend.Education;

@Repository
public class ResumeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Resume save(Resume resume) {
        if (resume.getId() != null) {
            String updateSql = "UPDATE resumes SET user_id=?, full_name=?, address=?, phone=?, email=?, summary=? WHERE id=?";
            jdbcTemplate.update(updateSql, resume.getUserId(), resume.getFullName(), resume.getAddress(),
                    resume.getPhone(), resume.getEmail(), resume.getSummary(), resume.getId());

            jdbcTemplate.update("DELETE FROM resume_skills WHERE resume_id=?", resume.getId());
            jdbcTemplate.update("DELETE FROM experiences WHERE resume_id=?", resume.getId());
            jdbcTemplate.update("DELETE FROM projects WHERE resume_id=?", resume.getId());
            jdbcTemplate.update("DELETE FROM educations WHERE resume_id=?", resume.getId());

            saveRelatedEntities(resume);
            return resume;
        }

        String sql = "INSERT INTO resumes (user_id, full_name, address, phone, email, summary) VALUES (?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            if (resume.getUserId() != null) {
                ps.setLong(1, resume.getUserId());
            } else {
                ps.setNull(1, java.sql.Types.BIGINT);
            }
            ps.setString(2, resume.getFullName());
            ps.setString(3, resume.getAddress());
            ps.setString(4, resume.getPhone());
            ps.setString(5, resume.getEmail());
            ps.setString(6, resume.getSummary());
            return ps;
        }, keyHolder);

        Long resumeId = keyHolder.getKey().longValue();
        resume.setId(resumeId);

        saveRelatedEntities(resume);
        return resume;
    }

    private void saveRelatedEntities(Resume resume) {
        Long resumeId = resume.getId();

        if (resume.getSkills() != null) {
            String skillSql = "INSERT INTO resume_skills (resume_id, skill) VALUES (?, ?)";
            for (String skill : resume.getSkills()) {
                jdbcTemplate.update(skillSql, resumeId, skill);
            }
        }

        if (resume.getExperience() != null) {
            String expSql = "INSERT INTO experiences (resume_id, job_title, company, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)";
            for (Experience exp : resume.getExperience()) {
                jdbcTemplate.update(expSql, resumeId, exp.getJobTitle(), exp.getCompany(), exp.getStartDate(),
                        exp.getEndDate(), exp.getDescription());
            }
        }

        if (resume.getProjects() != null) {
            String projSql = "INSERT INTO projects (resume_id, title, link, description) VALUES (?, ?, ?, ?)";
            for (Project proj : resume.getProjects()) {
                jdbcTemplate.update(projSql, resumeId, proj.getTitle(), proj.getLink(), proj.getDescription());
            }
        }

        if (resume.getEducation() != null) {
            String eduSql = "INSERT INTO educations (resume_id, degree, field_of_study, school, date) VALUES (?, ?, ?, ?, ?)";
            for (Education edu : resume.getEducation()) {
                jdbcTemplate.update(eduSql, resumeId, edu.getDegree(), edu.getFieldOfStudy(), edu.getSchool(),
                        edu.getDate());
            }
        }
    }

    public Optional<Resume> findByUserId(Long userId) {
        String sql = "SELECT * FROM resumes WHERE user_id = ? LIMIT 1";
        try {
            Resume resume = jdbcTemplate.queryForObject(sql, new ResumeRowMapper(), userId);
            populateResumeDetails(resume);
            return Optional.ofNullable(resume);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Resume> findById(Long id) {
        String sql = "SELECT * FROM resumes WHERE id = ?";
        try {
            Resume resume = jdbcTemplate.queryForObject(sql, new ResumeRowMapper(), id);
            if (resume != null) {
                populateResumeDetails(resume);
            }
            return Optional.ofNullable(resume);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private void populateResumeDetails(Resume resume) {
        Long id = resume.getId();
        String skillsSql = "SELECT skill FROM resume_skills WHERE resume_id = ?";
        List<String> skills = jdbcTemplate.query(skillsSql, (rs, rowNum) -> rs.getString("skill"), id);
        resume.setSkills(skills);

        String expSql = "SELECT * FROM experiences WHERE resume_id = ?";
        List<Experience> experiences = jdbcTemplate.query(expSql, new ExperienceRowMapper(), id);
        resume.setExperience(experiences);

        String projSql = "SELECT * FROM projects WHERE resume_id = ?";
        List<Project> projects = jdbcTemplate.query(projSql, new ProjectRowMapper(), id);
        resume.setProjects(projects);

        String eduSql = "SELECT * FROM educations WHERE resume_id = ?";
        List<Education> educations = jdbcTemplate.query(eduSql, new EducationRowMapper(), id);
        resume.setEducation(educations);
    }

    private static class ResumeRowMapper implements RowMapper<Resume> {
        @Override
        public Resume mapRow(ResultSet rs, int rowNum) throws SQLException {
            Resume resume = new Resume();
            resume.setId(rs.getLong("id"));
            resume.setUserId(rs.getLong("user_id"));
            resume.setFullName(rs.getString("full_name"));
            resume.setAddress(rs.getString("address"));
            resume.setPhone(rs.getString("phone"));
            resume.setEmail(rs.getString("email"));
            resume.setSummary(rs.getString("summary"));
            return resume;
        }
    }

    private static class ExperienceRowMapper implements RowMapper<Experience> {
        @Override
        public Experience mapRow(ResultSet rs, int rowNum) throws SQLException {
            Experience exp = new Experience();
            exp.setId(rs.getLong("id"));
            exp.setJobTitle(rs.getString("job_title"));
            exp.setCompany(rs.getString("company"));
            exp.setStartDate(rs.getString("start_date"));
            exp.setEndDate(rs.getString("end_date"));
            exp.setDescription(rs.getString("description"));
            return exp;
        }
    }

    private static class ProjectRowMapper implements RowMapper<Project> {
        @Override
        public Project mapRow(ResultSet rs, int rowNum) throws SQLException {
            Project proj = new Project();
            proj.setId(rs.getLong("id"));
            proj.setTitle(rs.getString("title"));
            proj.setLink(rs.getString("link"));
            proj.setDescription(rs.getString("description"));
            return proj;
        }
    }

    private static class EducationRowMapper implements RowMapper<Education> {
        @Override
        public Education mapRow(ResultSet rs, int rowNum) throws SQLException {
            Education edu = new Education();
            edu.setId(rs.getLong("id"));
            edu.setDegree(rs.getString("degree"));
            edu.setFieldOfStudy(rs.getString("field_of_study"));
            edu.setSchool(rs.getString("school"));
            edu.setDate(rs.getString("date"));
            return edu;
        }
    }
}
