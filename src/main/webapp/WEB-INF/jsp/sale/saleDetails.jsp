<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<html xmlns:form="http://www.w3.org/1999/html">
<head>
    <%@ include file="../imports.jsp" %>
</head>
<body ng-app="retailx" id ="page-top">
<%@ include file="../common/header.jsp" %>
<div id="wrapper">
    <%@ include file="../common/sidebar.jsp" %>
    <div id="content-wrapper">
        <div class="container-fluid">
            <div>

                <div ng-controller="sale">
                    <div class="row">
                        <div class="col-lg-12">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <form:select path="salesorder.customerID" items="${customers}">

                                                </form:select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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





