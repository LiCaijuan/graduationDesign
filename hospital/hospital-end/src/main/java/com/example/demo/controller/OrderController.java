package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.entity.Response;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    OrderService orderService;

    @RequestMapping(value = "/addOrder", method = RequestMethod.POST)
    public Response addOrder(@RequestBody Order order) {
        String userCard = order.getUserCard();
        String orderDate = order.getOrderDate();
        String interval = order.getInterval();
        List<Order> orderList = orderService.getOrderByCondition(userCard, orderDate, interval);
        if (orderList != null && orderList.size() > 0) {
            Response response = new Response(false, "添加失败,该时段已有其他预约", -1);
            return response;
        } else {
            int count = orderService.addOrder(order);
            if (count > 0) {
                Response response = new Response(true, "添加成功", 1);
                return response;
            } else {
                Response response = new Response(false, "添加失败", -1);
                return response;
            }
        }
    }

    @RequestMapping(value = "/getOrderList", method = RequestMethod.POST)
    public Response getOrderList() {
        Response response = new Response();
        List<Order> productList = orderService.getOrderList();
        response.setResponse(true, "查询成功", 1, productList);
        return response;
    }

    @RequestMapping(value = "/getOrderByCondition", method = RequestMethod.POST)
    public Response getOrderByCondition(@RequestBody Order order) {
        String userCard = order.getUserCard();
        String orderDate = order.getOrderDate();
        String interval = order.getInterval();
        Response response = new Response();
        List<Order> orderList = orderService.getOrderByCondition(userCard, orderDate, interval);
        response.setResponse(true, "查询成功", 1, orderList);
        return response;
    }

    @RequestMapping(value = "/getOrderByUserId", method = RequestMethod.POST)
    public Response getOrderByUserId(@RequestBody Order order) {
        int userId = order.getUserId();
        Response response = new Response();
        List<Order> orderList = orderService.getOrderByUserId(userId);
        response.setResponse(true, "查询成功", 1, orderList);
        return response;
    }

    // 取消预约
    @RequestMapping(value = "/deleteOrder", method = RequestMethod.POST)
    public Response deleteOrder(@RequestBody Order order) {
        int orderId = order.getOrderId();
        if (orderId != 0){
            int count = orderService.deleteOrder(orderId);
            if (count > 0) {
                Response response = new Response(true, "删除成功",1);
                return response;
            } else {
                Response response = new Response(false, "删除失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "删除失败，请传入预约记录Id",-1);
            return response;
        }
    }
}
