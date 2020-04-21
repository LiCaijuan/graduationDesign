package com.example.demo.service;

import com.example.demo.entity.Department;

import java.util.List;

public interface DepartmentService {
    int addDepartment(Department department);
    List<Department> getDepartmentById(int departmentId);
    List<Department> getDepartmentByName(String departmentName);
    List<Department> getDepartmentList();
    List<Department> getDepartmentByKey(String departmentName);
    int updateDepartment(Department department);
    int deleteDepartment(int departmentId);
}
