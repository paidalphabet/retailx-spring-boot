<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<html>
<head>
    <%@ include file="../imports.jsp" %>
</head>
<body ng-app="retailx" id="page-top">
<%@ include file="../common/header.jsp" %>
<div id="wrapper">
    <%@ include file="../common/sidebar.jsp" %>
    <div id="content-wrapper">
        <div class="container-fluid">
            <div>
                <div>
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">Product Details</h1>
                        </div>
                        <!-- /.col-lg-12 -->
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <form:form role="form">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-lg-6">

                                                <div class="form-group">
                                                    <label>Code</label>
                                                    <form:input class="form-control" path="code" disabled="disabled"
                                                                id="code"
                                                                name="code"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>Name</label>
                                                    <form:input class="form-control" path="productName"
                                                                name="productName"
                                                                id="productName"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>Description</label>
                                                    <form:textarea class="form-control" path="description"
                                                                   name="description" id="description"/>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label>Price</label>
                                                    <form:input class="form-control" path="price" id="price"
                                                                name="price"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>costPrice</label>
                                                    <form:input class="form-control" path="costPrice" id="costPrice"
                                                                name="costPrice"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>HotList</label>
                                                    <form:checkbox path="hotlist" class="" name="hotlist" id="hotlist"/>
                                                </div>

                                            </div>
                                            <div class="col-md-3">
                                                <button class="btn btn-success" ng-click="saveProduct()">Save</button>
                                                <button class="btn btn-success">Clear</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form:form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%@ include file="../common/footer.jsp" %>
</div>
</body>
</html>




