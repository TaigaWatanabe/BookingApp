package com.travelbookingapp.fullstackbackend.controller;

import com.travelbookingapp.fullstackbackend.model.User;
import com.travelbookingapp.fullstackbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.naming.Name;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@SessionAttributes(types = User.class)
@CrossOrigin("http://localhost:3000")
public class LoginController {

    @Autowired
    HttpSession session;

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    List<String> newUser(@RequestBody User newUser){

        List<String> errorMessages = new ArrayList<String>();

        List<User> confirmationEmail = userService.getEmail(newUser.getEmail());

        ModelAndView mav = new ModelAndView();

        if(!StringUtils.hasText(newUser.getName())){
            errorMessages.add("Please input your name");
        } else if (!(newUser.getName().length() <= 20)) {
            errorMessages.add("Please input your name using 20 characters or less");
        }

        if (!StringUtils.hasText(newUser.getPassword())){
            errorMessages.add("Please input your password");
        } else if (!(newUser.getPassword().matches("[a-zA-Z0-9]+$"))) {
            errorMessages.add("Please input at least 6 single-byte alphanumerical characters for the Password");
            errorMessages.add("Please input the Password using up to 20 single-byte alphanumeric.");
        } else if (!(newUser.getPassword().length() >= 6)) {
            errorMessages.add("Please input at least 6 single-byte alphanumerical characters for the Password");
        } else if (!(newUser.getPassword().length() <= 20)) {
            errorMessages.add("Please enter the Password using up to 20 single-byte alphanumeric");
        }
        
        if (!StringUtils.hasText(newUser.getEmail())){
            errorMessages.add("Please input your Email");
        } else if (confirmationEmail.size() >= 1) {
            errorMessages.add("Your Email already registered, so please input other email");
        } else if (!(newUser.getEmail().matches("[a-zA-Z0-9]+@+[a-zA-Z0-9]+.com"))) {
            errorMessages.add("Please input the User Email with using correct formal \n" +
                    "Correct format:~@~.com");
        }

        if(errorMessages.size() != 0) {
            return errorMessages;
        } else {
            userService.saveUser(newUser);
            return errorMessages;
        }
    }

    @PostMapping("/login")
    Map<String, String> loginFunction(@RequestBody User loginUser) {

        String email = loginUser.getEmail();
        String password = loginUser.getPassword();
        Map<String, String> UserInfo = new HashMap<>();
        List<User> registered_user = userService.getLoginUser(email, password);

        if(email == "" || password == "") {
            UserInfo.put("errorMessage", "Please input your email or password");
            UserInfo.put("status", "error");
            return UserInfo;
        }

        if(registered_user.size() == 0){
            UserInfo.put("errorMessage", "Email or Password are wrong!");
            UserInfo.put("status", "error");
            return UserInfo;
        }

        UserInfo.put("userId", String.valueOf(registered_user.get(0).getId()));
        UserInfo.put("email", email);
        UserInfo.put("name", registered_user.get(0).getName());
        UserInfo.put("password", password);
        UserInfo.put("adminUser", String.valueOf(registered_user.get(0).getAdmin()));

        return UserInfo;
    }

}
