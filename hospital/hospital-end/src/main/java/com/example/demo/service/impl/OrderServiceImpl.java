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
}
