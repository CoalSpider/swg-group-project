<%-- 
    Document   : login
    Created on : Apr 3, 2018, 12:07:35 PM
    Author     : Matt
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <link href="${pageContext.request.contextPath}/css/bootstrap.min.css" rel="stylesheet"> 
        <link href="${pageContext.request.contextPath}/css/blogStyle.css" rel="stylesheet">
        <title>JSP Page</title>
    </head>
    <body>
        <div  class="container" id="Login">

            <form role="form" method="post" id="loginForm" name="loginForm" action="j_spring_security_check">
                <div class="row">
                    <h1>Login</h1>
                </div>
                <div class="form-group">
                    <label class="col-sm-2" for="j_username" for="loginName">User Name:</label>
                    <input class="col-sm-10" type="text" name="j_username" class="form-control" id="loginName" placeholder="Enter Name"/>
                </div>
                <div class="form-group">
                    <label class="col-sm-2" for="j_password">Password:</label>
                    <input class="col-sm-10" type="password" name="j_password" id="password" class="form-control" placeholder="Enter password"/>
                </div>
                <button class="col-sm-2" offset="col-sm-10" class="btn btn-default" type="submit" class="btn btn-default">Login</button>
            </form>
        </div>
        <script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
        <script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
    </body>
</html>
