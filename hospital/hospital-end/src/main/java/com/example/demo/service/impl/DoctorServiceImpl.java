package com.example.demo.service.impl;

import com.example.demo.entity.Doctor;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
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

    @Override
    public List<Doctor> getDoctorByKey(String doctorName) {
        List<Doctor> doctorList1 = doctorMapper.getDoctorByKey(doctorName);
        return doctorList1;
    }

    @Override
    public List<Doctor> getDoctorByNum(int doctorNum) {
        List<Doctor> doctorList2 = doctorMapper.getDoctorByNum(doctorNum);
        return doctorList2;
    }

    @Override
    public List<Doctor> getDoctorByCondition(String doctorName, int doctorType) {
        List<Doctor> doctorList3 = doctorMapper.getDoctorByCondition(doctorName, doctorType);
        return doctorList3;
    }

    @Override
    public int updateDoctor(Doctor doctor) {
        int count = 0;
        try {
            count = doctorMapper.updateDoctor(doctor);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }

    @Override
    public int deleteDoctor(int doctorNum) {
        int count = 0;
        try {
            count = doctorMapper.deleteDoctor(doctorNum);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }

}
