package com.example.demo.service;

import com.example.demo.entity.Doctor;

import java.util.List;

public interface DoctorService {
    int addDoctor( Doctor doctor);
    List <Doctor> getDoctorList();
    // 关键字模糊查询
    List <Doctor> getDoctorByKey(String doctorName);
    List <Doctor> getDoctorByNum(int doctorNum);

    List <Doctor> getDoctorByCondition(String doctorName, int doctorType);

    int updateDoctor(Doctor doctor);

    //删除医生接口
    int deleteDoctor(int doctorNum);
}
