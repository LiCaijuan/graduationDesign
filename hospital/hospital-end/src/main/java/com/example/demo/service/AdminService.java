package com.example.demo.service;

import com.example.demo.entity.Admin;

import java.util.List;

public interface AdminService {
    int addAdmin(String username, String password, String phone, int adminId); //注册

    List<Admin> queryByUsername(String username, String password); //登录
    List<Admin> getAdminList();
}
