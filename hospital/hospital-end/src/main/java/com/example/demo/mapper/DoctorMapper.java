package com.example.demo.mapper;

import com.example.demo.entity.Doctor;

import java.util.List;

public interface DoctorMapper {
    int addDoctor(Doctor doctor);
    List<Doctor> getDoctorList();
}
