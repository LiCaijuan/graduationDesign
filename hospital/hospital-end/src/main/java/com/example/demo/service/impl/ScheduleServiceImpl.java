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
    public List<Schedule> getScheduleByDate(String scheduleDate) {
        List<Schedule> scheduleList = scheduleMapper.getScheduleByDate(scheduleDate);
        return scheduleList;
    }

    @Override
    public List<Schedule> getScheduleByDepartmentId(int departmentId) {
        List<Schedule> scheduleList1 = scheduleMapper.getScheduleByDepartmentId(departmentId);
        return scheduleList1;
    }

    @Override
    public int deleteSchedule(int scheduleId) {
        int count = scheduleMapper.deleteSchedule(scheduleId);
        return count;
    }
}
