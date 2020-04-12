package com.example.demo.service;

import com.example.demo.entity.Department;

import java.util.List;

public interface DepartmentService {
    int addDepartment(Department department);
    List<Department> getDepartmentList();
}
