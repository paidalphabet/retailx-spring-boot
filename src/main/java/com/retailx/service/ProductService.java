package com.retailx.service;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code39Writer;
import com.retailx.service.common.AbstractService;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class ProductService extends AbstractService {

    public String createBarCode(String barCodetext) throws WriterException, IOException {
        int width = 400;
        int height = 300; // change the height and width as per your requirement

// (ImageIO.getWriterFormatNames() returns a list of supported formats)
        String imageFormat = "png"; // could be "gif", "tiff", "jpeg"

        BitMatrix bitMatrix = new Code39Writer().encode(barCodetext, BarcodeFormat.CODE_39, width, height);
        File barCodeFile = new File(barCodetext+"_qrc.png");
        MatrixToImageWriter.writeToStream(bitMatrix, imageFormat, new FileOutputStream(barCodeFile));
        return barCodeFile.getAbsolutePath();
    }
}
