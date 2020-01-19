package com.example.demo.mapper;

import com.example.demo.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductMapper {
    int addProduct(Product product);
    List<Product> getProductList();
}
