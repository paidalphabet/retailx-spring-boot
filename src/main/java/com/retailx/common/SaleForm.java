package com.retailx.common;

import com.retailx.models.OrderLine;

import java.util.List;

public class SaleForm {

    private int customerID;
    private int salesID;
    private String referenceNote;
    private List<OrderLine> orderLine;
    private String customerName;
    private String customerCredit;

    public int getCustomerID() {
        return this.customerID;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }

    public int getSalesID() {
        return this.salesID;
    }

    public void setSalesID(int salesID) {
        this.salesID = salesID;
    }

    public String getReferenceNote() {
        return this.referenceNote;
    }

    public void setReferenceNote(String referenceNote) {
        this.referenceNote = referenceNote;
    }

    public List<OrderLine> getOrderLine() {
        return this.orderLine;
    }

    public void setOrderLine(List<OrderLine> orderLine) {
        this.orderLine = orderLine;
    }

    public String getCustomerName() {
        return this.customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCredit() {
        return this.customerCredit;
    }

    public void setCustomerCredit(String customerCredit) {
        this.customerCredit = customerCredit;
    }

}
