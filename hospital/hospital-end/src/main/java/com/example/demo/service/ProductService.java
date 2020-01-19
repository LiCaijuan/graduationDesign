package com.example.demo.service;

import com.example.demo.entity.Product;

import java.util.List;

public interface ProductService {
    int addProduct(Product product);
    List<Product> getProductList();
    List<Product> getProductByKey(String productName);
    List<Product> getProductByCondition(String productName,int productType);
//    int updateProduct(Product product);
}
