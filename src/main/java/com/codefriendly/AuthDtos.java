package com.codefriendly.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Set;

public final class AuthDtos {

    private AuthDtos() {
    }

    public record RegisterRequest(
            @NotBlank String name,
            @Email @NotBlank String email,
            @Size(min = 6, message = "must be at least 6 characters") String password,
            String college,
            String branch,
            String year
    ) {
    }

    public record LoginRequest(
            @Email @NotBlank String email,
            @NotBlank String password
    ) {
    }

    public record AuthResponse(
            String token,
            UserView user
    ) {
    }

    public record UserView(
            String id,
            String name,
            String email,
            String college,
            String branch,
            String year,
            Set<String> roles,
            Set<String> selectedSkillIds
    ) {
    }
}
