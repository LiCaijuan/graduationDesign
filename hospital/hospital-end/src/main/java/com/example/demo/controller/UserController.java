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
    UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Response register(@RequestBody User user) {
        Response result;
        String phone = user.getPhone();
        String password = user.getPassword();

        List<User> userList = userService.queryByUsername(phone);
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
        Response response = new Response();
        String phone = person.get("phone");
        String password = person.get("password");
        if (phone != null && password != null) {
            List<User> users = userService.queryByUsername(phone);
            if (users != null && users.size() > 0) {
                User user = users.get(0);
                if (password.equals(user.getPassword())) {
                    response.setResponse(true, "登陆成功", 1, user);
                    return response;
//                    return new Response(true, "登录成功", 1);
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
    // 修改密码的接口
    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
    public Response updateUser(@RequestBody User user) {
        int userId = user.getUserId();
        int count = userService.UpdateUser(user);
        if (userId != 0) {
            if (count > 0 ) {
                Response response = new Response(true, "更改密码成功", 1);
                return response;
            } else {
                Response response = new Response(false, "更改密码失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "请传入用户Id", -1);
            return response;
        }
    }

    //注销账号
    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    public Response deleteUser(@RequestBody User user) {
        int userId = user.getUserId();
        if (userId != 0) {
            int count = userService.deleteUser(userId);
            if (count > 0) {
                Response response = new Response(true, "已成功注销账号", 1);
                return response;
            } else {
                Response response = new Response(false, "注销失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "请传入用户Id", -1);
            return response;
        }
    }
}

