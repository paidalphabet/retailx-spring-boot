package com.retailx.daos;

import java.util.List;

import com.retailx.models.Customer;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 * Created by Shittu on 29/05/2016.
 */
@Repository
@Transactional
public class CustomerDao extends BaseDao<Customer> {

  private static final String ENTITY = "Customer";
  public List<Customer> getAll(){
    return super.getAll(ENTITY);
  }

  public Customer getById(final long code){
    return super.getById(Customer.class, code);
  }
}
