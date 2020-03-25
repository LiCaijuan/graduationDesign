package com.example.demo.service;

import com.example.demo.entity.Schedule;

import java.util.List;

public interface ScheduleService {
    int addSchedule(Schedule schedule);
    List<Schedule> getScheduleByDate(String scheduleDate);
    List<Schedule> getScheduleByDepartmentId(int departmentId);
    int deleteSchedule(int scheduleId);
}
