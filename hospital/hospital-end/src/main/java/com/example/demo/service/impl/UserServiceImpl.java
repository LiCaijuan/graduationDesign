package com.example.demo.service.impl;

import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;


    @Override
    public int addUser(User user) {
        int count = userMapper.addUser(user);
        return count;
    }

    @Override
    public List<User> queryByUsername(String phone) {
        List<User> userList = userMapper.queryByUsername(phone);
        return userList;
    }

    @Override
    public int UpdateUser(User user) {
        int count = 0;
        try{
            count = userMapper.updateUser(user);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }

    @Override
    public int deleteUser(int userId) {
        int count = 0;
        try {
            count = userMapper.deleteUser(userId);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }
}
