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
import java.util.Map;
@RestController
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @RequestMapping(value = "/addDoctor", method = RequestMethod.POST)
    public Response addDoctor(@RequestBody Doctor doctor) {
        String doctorName = doctor.getDoctorName();
        List<Doctor> doctorList = doctorService.getDoctorByName(doctorName);
        if (doctorList != null && doctorList.size() > 0) {
            Response response = new Response(false, "添加失败，医生已存在", -1);
            return response;
        } else {
            int count = doctorService.addDoctor(doctor);
            if (count > 0) {
                Response response = new Response(true, "添加成功", 1);
                return response;
            } else {
                Response response = new Response(false, "添加失败", -1);
                return response;
            }
        }
    }

    @RequestMapping(value = "/getDoctorList", method = RequestMethod.POST)
    public Response getDoctorList() {
        Response response = new Response();
        List<Doctor> doctorList = doctorService.getDoctorList();
        response.setResponse(true, "查询成功", 1, doctorList);
        return response;
    }

    //
    @RequestMapping(value = "/getDoctorByKey", method = RequestMethod.POST)
    public Response getDoctorByKey(@RequestBody Map<String, String> doctor) {
        String doctorName = doctor.get("doctorName");
        String doctorSynopsis = doctor.get("doctorSynopsis");
        if (doctorSynopsis != null) {
            doctorName = doctorSynopsis;
        }
        Response response = new Response();
        List<Doctor> doctorList = doctorService.getDoctorByKey(doctorName);
        response.setResponse(true, "查询成功", 1, doctorList);
        return response;
    }

    @RequestMapping(value = "/getDoctorById", method = RequestMethod.POST)
    public Response getDoctorById(@RequestBody Doctor doctor) {
        int doctorId = doctor.getDoctorId();
        Response response = new Response();
        List<Doctor> doctorList = doctorService.getDoctorById(doctorId);
        response.setResponse(true, "查询成功", 1, doctorList);
        return response;
    }

    // 根据条件查询
    @RequestMapping(value = "/getDoctorByCondition", method = RequestMethod.POST)
    public Response getDoctorByCondition(@RequestBody Doctor doctor){
        String doctorName = doctor.getDoctorName();
        int doctorType = doctor.getDoctorType();
        Response response = new Response();
        List<Doctor> doctorList = doctorService.getDoctorByCondition(doctorName, doctorType);
        response.setResponse(true, "查询成功", 1, doctorList);
        return response;
    }

    // 更新医生  暂时并没有用到这个接口
    @RequestMapping(value = "/updateDoctor", method = RequestMethod.POST)
    public Response updateDoctor(@RequestBody Doctor doctor) {
        int doctorId = doctor.getDoctorId();
        int count = doctorService.updateDoctor(doctor);
        if (doctorId!=0){
            if (count > 0){
                Response response = new Response(true, "更新成功",1);
                return response;
            } else {
                Response response = new Response(false, "更新失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false,"请传入医生Id",-1);
            return response;
        }
    }

    // 删除医生
    @RequestMapping(value = "/deleteDoctor", method = RequestMethod.POST)
    public Response deleteDoctor(@RequestBody Doctor doctor) {
        int doctorId = doctor.getDoctorId();
        if (doctorId != 0){
            int count = doctorService.deleteDoctor(doctorId);
            if (count > 0) {
                Response response = new Response(true, "删除成功",1);
                return response;
            } else {
                Response response = new Response(false, "删除失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "删除失败，请传入医生Id",-1);
            return response;
        }
    }
}


