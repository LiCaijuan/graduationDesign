package com.example.demo.entity;

public class Admin {
    public String username;
    public String password;
    public String phone;
    public int adminid;

    public Admin() {
    }

    public Admin(String username, String password, String phone, int adminid) {
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.adminid = adminid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getAdminid() {
        return adminid;
    }

    public void setAdminid(int adminid) {
        this.adminid = adminid;
    }
}
