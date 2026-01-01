package com.resume.resume_backend;

import lombok.Data;

@Data
public class Project {
    private Long id;
    private String title;
    private String link;
    private String description;
}
