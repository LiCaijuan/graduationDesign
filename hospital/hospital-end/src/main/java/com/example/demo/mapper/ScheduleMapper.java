package com.example.demo.mapper;

import com.example.demo.entity.Doctor;
import com.example.demo.entity.Schedule;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ScheduleMapper {
    int addSchadule(Schedule schedule);
    List<Schedule> getScheduleByDate(String scheduleDate);
}
