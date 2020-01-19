package com.example.demo.mapper;

import com.example.demo.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {

    int addUser(User user);
    List<User> queryByUsername(String username,String password);
}
