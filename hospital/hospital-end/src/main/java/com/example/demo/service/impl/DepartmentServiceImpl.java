package com.example.demo.service.impl;

import com.example.demo.entity.Department;
import com.example.demo.mapper.DepartmentMapper;
import com.example.demo.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    DepartmentMapper departmentMapper;
    @Override
    public int addDepartment(Department department) {
        int count = departmentMapper.addDepartment(department);
        return count;
    }

    @Override
    public List<Department> getDepartmentList() {
        List<Department> departmentList = departmentMapper.getDepartmentList();
        return departmentList;
    }
}
