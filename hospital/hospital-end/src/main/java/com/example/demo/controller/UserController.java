package com.example.demo.controller;

import com.example.demo.entity.Response;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService service;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Response register(@RequestBody Map<String, String> person) {
        int userId = Integer.parseInt(person.get("userId"));
        String username = person.get("username");
        String password = person.get("password");
        String phone = person.get("phone");

        if (username != null && password != null && phone != null) {
            List<User> users = service.queryByUsername(username, password);
            if (users != null && users.size() > 0) {
                return new Response(false, "注册失败，用户名重复，请更换", -1);
            } else {
                int count = service.addUser(userId, username, password, phone);
                if (count > 0) {
                    return new Response(true, "注册成功", 1);
                } else {
                    return new Response(false, "注册失败", -1);
                }
            }
        } else {
            return new Response(false, "注册失败，请检查用户名、密码、手机号是否为空", -1);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Response login(@RequestBody Map<String, String> person) {
        String username = person.get("username");
        String password = person.get("password");
        if (username != null && password != null) {
            List<User> users = service.queryByUsername(username, password);
            if (users != null && users.size() > 0) {
                User user = users.get(0);
                if (password.equals(user.getPassword())) {
                    return new Response(true, "登录成功", 1);
                } else {
                    return new Response(false, "登录失败，密码错误", -1);
                }
            } else {
                return new Response(false, "登录失败，用户不存在", -1);
            }
        } else {
            return new Response(false, "登录失败，请检查用户名、密码是否为空", -1);
        }
    }
}

