package com.example.demo.entity;

public class Doctor {
    String doctorName;
    String doctorDepartment; // 科室
    double doctorPrice; // 挂号费
    String doctorImg; // 头像
    int doctorType; // 职称
    Boolean doctorIsOrder; //是否可预约
    String doctorSpeciality; // 擅长
    String doctorSynopsis; // 简介

    public Doctor(String doctorName, String doctorDepartment, double doctorPrice, String doctorImg, int doctorType, Boolean doctorIsOrder, String doctorSpeciality, String doctorSynopsis) {
        this.doctorName = doctorName;
        this.doctorDepartment = doctorDepartment;
        this.doctorPrice = doctorPrice;
        this.doctorImg = doctorImg;
        this.doctorType = doctorType;
        this.doctorIsOrder = doctorIsOrder;
        this.doctorSpeciality = doctorSpeciality;
        this.doctorSynopsis = doctorSynopsis;
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

    public void setDoctorDepartment(String department) {
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

    public Boolean getDoctorIsOrder() {
        return doctorIsOrder;
    }

    public void setDoctorIsOrder(Boolean doctorIsOrder) {
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
