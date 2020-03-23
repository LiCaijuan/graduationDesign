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
import java.util.Map;

@RestController
public class ProductController {
    @Autowired
    ProductService productService;

    @RequestMapping(value = "/addProduct", method = RequestMethod.POST)
    public Response addProduct(@RequestBody Product product) {
        Response result;
        if (product.getProductName() != null && product.getProductPrice() != 0 && product.getProductType() != 0 && product.getProductImg() != null && product.getProductDes() != null) {
            int count = productService.addProduct(product);
            if (count > 0) {
                Response response = new Response(true, "添加成功", 1);
                result = response;
            } else {
                Response response = new Response(false, "添加失败", -1);
                result = response;
            }
        } else {
            Response response = new Response(false, "有参数为空", -1);
            result = response;
        }
        return result;
    }

    @RequestMapping(value = "/getProductList", method = RequestMethod.POST)
    public Response getProductList() {
        Response response = new Response();
        List<Product> productList = productService.getProductList();
        response.setResponse(true, "查询成功", 1, productList);
        return response;
    }

    @RequestMapping(value = "/getProductByKey", method = RequestMethod.POST)
    public Response getProductByKey(@RequestBody Map<String, String> product) {
        String productName = product.get("productName");
        String productDes = product.get("productDes");
        if (productDes != null) {
            productName = productDes;
        }
        Response response = new Response();
        List<Product> productList = productService.getProductByKey(productName);
        response.setResponse(true, "查询成功", 1, productList);
        return response;
    }

    @RequestMapping(value = "/getProductByCondition", method = RequestMethod.POST)
    public Response getProductByCondition(@RequestBody Product product) {
        String productName = product.getProductName();
        int productType = product.getProductType();
        Response response = new Response();
        List<Product> productList = productService.getProductByCondition(productName, productType);
        response.setResponse(true, "查询成功", 1, productList);
        return response;
    }

    @RequestMapping(value = "/updateProduct", method = RequestMethod.POST)
    public Response updateProduct(@RequestBody Product product) {
        int productId = product.getProductId();
        int count = productService.updateProduct(product);
        if (productId != 0) {
            if (count > 0) {
                Response response = new Response(true, "更新成功", 1);
                return response;
            } else {
                Response response = new Response(false, "更新失败", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "请传入商品Id", -1);
            return response;
        }
    }

    @RequestMapping(value = "/deleteProduct", method = RequestMethod.POST)
    public Response deleteProduct(@RequestBody Product product) {
        int productId = product.getProductId();
        if (productId > 0) {
            int count = productService.deleteProduct(productId);
            if (count > 0) {
                Response response = new Response(true, "删除成功", 1);
                return response;
            } else {
                Response response = new Response(false, "删除失败，请检查原因", -1);
                return response;
            }
        } else {
            Response response = new Response(false, "请传入商品Id", -1);
            return response;
        }

    }
}
