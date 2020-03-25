package com.example.demo.controller;

import com.example.demo.entity.Doctor;
import com.example.demo.entity.Response;
import com.example.demo.entity.Schedule;
import com.example.demo.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScheduleController {
    @Autowired
    ScheduleService scheduleService;

    @RequestMapping(value = "/addSchedule", method = RequestMethod.POST)
    public Response addSchedule(@RequestBody Schedule schedule) {
        int count = scheduleService.addSchedule(schedule);
        if (count > 0) {
            Response response = new Response(true,"添加成功",1);
            return response;
        } else {
            Response response = new Response(false, "添加失败", -1);
            return response;
        }
    }

    @RequestMapping(value = "/getScheduleByDate", method = RequestMethod.POST)
    public Response getScheduleByDate(@RequestBody Schedule schedule) {
        String scheduleDate = schedule.getScheduleDate();
        Response response = new Response();
        List<Schedule> scheduleList = scheduleService.getScheduleByDate(scheduleDate);
        response.setResponse(true,"查询成功",1, scheduleList);
        return response;
    }

    @RequestMapping(value = "/getScheduleByDepartmentId", method = RequestMethod.POST)
    public Response getScheduleByDepartmentId(@RequestBody Schedule schedule) {
        int departmentId = schedule.getDepartmentId();
        Response response = new Response();
        List<Schedule> scheduleList = scheduleService.getScheduleByDepartmentId(departmentId);
        response.setResponse(true,"查询成功",1, scheduleList);
        return response;
    }

    @RequestMapping(value = "/deleteSchedule", method = RequestMethod.POST)
    public Response deleteSchedule(@RequestBody Schedule schedule) {
        int scheduleId = schedule.getScheduleId();
        if (scheduleId != 0){
            int count = scheduleService.deleteSchedule(scheduleId);
            if (count > 0) {
                Response response = new Response(true, "删除成功",1);
                return response;
            } else {
                Response response = new Response(false, "删除失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "删除失败，请传入商品id",-1);
            return response;
        }
    }
}
