package com.example.demo.controller;

import com.example.demo.entity.Doctor;
import com.example.demo.entity.Response;
import com.example.demo.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DoctorController {
    @Autowired
    DoctorService doctorService;
    @RequestMapping(value = "/addDoctor", method = RequestMethod.POST)
    public Response addDoctor(@RequestBody Doctor doctor) {
        int count = doctorService.addDoctor(doctor);
        if (count > 0) {
            Response response = new Response(true,"添加成功",1);
            return response;
        } else {
            Response response = new Response(false,"添加失败", -1);
            return response;
        }
    }
    @RequestMapping(value = "/getDoctorList", method = RequestMethod.POST)
    public Response getDoctorList() {
        Response response = new Response();
        List<Doctor> doctorList = doctorService.getDoctorList();
        response.setResponse(true, "查询成功", 1, doctorList);
        return response;
    }
}
