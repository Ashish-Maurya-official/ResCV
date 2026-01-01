package com.resume.resume_backend;

import lombok.Data;

@Data
public class Experience {
    private Long id;
    private String jobTitle;
    private String company;
    private String startDate;
    private String endDate;
    private String description;
}
