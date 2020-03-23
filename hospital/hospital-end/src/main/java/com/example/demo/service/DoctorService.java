package com.example.demo.service;

import com.example.demo.entity.Doctor;

import java.util.List;

public interface DoctorService {
    int addDoctor( Doctor doctor);
    List<Doctor> getDoctorList();
}
