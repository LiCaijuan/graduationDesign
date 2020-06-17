package com.example.demo.service;


import com.example.demo.entity.User;

import java.util.List;

public interface UserService {
    int addUser(User user); //注册

    List<User> queryByUsername(String phone); //登录
    int UpdateUser(User user);
    int deleteUser(int userId);
    List<User> getUserList();
}
