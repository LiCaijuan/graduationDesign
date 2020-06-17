package com.example.demo.mapper;

import com.example.demo.entity.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface AdminMapper {
    int addAdmin(Admin admin);
    List<Admin> getAdminList();
    List<Admin> queryByUsername(String username, String password);
}
