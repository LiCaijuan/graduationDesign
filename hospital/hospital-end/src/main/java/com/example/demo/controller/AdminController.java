package com.example.demo.controller;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Response;
import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class AdminController {
    @Autowired
    AdminService adminService;

    @RequestMapping(value = "/addAdmin", method = RequestMethod.POST)
    public Response addAdmin(@RequestBody Map<String, String> person) {
        String username = person.get("username");
        String password = person.get("password");
        String phone = person.get("phone");
        int adminid = Integer.parseInt(person.get("adminid"));

        if (username != null && password != null && phone != null && adminid == 2016) {
            List<Admin> admins = adminService.queryByUsername(username, password);
            if (admins != null && admins.size() > 0) {
                return new Response(false, "注册失败，用户名重复", -1);
            } else {
                int count = adminService.addAdmin(username, password, phone, adminid);
                if (count > 0) {
                    return new Response(true, "注册成功", 1);
                } else {
                    return new Response(false, "注册失败", -1);
                }
            }
        } else if (adminid != 2016) {
            return new Response(false, "注册失败，请输入正确的adminid", -1);
        } else {
            return new Response(false, "注册失败，请检查是否有空", -1);
        }
    }

    @RequestMapping(value = "/queryByUsername", method = RequestMethod.POST)
    public Response queryByUsername(@RequestBody Map<String, String> person) {
        String username = person.get("username");
        String password = person.get("password");
        if (username != null && password != null) {
            List<Admin> admins = adminService.queryByUsername(username, password);
            if (admins != null && admins.size() > 0) {
                Admin admin = admins.get(0);
                if (password.equals(admin.getPassword())) {
                    return new Response(true, "登录成功", 1);
                } else {
                    return new Response(false, "密码错误", -1);
                }
            } else {
                return new Response(false, "用户不存在", -1);
            }
        } else {
            return new Response(false, "请填入账号、密码", -1);
        }
    }
}
