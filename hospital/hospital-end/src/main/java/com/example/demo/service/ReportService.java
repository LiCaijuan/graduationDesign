package com.example.demo.service;

import com.example.demo.entity.Report;

import java.util.List;

public interface ReportService {
    int addReport(Report report);
    List<Report> getReportByReportUrl(String reportUrl);
    List<Report> getReportList();
    List<Report> getReportById(int reportId);
    List<Report> getReportByUserId(int userId);
    int updateReport(Report report);
    int deleteReport(int reportId);
}
