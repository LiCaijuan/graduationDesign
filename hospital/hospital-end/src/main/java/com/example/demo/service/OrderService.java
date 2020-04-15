package com.example.demo.service;

import com.example.demo.entity.Order;

import java.util.List;

public interface OrderService {
    int addOrder(Order order);
    List<Order> getOrderList();
    List<Order> getOrderByCondition(String userCard, String orderDate, String interval);
}
