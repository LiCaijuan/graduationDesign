package com.example.demo.mapper;

import com.example.demo.entity.Schedule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ScheduleMapper {
    int addSchedule(Schedule schedule);
    List<Schedule> getScheduleList();
    List<Schedule> getScheduleByDate(String scheduleDate);
    List<Schedule> getScheduleByDepartmentId(int departmentId);
    List<Schedule> getScheduleByDoctorId(int doctorId);
    List<Schedule> getScheduleByDoctorCondition(@Param("doctorId") int doctorId, @Param("scheduleDate") String scheduleDate);
    List<Schedule> getScheduleByDepartmentCondition(@Param("departmentId") int departmentId, @Param("scheduleDate") String scheduleDate);
    List<Schedule> getScheduleByCondition(@Param("doctorId") int doctorId, @Param("departmentId") int departmentId, @Param("scheduleDate") String scheduleDate, @Param("interval") String interval);
    int updateSchedule(@Param("sch") Schedule schedule);
    int deleteSchedule(int scheduleId);
}
