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

    @Override
    public List<Product> getProductByKey(String productName) {
        List<Product> proList1 = productMapper.getProductByKey(productName);
        return proList1;
    }

    @Override
    public List<Product> getProductByCondition(String productName, int productType) {
        List<Product> proList2 = productMapper.getProductByCondition(productName,productType);
        return proList2;
    }

//    @Override
//    public int updateProduct(Product product) {
//        int count = 0;
//        try{
//            count = productMapper.updateProduct(product);
//        } catch (Exception err) {
//            System.out.println(err);
//        }
//        return count;
//    }

}
