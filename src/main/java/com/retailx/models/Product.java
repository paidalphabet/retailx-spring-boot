package com.retailx.models;

import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;
import com.retailx.common.BaseObject;

import javax.persistence.*;

/**
 * Created by Shittu on 29/05/2016.
 */
@Entity
@Table(name = "products")
public class Product extends BaseObject {
    @Id
    @GeneratedValue
    private long code;

    @Column(name = "name")
    private String productName;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "quantity")
    private Double quantity;
    @Column(name = "costPrice")
    private Double costPrice;
    @Column(name = "barcode")
    private String barCode;
    @Column(name = "hotlist")
    private Boolean hotlist;

    public String getScale() {
        return this.scale;
    }

    public void setScale(String scale) {
        this.scale = scale;
    }

    @Column(name="scale")
    private String scale;

    public Product(long code, String productName, String description, Double price, Double quantity, Double costPrice, String barCode, Boolean hotlist, String scale) {
        this.code = code;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.costPrice = costPrice;
        this.barCode = barCode;
        this.hotlist = hotlist;
        this.scale = scale;
    }

    public Product() {
    }

    public Product(final long code) {
        this.code = code;
    }

    public Product(final long code, final String description, final Double price, final Double quantity) {
        this.code = code;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public Double getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Double costPrice) {
        this.costPrice = costPrice;
    }

    public Boolean getHotlist() {
        return hotlist;
    }

    public void setHotlist(Boolean hotlist) {
        this.hotlist = hotlist;
    }

    public long getCode() {
        return code;
    }

    public void setCode(final long code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(final Double price) {
        this.price = price;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(final Double quantity) {
        this.quantity = quantity;
    }


    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }


    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Product product = (Product) o;
        return Objects.equal(code, product.code) &&
                Objects.equal(description, product.description) &&
                Objects.equal(price, product.price) &&
                Objects.equal(quantity, product.quantity);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(code, description, price, quantity);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("code", code)
                .add("description", description)
                .add("price", price)
                .add("quantity", quantity)
                .toString();
    }
}
