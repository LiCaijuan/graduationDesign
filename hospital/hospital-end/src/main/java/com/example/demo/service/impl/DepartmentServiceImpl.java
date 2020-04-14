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
    public List<Department> getDepartmentByName(String departmentName) {
        List<Department> departmentList = departmentMapper.getDepartmentByName(departmentName);
        return departmentList;
    }

    @Override
    public List<Department> getDepartmentList() {
        List<Department> departmentList = departmentMapper.getDepartmentList();
        return departmentList;
    }

    @Override
    public List<Department> getDepartmentByKey(String departmentName) {
        List<Department> departmentList = departmentMapper.getDepartmentByKey(departmentName);
        return departmentList;
    }

    @Override
    public int updateDepartment(Department department) {
        int count = 0;
        try {
            count = departmentMapper.updateDepartment(department);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }

    @Override
    public int deleteDepartment(int departmentId) {
        int count = 0;
        try {
            count = departmentMapper.deleteDepartment(departmentId);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }
}
