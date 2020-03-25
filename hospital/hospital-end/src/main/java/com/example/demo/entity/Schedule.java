package com.example.demo.entity;

public class Schedule {
    int scheduleId;
    int doctorId;
    int departmentId;
    String scheduleDate;
    String interval;

    public Schedule(int scheduleId, int doctorId, int departmentId, String scheduleDate, String interval) {
        this.scheduleId = scheduleId;
        this.doctorId = doctorId;
        this.departmentId = departmentId;
        this.scheduleDate = scheduleDate;
        this.interval = interval;
    }

    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
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
