<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<title>Data Management System</title> 
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initialscale=1.0"/> 
	<link href="css/bootstrap.min.css" rel="stylesheet" />  
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>

	<link rel="stylesheet" href="style.css">
</head> 

<body ng-app="DMS" ng-controller="MainController">
	<header>
		<nav class="navbar navbar-inverse">
			<div class="container-fluid nav_container">
				<div class="navbar-header">
					<a class="navbar-brand img_brand" href="http://satoyamafarm.com.my/" target="_blank"></a>
				</div>

				<ul class="nav navbar-nav my_nav">
					<li class="active"><a href="index.php">Home</li></a></li>
					<li><a href="sensors.php">Sensors</a></li>
					<li><a href="dataVisualization.php">Data Visualization</a></li>
				</ul>

				<ul class="nav navbar-nav navbar-right my_nav">
					<li class="logout_btn"><a href="login.php">Logout</a></li>
				</ul>
			</div>
		</nav>
	</header>

	<div class="container">
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>Temperature</th>
						<th>Moisture</th>
						<th>pH value</th>
						<th>Humidity</th>
					</tr>
				</thead>
	
				<tbody>
					<tr data-ng-repeat="unit in unitList">
						<td>{{unit.temp}}</td>
						<td>{{unit.moist}}</td>
						<td>{{unit.phvalue}}</td>
						<td>{{unit.humidity}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	
	</div>

    <script src="js/jquery.min.js"></script> 
	<script src="js/bootstrap.min.js"></script> 
	<script>
		var app = angular.module("DMS", []);

		app.controller("MainController", function($scope){
			$scope.unitList = [ 
			{
				temp : 12,
				moist : 11,
				phvalue : "tong",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "is",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}, 
			{
				temp : 12,
				moist : 11,
				phvalue : "noob",
				humidity: 13
			}
			]
		});
	</script>
</body> 
</html>