package com.resume.resume_backend;

import lombok.Data;

@Data
public class Education {
    private Long id;
    private String degree;
    private String fieldOfStudy;
    private String school;
    private String date;
}
