<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		 <%@ include file="imports.jsp" %>
	</head>
	<body ng-app="retailx" id ="page-top">
			<%@ include file="common/header.jsp" %>
		<div id="wrapper">
			 <%@ include file="common/sidebar.jsp" %>
             <div id="content-wrapper">
                 <div class="container-fluid">
                    <div ng-view>
                    </div>
                 </div>
             </div>
			<%@ include file="common/footer.jsp" %>
		</div>
	</body>
</html>


