package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.Response;
import com.example.demo.service.OrderService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {
    OrderService orderService;

    @RequestMapping(value = "/addOrder", method = RequestMethod.POST)
    public Response addOrder(@RequestBody Order order) {
        Response result;
        int count = orderService.addOrder(order);
        if (count > 0) {
            Response response = new Response(true, "添加成功", 1);
            result = response;
        } else {
            Response response = new Response(false, "添加失败", -1);
            result = response;
        }
        return result;
    }

    @RequestMapping(value = "/getOrderList", method = RequestMethod.POST)
    public Response getOrderList() {
        Response response = new Response();
        List<Order> productList = orderService.getOrderList();
        response.setResponse(true, "查询成功", 1, productList);
        return response;
    }
}
