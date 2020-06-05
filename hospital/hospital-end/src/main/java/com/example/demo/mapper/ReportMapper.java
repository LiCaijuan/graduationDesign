package com.example.demo.mapper;


import com.example.demo.entity.Report;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ReportMapper {
    int addReport(Report report);
    List<Report> getReportList();
    List<Report> getReportById(int reportId);
    List<Report> getReportByReportUrl(String reportUrl);
    List<Report> getReportByUserId(int userId);
    int updateReport(@Param("rep") Report report);
    int deleteReport(int reportId);
}
