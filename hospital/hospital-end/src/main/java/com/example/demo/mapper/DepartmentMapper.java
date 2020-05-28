package com.example.demo.mapper;

import com.example.demo.entity.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface DepartmentMapper {
    int addDepartment(Department department);
    List<Department> getDepartmentById(int departmentId);
    List<Department> getDepartmentByName(String departmentName);
    List<Department> getDepartmentList();
    List<Department> getDepartmentByKey(String departmentName);

    int updateDepartment(@Param("dep") Department department);
    
    int deleteDepartment(int departmentId);
}
