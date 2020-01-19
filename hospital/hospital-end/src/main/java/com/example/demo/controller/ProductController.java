package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.entity.Response;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductService productService;
    @RequestMapping(value = "/addProduct",method = RequestMethod.POST)
    public Response addProduct(@RequestBody Product product){
        if(product.getProductName() != null && product.getProductPrice() != 0 && product.getProductType() != 0 && product.getProductImg() != null && product.getProductDes() != null){
            int count = productService.addProduct(product);
            if (count>0){
                Response response = new Response(true,"添加成功",1);
                return response;
            }else {
                Response response = new Response(false,"添加失败",-1);
                return response;
            }
        }else {
            Response response = new Response(false,"有参数为空",-1);
            return response;
        }
    }

    @RequestMapping(value = "/getProductList", method = RequestMethod.POST)
    public Response getProductList(){
        Response response = new Response();
        List<Product> productList = productService.getProductList();
        response.setResponse(true,"查询成功",1,productList);
        return response;
    }
}
