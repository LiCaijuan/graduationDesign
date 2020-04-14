package com.example.demo.mapper;

import com.example.demo.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProductMapper {
    int addProduct(Product product);

    List<Product> getProductList();

    List<Product> getProductByKey(String productName);

    List<Product> getProductByCondition(String productName, int productType);

    int updateProduct(@Param("pro") Product product);

    int deleteProduct(int productId);
}
