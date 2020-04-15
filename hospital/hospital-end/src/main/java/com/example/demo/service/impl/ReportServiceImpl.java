package com.example.demo.service.impl;

import com.example.demo.entity.Report;
import com.example.demo.mapper.ReportMapper;
import com.example.demo.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    ReportMapper reportMapper;

    @Override
    public int addReport(Report report) {
        int count = reportMapper.addReport(report);
        return count;
    }

    @Override
    public List<Report> getReportByReportUrl(String reportUrl) {
        List<Report> reportList = reportMapper.getReportByReportUrl(reportUrl);
        return reportList;
    }

    @Override
    public List<Report> getReportList() {
        List<Report> reportList = reportMapper.getReportList();
        return reportList;
    }

    @Override
    public List<Report> getReportById(int reportId) {
        List<Report> reportList = reportMapper.getReportById(reportId);
        return reportList;
    }

    @Override
    public int updateReport(Report report) {
        int count = 0;
        try {
            count = reportMapper.updateReport(report);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }

    @Override
    public int deleteReport(int reportId) {
        int count = 0;
        try {
            count = reportMapper.deleteReport(reportId);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }


}
