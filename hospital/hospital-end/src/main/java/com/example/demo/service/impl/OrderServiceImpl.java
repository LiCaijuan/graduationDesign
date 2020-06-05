package com.example.demo.service.impl;

import com.example.demo.entity.Order;
import com.example.demo.mapper.OrderMapper;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Override
    public int addOrder(Order order) {
        int count = orderMapper.addOrder(order);
        return count;
    }

    @Override
    public List<Order> getOrderList() {
        List<Order> orderList = orderMapper.getOrderList();
        return orderList;
    }

    @Override
    public List<Order> getOrderByCondition(String userCard, String orderDate, String interval) {
        List<Order> orderList = orderMapper.getOrderByCondition(userCard, orderDate, interval);
        return orderList;
    }

    @Override
    public List<Order> getOrderByUserId(int userId) {
        List<Order> orderList = orderMapper.getOrderByUserId(userId);
        return orderList;
    }

    @Override
    public int deleteOrder(int orderId) {
        int count = 0;
        try {
            count = orderMapper.deleteOrder(orderId);
        } catch (Exception err) {
            System.out.println(err);
        }
        return count;
    }

}
