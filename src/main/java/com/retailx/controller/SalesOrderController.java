package com.retailx.controller;

import java.util.List;
import java.util.Map;

import com.retailx.common.SaleForm;
import com.retailx.daos.CustomerDao;
import com.retailx.daos.OrderLineDao;
import com.retailx.daos.ProductDao;
import com.retailx.daos.SalesOrderDao;
import com.retailx.entities.SalesOrderEntity;
import com.retailx.entities.SalesOrderList;
import com.retailx.models.Customer;
import com.retailx.models.OrderLine;
import com.retailx.models.Product;
import com.retailx.models.SalesOrder;
import com.retailx.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value = "/sale")
public class SalesOrderController {

    // Private fields
    @Autowired
    private SalesOrderDao mSalesOrderDao;

    @Autowired
    private CustomerService customerService;

    // READ
    @Autowired
    private ProductDao mProductDao;
    @Autowired
    private CustomerDao mCustomerDao;

    //UPDATE
    @Autowired
    private OrderLineDao mOrderLineDao;

    // DELETE

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public SalesOrderEntity create(
            @RequestBody final SalesOrderEntity salesOrderEntity
    ) {
        try {
            SalesOrderEntity salesOrder = mSalesOrderDao.getById(salesOrderEntity.getOrderNumber());
            if (salesOrder == null) {
                // do sales order checks before creating
                boolean creditCheck = validateCreditBalance(salesOrderEntity);
                boolean productCheck = validateProductQuantity(salesOrderEntity);

                // if valid sales make adjustment to affected balances
                if (creditCheck && productCheck) {
                    mSalesOrderDao.create(new SalesOrder(
                            salesOrderEntity.getOrderNumber(),
                            String.format(
                                    "(%s) %s",
                                    salesOrderEntity.getCustomer().get("id"),
                                    salesOrderEntity.getCustomer().get("name")
                            ),
                            salesOrderEntity.getTotalPrice())
                    );

                    for (Map<String, Object> productObject : salesOrderEntity.getProducts()) {

                        mOrderLineDao.create(new OrderLine(
                                salesOrderEntity.getOrderNumber(),
                                Long.parseLong((String) productObject.get("id")),
                                (Double) productObject.get("price"),
                                (Double) productObject.get("quantity")
                        ));
                    }

                    updateCustomerCreditBalance(salesOrderEntity);
                    updateProductQuantity(salesOrderEntity);
                } else {
                    return null;
                }
            } else {
                mSalesOrderDao.update(new SalesOrder(
                        salesOrderEntity.getOrderNumber(),
                        String.format(
                                "(%s) %s",
                                salesOrderEntity.getCustomer().get("id"),
                                salesOrderEntity.getCustomer().get("name")
                        ),
                        salesOrderEntity.getTotalPrice())
                );

                for (Map<String, Object> productObject : salesOrderEntity.getProducts()) {

                    mOrderLineDao.create(new OrderLine(
                            salesOrderEntity.getOrderNumber(),
                            Long.parseLong((String) productObject.get("id")),
                            (Double) productObject.get("price"),
                            (Double) productObject.get("quantity")
                    ));
                }
                setCustomerCreditBalance(salesOrderEntity, salesOrderEntity.getTotalPrice() - salesOrder.getTotalPrice());
                updateProductQuantity(salesOrderEntity);
            }

        } catch (final Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return mSalesOrderDao.getById(salesOrderEntity.getOrderNumber());
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ResponseBody
    public SalesOrderList getAll() {
        try {
            return new SalesOrderList(mSalesOrderDao.getAll());
        } catch (final Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public SalesOrderEntity getSalesOrder(@RequestParam(name = "salescode") final long salesCode) {
        try {
            return mSalesOrderDao.getById(salesCode);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public Boolean update(
            final SalesOrder salesOrder
    ) {
        try {
            mSalesOrderDao.update(salesOrder);
        } catch (final Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public Boolean delete(@RequestParam(name = "ordernumber") final long orderNumber) {
        try {
            List<OrderLine> orderLines = mOrderLineDao.getBySalesCode(orderNumber);
            orderLines.stream().forEach(orderLine -> mOrderLineDao.delete(orderLine));

            SalesOrder salesOrder = new SalesOrder(orderNumber);
            mSalesOrderDao.delete(salesOrder);
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }


    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public ModelAndView viewSaleDetails(HttpServletRequest request, HttpServletResponse response) {
        String requestMode = request.getParameter("mode");
        String model = "sale/saleDetails";
        ModelMap modelMap = new ModelMap();
        List<Customer> customers = customerService.getCustomers();
        System.out.println("Customers :: " + customers);
        modelMap.addAttribute("customers", customers);
        modelMap.addAttribute("salesorder", new SaleForm());
        return new ModelAndView(model, modelMap);
    }


    private boolean validateProductQuantity(final SalesOrderEntity salesOrderEntity) {
        for (Map<String, Object> productObject : salesOrderEntity.getProducts()) {
            Double quantityAvailable = mProductDao.getById(Long.parseLong((String) productObject.get("id"))).getQuantity();
            Double quantityOrdered = (Double) productObject.get("quantity");
            if (quantityAvailable <= quantityOrdered) {
                return false;
            }
        }
        return true;
    }

    private boolean validateCreditBalance(final SalesOrderEntity salesOrderEntity) {
        Customer customer = mCustomerDao.getById(Long.parseLong((String) salesOrderEntity.getCustomer().get("id")));
        return salesOrderEntity.getTotalPrice() <= customer.getCreditLimit() - customer.getCurrentCredit();
    }

    private void updateCustomerCreditBalance(final SalesOrderEntity salesOrderEntity) {
        Customer customer = mCustomerDao.getById(Long.parseLong((String) salesOrderEntity.getCustomer().get("id")));
        customer.setCurrentCredit(customer.getCurrentCredit() + salesOrderEntity.getTotalPrice());
        mCustomerDao.update(customer);
    }

    private void updateProductQuantity(final SalesOrderEntity salesOrderEntity) {
        for (Map<String, Object> productObject : salesOrderEntity.getProducts()) {
            Product product = mProductDao.getById(Long.parseLong((String) productObject.get("id")));
            product.setQuantity(product.getQuantity() - (Double) productObject.get("quantity"));
            mProductDao.update(product);
        }
    }

    private void setCustomerCreditBalance(final SalesOrderEntity salesOrderEntity, final Double additionalCredit) {
        Customer customer = mCustomerDao.getById(Long.parseLong((String) salesOrderEntity.getCustomer().get("id")));
        customer.setCurrentCredit(customer.getCurrentCredit() + additionalCredit);
        mCustomerDao.update(customer);
    }
}
