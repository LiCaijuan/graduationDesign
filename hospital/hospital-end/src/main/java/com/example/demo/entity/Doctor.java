package com.example.demo.entity;

public class Doctor {
    int doctorNum;
    int doctorId;
    String doctorName;
    String doctorDepartment; // 科室
    double doctorPrice; // 挂号费
    String doctorImg; // 头像
    int doctorType; // 职称
    int doctorIsOrder; //是否可预约
    String doctorSpeciality; // 擅长
    String doctorSynopsis; // 简介

    public Doctor() {
    }

    public Doctor(int doctorNum, int doctorId, String doctorName, String doctorDepartment, double doctorPrice, String doctorImg, int doctorType, int doctorIsOrder, String doctorSpeciality, String doctorSynopsis) {
        this.doctorNum = doctorNum;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.doctorDepartment = doctorDepartment;
        this.doctorPrice = doctorPrice;
        this.doctorImg = doctorImg;
        this.doctorType = doctorType;
        this.doctorIsOrder = doctorIsOrder;
        this.doctorSpeciality = doctorSpeciality;
        this.doctorSynopsis = doctorSynopsis;
    }

    public int getDoctorNum() {
        return doctorNum;
    }

    public void setDoctorNum(int doctorNum) {
        this.doctorNum = doctorNum;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorDepartment() {
        return doctorDepartment;
    }

    public void setDoctorDepartment(String doctorDepartment) {
        this.doctorDepartment = doctorDepartment;
    }

    public double getDoctorPrice() {
        return doctorPrice;
    }

    public void setDoctorPrice(double doctorPrice) {
        this.doctorPrice = doctorPrice;
    }

    public String getDoctorImg() {
        return doctorImg;
    }

    public void setDoctorImg(String doctorImg) {
        this.doctorImg = doctorImg;
    }

    public int getDoctorType() {
        return doctorType;
    }

    public void setDoctorType(int doctorType) {
        this.doctorType = doctorType;
    }

    public int getDoctorIsOrder() {
        return doctorIsOrder;
    }

    public void setDoctorIsOrder(int doctorIsOrder) {
        this.doctorIsOrder = doctorIsOrder;
    }

    public String getDoctorSpeciality() {
        return doctorSpeciality;
    }

    public void setDoctorSpeciality(String doctorSpeciality) {
        this.doctorSpeciality = doctorSpeciality;
    }

    public String getDoctorSynopsis() {
        return doctorSynopsis;
    }

    public void setDoctorSynopsis(String doctorSynopsis) {
        this.doctorSynopsis = doctorSynopsis;
    }
}
