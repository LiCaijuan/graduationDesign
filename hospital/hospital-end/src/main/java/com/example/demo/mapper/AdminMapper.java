package com.example.demo.mapper;

import com.example.demo.entity.Admin;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminMapper {
    int addAdmin(Admin admin);

    List<Admin> queryByUsername(String username, String password);
}
