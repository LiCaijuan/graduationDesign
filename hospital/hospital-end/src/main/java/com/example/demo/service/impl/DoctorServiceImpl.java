package com.example.demo.service.impl;

import com.example.demo.entity.Doctor;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DoctorServiceImpl implements DoctorService {
    @Autowired
    DoctorMapper doctorMapper;

    @Override
    public int addDoctor(Doctor doctor) {
        int count = doctorMapper.addDoctor(doctor);
        return count;
    }

    @Override
    public List<Doctor> getDoctorList() {
        List <Doctor> doctorList = doctorMapper.getDoctorList();
        return doctorList;
    }
}
