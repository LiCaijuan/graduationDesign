package com.example.demo.mapper;
import org.apache.ibatis.annotations.Mapper;
import com.example.demo.entity.Doctor;

import java.util.List;
@Mapper
public interface DoctorMapper {
    int addDoctor(Doctor doctor);
    List<Doctor> getDoctorList();
    // 首页通过医生name查询医生
    List<Doctor> getDoctorByKey(String doctorName);
    // 通过编号获取医生列表
    List<Doctor> getDoctorByNum(int doctorNum);
    List<Doctor> getDoctorByCondition(String doctorName, int doctorType);
}
