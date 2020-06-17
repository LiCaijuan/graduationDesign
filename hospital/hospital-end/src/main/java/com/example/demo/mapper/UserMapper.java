package com.example.demo.mapper;

import com.example.demo.entity.User;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    int addUser(User user);

    List<User> queryByUsername(String phone);
    int updateUser(@Param("user") User user);
    int deleteUser(int userId);
    List<User> getUserList();
}
