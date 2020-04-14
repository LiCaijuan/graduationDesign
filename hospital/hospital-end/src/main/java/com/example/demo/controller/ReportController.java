package com.example.demo.controller;

import com.example.demo.entity.Report;
import com.example.demo.entity.Response;
import com.example.demo.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReportController {
    @Autowired
    ReportService reportService;

    @RequestMapping(value = "/addReport", method = RequestMethod.POST)
    public Response addReport(@RequestBody Report report) {
        int count = reportService.addReport(report);
        if (count > 0) {
            Response response = new Response(true, "添加成功", 1);
            return response;
        } else {
            Response response = new Response(false, "添加失败", -1);
            return response;
        }
    }

    @RequestMapping(value = "/getReportList", method = RequestMethod.POST)
    public Response getReportList() {
        Response response = new Response();
        List<Report> reportList = reportService.getReportList();
        response.setResponse(true, "查询成功", 1, reportList);
        return response;
    }

    @RequestMapping(value = "/getReportById", method = RequestMethod.POST)
    public Response getReportById(@RequestBody Report report) {
        int reportId = report.getReportId();
        Response response = new Response();
        List<Report> reportList = reportService.getReportById(reportId);
        response.setResponse(true, "查询成功", 1, reportList);
        return response;
    }

    @RequestMapping(value = "/updateReport", method = RequestMethod.POST)
    public Response updateReport(@RequestBody Report report) {
        int reportId = report.getReportId();
        int count = reportService.updateReport(report);
        if (reportId != 0) {
            if (count > 0) {
                Response response = new Response(true, "更新成功", 1);
                return response;
            } else {
                Response response = new Response(false, "更新失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "更新失败，请传入报告ID", -1);
            return response;
        }
    }

    @RequestMapping(value = "/deleteReport", method = RequestMethod.POST)
    public Response deleteReport(@RequestBody Report report) {
        int reportId = report.getReportId();
        int count = reportService.deleteReport(reportId);
        if (reportId != 0) {
            if (count > 0) {
                Response response = new Response(true, "删除成功", 1);
                return response;
            } else {
                Response response = new Response(false, "删除失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "删除失败，请传入报告ID", -1);
            return response;
        }
    }
}
