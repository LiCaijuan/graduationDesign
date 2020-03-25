package com.example.demo.mapper;

import com.example.demo.entity.Order;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderMapper {
    int addOrder(Order order);
    List<Order> getOrderList();
}
