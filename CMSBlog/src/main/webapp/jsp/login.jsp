<%-- 
    Document   : login
    Created on : Apr 3, 2018, 12:07:35 PM
    Author     : Matt
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>


<!DOCTYPE html>
<html>
    <head>
        <link href="${pageContext.request.contextPath}/css/bootstrap.min.css" rel="stylesheet"> 
        <link href="${pageContext.request.contextPath}/css/blogStyle.css" rel="stylesheet">
        <title>JSP Page</title>
    </head>
    <body>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br><br><br><br>
        <div class="col-sm-4">

        </div>
        <div  class="container col-md-4" id="Login" style="border: 1px solid black;">

            <form role="form" method="post" id="loginForm" class="form-horizontal" name="loginForm" action="j_spring_security_check">
                <div class="row">
                    <h1>Login</h1>
                </div>
                <div class="form-group">
                    <label class="col-sm-4" for="j_username" for="loginName">User Name:</label>
                    <input class="col-sm-8" type="text" name="j_username" class="form-control" id="loginName" placeholder="Enter Name"/>
                </div>
                <div class="form-group">
                    <label class="col-sm-4" for="j_password">Password:</label>
                    <input class="col-sm-8" type="password" name="j_password" id="password" class="form-control" placeholder="Enter password"/>
                    <c:if test="${param.login_error == 1}">
                        <h5 class="col-md-offset-2">Incorrect Id or password, please try again.</h5>
                    </c:if>
                </div>
                <div class="col-sm-4"></div>
                <button class="col-sm-2" offset="col-sm-10" class="btn btn-default" type="submit" class="btn btn-default">Login</button>
            </form>
        </div>
        <script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
        <script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
    </body>
</html>
