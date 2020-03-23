package com.example.demo.service;


import com.example.demo.entity.User;

import java.util.List;

public interface UserService {
    int addUser(String username, String password, String phone); //注册

    List<User> queryByUsername(String username, String password); //登录
}
