package com.travelbookingapp.fullstackbackend.service;

import com.travelbookingapp.fullstackbackend.encrypt.encrypt;
import com.travelbookingapp.fullstackbackend.model.User;
import com.travelbookingapp.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    // Encrypt registered Password
    public void saveUser(User newUser){
//        String encryptPassword= encrypt.encrypt(newUser.getPassword());
//        newUser.setPassword(encryptPassword);
        userRepository.save(newUser);
    }

    // Find same email
    public List<User> getEmail(String email){
        return userRepository.findByEmail(email);
    }

    // Find registered user info
    public List<User> getLoginUser(String email, String password){
//        String encryptPassword= encrypt.encrypt(password);
//        return userRepository.findByAccount(email, encryptPassword);
        return userRepository.findByAccount(email,password);
    }
}
