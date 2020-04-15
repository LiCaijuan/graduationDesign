package com.example.demo.mapper;

import com.example.demo.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrderMapper {
    int addOrder(Order order);
    List<Order> getOrderList();
    List<Order> getOrderByCondition(@Param("userCard") String orderCard, @Param("orderDate") String orderDate, @Param("interval") String interval);
}
