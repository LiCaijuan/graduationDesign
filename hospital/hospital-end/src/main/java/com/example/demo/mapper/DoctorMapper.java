package com.example.demo.mapper;
import org.apache.ibatis.annotations.Mapper;
import com.example.demo.entity.Doctor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@Mapper
public interface DoctorMapper {
    int addDoctor(Doctor doctor);
    List<Doctor> getDoctorByName(String doctorName);
    List<Doctor> getDoctorList();
    // 首页通过医生name查询医生
    List<Doctor> getDoctorByKey(String doctorName);
    // 通过编号获取医生列表
    List<Doctor> getDoctorById(int doctorId);
    List<Doctor> getDoctorByCondition(@Param("doctorName") String doctorName,@Param("doctorType") int doctorType);

    int updateDoctor(@Param("pro") Doctor doctor);

    int deleteDoctor(int doctorId);
}
