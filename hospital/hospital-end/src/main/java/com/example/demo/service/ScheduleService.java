package com.example.demo.service;

import com.example.demo.entity.Schedule;

import java.util.List;

public interface ScheduleService {
    int addSchedule(Schedule schedule);
    List<Schedule> getScheduleList();
    List<Schedule> getScheduleByDate(String scheduleDate);
    List<Schedule> getScheduleByDepartmentId(int departmentId);
    List<Schedule> getScheduleByDoctorId(int doctorId);
    List<Schedule> getScheduleByCondition(int doctorId, int departmentId, String scheduleDate, String interval);
    int updateSchedule(Schedule schedule);
    int deleteSchedule(int scheduleId);
}
