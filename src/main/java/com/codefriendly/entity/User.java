package com.codefriendly.entity;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String password;
    private String college;
    private String branch;
    private String year;
    private Set<String> roles = new LinkedHashSet<>();
    private Set<String> selectedSkillIds = new LinkedHashSet<>();
    private Instant createdAt = Instant.now();

    public User() {
        this.roles.add("LEARNER");
    }

    public User(String name, String email, String password, String college, String branch, String year) {
        this();
        this.name = name;
        this.email = email;
        this.password = password;
        this.college = college;
        this.branch = branch;
        this.year = year;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Set<String> getSelectedSkillIds() {
        return selectedSkillIds;
    }

    public void setSelectedSkillIds(Set<String> selectedSkillIds) {
        this.selectedSkillIds = selectedSkillIds;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
