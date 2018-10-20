package com.retailx.controller;

import com.retailx.daos.ProductDao;
import com.retailx.entities.ProductList;
import com.retailx.models.Product;
import com.retailx.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/product")
public class ProductController {

  @Autowired
  private ProductService productService;

  @RequestMapping(value="/create" , method = RequestMethod.POST)
  @ResponseBody
  public Product create(@RequestBody final Product product) {
    System.out.println("Got here...");
    try {
      Product existingProduct = getProduct(product.getCode());
      if(existingProduct != null){
        mProductDao.update(product);
      }else {
        mProductDao.create(product);
        String barCode = productService.createBarCode(String.valueOf(product.getCode()));
        product.setBarCode(barCode);
        mProductDao.update(product);
      }
    }
    catch(final Exception ex) {
      ex.printStackTrace();
      return null;
    }
    return mProductDao.getById(product.getCode());
  }

  // READ

  @RequestMapping(value="/all" , method = RequestMethod.GET)
  @ResponseBody
  public ProductList getAll() {
    System.out.println("Got here...");
    try {
      return new ProductList(mProductDao.getAll());
    }
    catch(final Exception ex) {
      ex.printStackTrace();
      return null;
    }
  }

  @RequestMapping(value="/", method = RequestMethod.GET)
  @ResponseBody
  public Product getProduct(@RequestParam(name="code") final long code) {
    try {
      return mProductDao.getById(code);
    }
    catch(Exception ex) {
      ex.printStackTrace();
      return null;
    }
  }

  //UPDATE

  @RequestMapping(value="/update" , method = RequestMethod.PUT)
  @ResponseBody
  public Boolean update(
      final Product product
  ) {
    System.out.println("Got here...");
    try {
      mProductDao.update(product);
    }
    catch(final Exception ex) {
      ex.printStackTrace();
      return false;
    }
    return true;
  }

  // DELETE

  @RequestMapping(value="/delete", method = RequestMethod.GET)
  @ResponseBody
  public Boolean delete(@RequestParam(name="code")final long code) {
    try {
      Product product = new Product(code);
      mProductDao.delete(product);
    }
    catch(Exception ex) {
      ex.printStackTrace();
      return false;
    }
    return true;
  }


  // Private fields
  @Autowired
  private ProductDao mProductDao;
}
