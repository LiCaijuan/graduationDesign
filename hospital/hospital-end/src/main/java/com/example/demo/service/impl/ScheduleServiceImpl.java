package com.example.demo.service.impl;

import com.example.demo.entity.Schedule;
import com.example.demo.mapper.ScheduleMapper;
import com.example.demo.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    ScheduleMapper scheduleMapper;
    @Override
    public int addSchedule(Schedule schedule) {
        int count = scheduleMapper.addSchedule(schedule);
        return count;
    }

    @Override
    public List<Schedule> getScheduleList() {
        List<Schedule> scheduleList = scheduleMapper.getScheduleList();
        return scheduleList;
    }

    @Override
    public List<Schedule> getScheduleByDate(String scheduleDate) {
        List<Schedule> scheduleList = scheduleMapper.getScheduleByDate(scheduleDate);
        return scheduleList;
    }

    @Override
    public List<Schedule> getScheduleByDepartmentId(int departmentId) {
        List<Schedule> scheduleList = scheduleMapper.getScheduleByDepartmentId(departmentId);
        return scheduleList;
    }

    @Override
    public List<Schedule> getScheduleByDoctorCondition(int doctorId, String scheduleDate) {
        List<Schedule> scheduleList = scheduleMapper.getScheduleByDoctorCondition(doctorId, scheduleDate);
        return scheduleList;
    }

    @Override
    public List<Schedule> getScheduleByDepartmentCondition(int departmentId, String scheduleDate) {
        List<Schedule> scheduleList = scheduleMapper.getScheduleByDepartmentCondition(departmentId, scheduleDate);
        return scheduleList;
    }

    @Override
    public List<Schedule> getScheduleByDoctorId(int doctorId) {
        List<Schedule> scheduleList = scheduleMapper.getScheduleByDoctorId(doctorId);
        return scheduleList;
    }

    @Override
    public List<Schedule> getScheduleByCondition(int doctorId, int departmentId, String scheduleDate, String interval) {
        List<Schedule> scheduleList = scheduleMapper.getScheduleByCondition(doctorId, departmentId, scheduleDate, interval);
        return scheduleList;
    }

    @Override
    public int updateSchedule(Schedule schedule) {
        int count = 0;
        try {
            count = scheduleMapper.updateSchedule(schedule);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }

    @Override
    public int deleteSchedule(int scheduleId) {
        int count = 0;
        try {
            count = scheduleMapper.deleteSchedule(scheduleId);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }
}
