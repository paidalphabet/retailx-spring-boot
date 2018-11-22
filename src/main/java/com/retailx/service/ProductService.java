package com.retailx.service;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code39Writer;
import com.retailx.daos.ProductDao;
import com.retailx.models.Customer;
import com.retailx.models.Product;
import com.retailx.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ProductService extends AbstractService {


    Logger LOGGER = Logger.getLogger(ProductService.class.getName());

    @Autowired
    private ProductDao theProductDao;

    public String createBarCode(String barCodetext) throws WriterException, IOException {
        int width = 400;
        int height = 300; // change the height and width as per your requirement

// (ImageIO.getWriterFormatNames() returns a list of supported formats)
        String imageFormat = "png"; // could be "gif", "tiff", "jpeg"

        BitMatrix bitMatrix = new Code39Writer().encode(barCodetext, BarcodeFormat.CODE_39, width, height);

        File barCodeFile = new File("barcodes/" + barCodetext + "_qrc.png");
        MatrixToImageWriter.writeToStream(bitMatrix, imageFormat, new FileOutputStream(barCodeFile));
        return barCodeFile.getAbsolutePath();
    }

    public List<Product> getAllProducts(){
        return theProductDao.getAll();
    }

    public List<Product> getProductByName(String name) {
        LOGGER.info("Getting Products By : " + name);
        return theProductDao.getProductByName(name);

    }
}
