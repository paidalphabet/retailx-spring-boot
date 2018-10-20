package com.retailx.controller.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class AngularRequestController extends BaseController {

    private final static Logger LOGGER = LoggerFactory.getLogger(AngularRequestController.class);

    private final static String THREAD_POOL_EXECUTOR = "taskExecutor";

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView welcome(ModelMap model, final HttpServletRequest request) throws RetailxException {
        String nextPage = "welcome";
        return new ModelAndView(nextPage);
    }

    @RequestMapping(value = "/pages/jsp/{common}/{trailing}", method = RequestMethod.GET)
    public ModelAndView pages(@PathVariable final String common, @PathVariable final String trailing, final ModelMap model, final HttpServletRequest request) throws RetailxException {
        final String view = common + "/" + trailing;
        return new ModelAndView(view);
    }
}
