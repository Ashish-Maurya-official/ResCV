package com.resume.resume_backend;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
}
