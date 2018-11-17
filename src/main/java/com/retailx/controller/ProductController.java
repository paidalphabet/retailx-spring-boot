package com.retailx.controller;

import com.retailx.daos.ProductDao;
import com.retailx.entities.ProductList;
import com.retailx.models.Product;
import com.retailx.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping(value = "/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    // Private fields
    @Autowired
    private ProductDao mProductDao;

    // READ

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public Product create(@RequestBody final Product product) {
        System.out.println("Got here...");
        try {
            Product existingProduct = getProduct(product.getCode());
            if (existingProduct != null) {
                mProductDao.update(product);
            } else {
                mProductDao.create(product);
                String barCode = productService.createBarCode(String.valueOf(product.getCode()));
                product.setBarCode(barCode);
                mProductDao.update(product);
            }
        } catch (final Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return mProductDao.getById(product.getCode());
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ResponseBody
    public List<Product> getAll() {
        try {
            return productService.getAllProducts();
        } catch (final Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    //UPDATE

    @RequestMapping(value = "/{code}", method = RequestMethod.GET)
    @ResponseBody
    public Product getProduct(@PathVariable(name = "code") long code) {
        try {
            return mProductDao.getById(code);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    // DELETE

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public Product update(final Product product) {
        System.out.println("Got here...");
        try {
            mProductDao.update(product);
        } catch (final Exception ex) {
            ex.printStackTrace();
            return product;
        }
        return product;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public Boolean delete(@RequestParam(name = "code") final long code) {
        try {
            Product product = new Product(code);
            mProductDao.delete(product);
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    @RequestMapping(value="/view" , method=RequestMethod.GET)
    public ModelAndView viewProductDetails(HttpServletRequest request, HttpServletResponse response){
        String requestMode = request.getParameter("mode");
        String model="product/productDetails";
        ModelMap modelMap = new ModelMap();
        return new ModelAndView(model, "command", new Product());
    }
}
