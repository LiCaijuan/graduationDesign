package com.example.demo.service.impl;

import com.example.demo.entity.Schedule;
import com.example.demo.mapper.ScheduleMapper;
import com.example.demo.service.ScheduleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    ScheduleMapper scheduleMapper;
    @Override
    public int addSchedule(Schedule schedule) {
        int count = scheduleMapper.addSchadule(schedule);
        return count;
    }

    @Override
    public List<Schedule> getScheduleByDate(String scheduleDate) {
        List<Schedule> scheduleList = scheduleMapper.getScheduleByDate(scheduleDate);
        return scheduleList;
    }
}
