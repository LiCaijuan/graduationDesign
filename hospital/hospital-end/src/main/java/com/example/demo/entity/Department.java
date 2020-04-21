package com.example.demo.entity;

public class Department {
    int departmentId;
    String departmentImg;
    String departmentName;
    String departmentAddress;
    String departmentDesc;
    String departmentSpeciality;

    public Department() {
    }

    public Department(int departmentId, String departmentImg, String departmentName, String departmentAddress, String departmentDesc, String departmentSpeciality) {
        this.departmentId = departmentId;
        this.departmentImg = departmentImg;
        this.departmentName = departmentName;
        this.departmentAddress = departmentAddress;
        this.departmentDesc = departmentDesc;
        this.departmentSpeciality = departmentSpeciality;
    }

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentImg() {
        return departmentImg;
    }

    public void setDepartmentImg(String departmentImg) {
        this.departmentImg = departmentImg;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDepartmentAddress() {
        return departmentAddress;
    }

    public void setDepartmentAddress(String departmentAddress) {
        this.departmentAddress = departmentAddress;
    }

    public String getDepartmentDesc() {
        return departmentDesc;
    }

    public void setDepartmentDesc(String departmentDesc) {
        this.departmentDesc = departmentDesc;
    }

    public String getDepartmentSpeciality() {
        return departmentSpeciality;
    }

    public void setDepartmentSpeciality(String departmentSpeciality) {
        this.departmentSpeciality = departmentSpeciality;
    }
}
