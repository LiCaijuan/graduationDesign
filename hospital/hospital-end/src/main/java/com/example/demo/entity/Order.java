package com.example.demo.entity;

public class Order {
    int orderId;
    int userId;
    int doctorType;
    String doctorName;
    String departmentName;
    String orderDate;
    String interval;
    String userName;
    String userPhone;
    String userCard; // 身份证号
    String address;

    public Order() {
    }

    public Order(int orderId, int userId, int doctorType, String doctorName, String departmentName, String orderDate, String interval, String userName, String userPhone, String userCard, String address) {
        this.orderId = orderId;
        this.userId = userId;
        this.doctorType = doctorType;
        this.doctorName = doctorName;
        this.departmentName = departmentName;
        this.orderDate = orderDate;
        this.interval = interval;
        this.userName = userName;
        this.userPhone = userPhone;
        this.userCard = userCard;
        this.address = address;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getDoctorType() {
        return doctorType;
    }

    public void setDoctorType(int doctorType) {
        this.doctorType = doctorType;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public String getUserCard() {
        return userCard;
    }

    public void setUserCard(String userCard) {
        this.userCard = userCard;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
