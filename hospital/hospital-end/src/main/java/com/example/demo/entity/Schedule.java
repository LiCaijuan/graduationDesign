package com.example.demo.entity;

public class Schedule {
    int doctorId;
    int departmentId;
    String scheduleDate;
    String interval;

    public Schedule(int doctorId, int departmentId, String scheduleDate, String interval) {
        this.doctorId = doctorId;
        this.departmentId = departmentId;
        this.scheduleDate = scheduleDate;
        this.interval = interval;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public String getScheduleDate() {
        return scheduleDate;
    }

    public void setScheduleDate(String scheduleDate) {
        this.scheduleDate = scheduleDate;
    }

    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }
}
