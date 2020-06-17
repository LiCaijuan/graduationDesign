package com.example.demo.service.impl;

import com.example.demo.entity.Admin;
import com.example.demo.mapper.AdminMapper;
import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdminMapper adminMapper;

    @Override
    public int addAdmin(String username, String password, String phone, int adminid) {
        Admin admin = new Admin(username, password, phone, adminid);
        int count = adminMapper.addAdmin(admin);
        return count;
    }

    @Override
    public List<Admin> queryByUsername(String username, String password) {
        List<Admin> adminList = adminMapper.queryByUsername(username, password);
        return adminList;
    }

    @Override
    public List<Admin> getAdminList() {
        List<Admin> adminList = adminMapper.getAdminList();
        return adminList;
    }
}
