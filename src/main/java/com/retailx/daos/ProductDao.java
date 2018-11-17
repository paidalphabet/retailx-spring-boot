package com.retailx.daos;

import java.util.List;

import com.retailx.models.Product;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
@Transactional
public class ProductDao extends BaseDao<Product> {

    private static final String ENTITY = "Product";

    public List<Product> getAll() {
        return super.getAll(ENTITY);
    }

    public Product getById(final long code) {
        return super.getById(Product.class, code);
    }
}