package com.retailx.service;

import com.retailx.daos.CustomerDao;
import com.retailx.models.Customer;
import com.retailx.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class CustomerService extends AbstractService {

    Logger LOGGER = Logger.getLogger(CustomerService.class.getName());

    @Autowired
    private CustomerDao customerdao;

    public List<Customer> getCustomers(){
        LOGGER.info("Get All Customers");
        return customerdao.getAll();
    }

    public List<Customer> getCustomerByName(String name){
        LOGGER.info("Getting Customers By : " + name);
        return customerdao.getCustomerByName(name);
    }
}
