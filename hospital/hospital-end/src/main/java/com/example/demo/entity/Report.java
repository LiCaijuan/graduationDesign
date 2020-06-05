package com.example.demo.entity;

public class Report {
    int reportId;
    int userId;
    String username;
    String department;
    String date;
    String interval;
    String reportUrl;

    public Report() { }

    public Report(int reportId, int userId, String username, String department, String date, String interval, String reportUrl) {
        this.reportId = reportId;
        this.userId = userId;
        this.username = username;
        this.department = department;
        this.date = date;
        this.interval = interval;
        this.reportUrl = reportUrl;
    }

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }

    public String getReportUrl() {
        return reportUrl;
    }

    public void setReportUrl(String reportUrl) {
        this.reportUrl = reportUrl;
    }
}
