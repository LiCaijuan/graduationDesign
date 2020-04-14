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
import java.util.Map;

@RestController
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;

    @RequestMapping(value = "/addDepartment", method = RequestMethod.POST)
    public Response addDepartment(@RequestBody Department department) {

        String departmentName = department.getDepartmentName();
        List<Department> departmentList = departmentService.getDepartmentByName(departmentName);
        if (departmentList != null && departmentList.size()>0) {
            Response response = new Response(false,"添加失败，科室已存在", -1);
            return response;
        } else {
            int count = departmentService.addDepartment(department);
            if (count > 0) {
                Response response = new Response(true,"添加成功",1);
                return response;
            } else {
                Response response = new Response(false,"添加失败",-1);
                return response;
            }
        }
    }

    @RequestMapping(value = "/getDepartmentByName", method = RequestMethod.POST)
    public Response getDepartmentByName(@RequestBody Department department) {
        String departmentName = department.getDepartmentName();
        Response response = new Response();
        List<Department> departmentList = departmentService.getDepartmentByName(departmentName);
        response.setResponse(true, "查询成功", 1, departmentList);
        return response;
    }

    @RequestMapping(value = "/getDepartmentList", method = RequestMethod.POST)
    public Response getDepartmentList() {
        Response response = new Response();
        List<Department> departmentList = departmentService.getDepartmentList();
        response.setResponse(true, "查询成功", 1, departmentList);
        return response;
    }

    @RequestMapping(value = "/getDepartmentByKey", method = RequestMethod.POST)
    public Response getDepartmentByKey(@RequestBody Map<String, String> department) {
        String departmentName = department.get("departmentName");
        String departmentSpeciality = department.get("departmentSpeciality");
        if (departmentSpeciality != null) {
            departmentName = departmentSpeciality;
        }
        Response response = new Response();
        List<Department> departmentList = departmentService.getDepartmentByKey(departmentName);
        response.setResponse(true, "查询成功", 1, departmentList);
        return response;
    }

    @RequestMapping(value = "/updateDepartment", method = RequestMethod.POST)
    public Response updateDepartment(@RequestBody Department department) {
        int departmentId = department.getDepartmentId();
        int count = departmentService.updateDepartment(department);
        if (departmentId != 0) {
            if (count > 0) {
                Response response = new Response(true, "更新成功", 1);
                return response;
            } else {
                Response response = new Response(false, "更新失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "更新失败，请传入商品ID", -1);
            return response;
        }
    }

    @RequestMapping(value = "/deleteDepartment", method = RequestMethod.POST)
    public Response deleteDepartment(@RequestBody  Department department) {
        int departmentId = department.getDepartmentId();
        int count = departmentService.deleteDepartment(departmentId);

        if (departmentId != 0) {
            if (count > 0) {
                Response response = new Response(true, "删除成功", 1);
                return response;
            } else {
                Response response = new Response(false, "删除失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false,"删除失败，请传入科室ID", -1);
            return response;
        }
    }
}
