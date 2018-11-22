package com.retailx.daos;

import com.retailx.models.Product;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;


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

    public List<Product> getProductByName(String name) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> criteria = criteriaBuilder.createQuery(Product.class);
        Root<Product> productRoot = criteria.from(Product.class);
        criteria.select(productRoot);
        criteria.where(criteriaBuilder.like(productRoot.get("productName"), getLike(name)));
        List<Product> products = entityManager.createQuery(criteria). getResultList();
        return products;
    }
    private String getLike(String name) {
        return "%" + name +"%";
    }
}