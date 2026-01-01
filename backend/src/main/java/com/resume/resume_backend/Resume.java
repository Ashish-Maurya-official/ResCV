package com.resume.resume_backend;

import lombok.Data;
import java.util.List;

@Data
public class Resume {
    private Long id;
    private String fullName;
    private String address;
    private String phone;
    private String email;
    private String summary;
    private List<String> skills;
    private List<Experience> experience;
    private List<Project> projects;
    private List<Education> education;
}
