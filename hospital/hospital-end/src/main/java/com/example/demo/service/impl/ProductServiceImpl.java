package com.example.demo.service.impl;
import com.example.demo.entity.Product;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductMapper productMapper;

    public int addProduct(Product product){
        int count = productMapper.addProduct(product);
        return count;
    }
    public List<Product> getProductList(){
        List<Product> proList = productMapper.getProductList();
        return proList;
    }
}
