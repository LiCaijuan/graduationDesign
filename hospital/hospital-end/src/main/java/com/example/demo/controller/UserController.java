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
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Response register(@RequestBody User user) {
        Response result;
        String username = user.getUsername();
        String password = user.getPassword();

        List<User> userList = userService.queryByUsername(username, password);
        if (userList != null && userList.size() > 0) {
            Response response = new Response(false, "用户已存在", -1);
            result = response;
        } else {
            int count = userService.addUser(user);
            if (count > 0) {
                Response response = new Response(true, "添加成功", 1);
                result = response;
            } else {
                Response response = new Response(false, "添加失败", -1);
                result = response;
            }
        }
        return result;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Response login(@RequestBody Map<String, String> person) {
        String username = person.get("username");
        String password = person.get("password");
        if (username != null && password != null) {
            List<User> users = userService.queryByUsername(username, password);
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

