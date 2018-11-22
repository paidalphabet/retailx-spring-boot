package com.retailx.daos;

import java.util.List;

import com.retailx.models.Customer;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;


/**
 * Created by Shittu on 29/05/2016.
 */
@Repository
@Transactional
public class CustomerDao extends BaseDao<Customer> {

    private static final String ENTITY = "Customer";

    public List<Customer> getAll() {
        return super.getAll(ENTITY);
    }

    public Customer getById(final long code) {
        return super.getById(Customer.class, code);
    }

    public List<Customer> getCustomerByName(String name) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Customer> criteria = criteriaBuilder.createQuery(Customer.class);
        Root<Customer> customerRoot = criteria.from(Customer.class);
        criteria.select(customerRoot);
        criteria.where(criteriaBuilder.like(customerRoot.get("name"), getLike(name)));
        List<Customer> customers = entityManager.createQuery(criteria). getResultList();
        return customers;
    }

    private String getLike(String name) {
        return "%" + name +"%";
    }
}
