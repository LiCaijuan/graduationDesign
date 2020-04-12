package com.example.demo.controller;

import com.example.demo.entity.Department;
import com.example.demo.entity.Response;
import com.example.demo.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;

    @RequestMapping(value = "/addDepartment", method = RequestMethod.POST)
    public Response addDepartment(@RequestBody Department department) {
        int count = departmentService.addDepartment(department);
        if (count > 0) {
            Response response = new Response(true,"添加成功",1);
            return response;
        } else {
            Response response = new Response(false,"添加失败",-1);
            return response;
        }
    }

    @RequestMapping(value = "/getDepartmentList", method = RequestMethod.POST)
    public Response getDepartmentList() {
        Response response = new Response();
        List<Department> departmentList = departmentService.getDepartmentList();
        response.setResponse(true, "查询成功", 1, departmentList);
        return response;
    }
}
