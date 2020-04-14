package com.example.demo.service;

import com.example.demo.entity.Report;

import java.util.List;

public interface ReportService {
    int addReport(Report report);

    List<Report> getReportList();
    List<Report> getReportById(int reportId);
    int updateReport(Report report);
    int deleteReport(int reportId);
}
