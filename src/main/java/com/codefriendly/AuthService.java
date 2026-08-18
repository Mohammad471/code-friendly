package com.codefriendly.service;

import com.codefriendly.dto.AuthDtos;
import com.codefriendly.entity.User;
import com.codefriendly.exception.DuplicateResourceException;
import com.codefriendly.exception.ResourceNotFoundException;
import com.codefriendly.repository.UserRepository;
import com.codefriendly.security.JwtService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("An account already exists for this email");
        }
        User user = new User(
                request.name().trim(),
                email,
                passwordEncoder.encode(request.password()),
                request.college(),
                request.branch(),
                request.year()
        );
        User saved = userRepository.save(user);
        return new AuthDtos.AuthResponse(jwtService.generateToken(saved), toUserView(saved));
    }

    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest request) {
        User user = userRepository.findByEmail(request.email().trim().toLowerCase())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }
        return new AuthDtos.AuthResponse(jwtService.generateToken(user), toUserView(user));
    }

    public AuthDtos.UserView currentUser(String email) {
        return toUserView(findByEmail(email));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public AuthDtos.UserView toUserView(User user) {
        return new AuthDtos.UserView(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCollege(),
                user.getBranch(),
                user.getYear(),
                user.getRoles(),
                user.getSelectedSkillIds()
        );
    }
}
