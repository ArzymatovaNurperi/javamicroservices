
var app = angular.module('client', [])

.controller('Employees', function($scope, $http) {
	$scope.urlService = "http://localhost:8080/employees";
	$scope.showListEmployes = true;
	$scope.showPhoto = false;
	$scope.photo = false;
	$scope.showDivs = function(employeeList) {
		if (employeeList) {
			$scope.showNewForm = false;
			$scope.showListEmployes = true;
		} else {
			$scope.formTitle = "Add New Employee"
			$scope.id = "";
			$scope.firstName = "";
			$scope.lastName = "";
			$scope.birthDate = "";
			$scope.phone = "";
			$scope.email = "";
			$scope.title = "";
			$scope.dept = "";
			$scope.showPhoto = false;
			angular.element(document.getElementById("pic")).val(null);
			$scope.showNewForm = true;
			$scope.showListEmployes = false;
		}
	}

	$scope.reset = function(form) {
        if (form) {
          form.$setPristine();
          form.$setUntouched();
        }
    };

	$scope.getEmployees = function(){
		$http.get($scope.urlService).
			then(function(response) {
				$scope.employees = response.data;
			});
		$scope.searchText = "";
	}

	$scope.getEmployeeById = function(id){
		$http.get($scope.urlService+"/"+id).
			then(function(response) {
				$scope.employee = response.data;
				$scope.showDetail();
			});
		$scope.searchText = "";
	}

	$scope.submitEmployee = function() {
		var addEmployee={
				  id:$scope.id,
                  firstName:$scope.firstName,
                  lastName:$scope.lastName,
                  email:$scope.email,
                  phone:$scope.phone,
                  birthDate:$scope.birthDate,
                  title:$scope.title,
                  dept:$scope.dept
                };

		var res;

		if ($scope.id == "") {
			res = $http.post($scope.urlService, JSON.stringify(addEmployee), {
				headers: { 'Content-Type': 'application/json'}
				});
		} else {
			res = $http.put($scope.urlService+"/"+$scope.id, JSON.stringify(addEmployee), {
				headers: { 'Content-Type': 'application/json'}});
		}
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			$scope.getEmployees();
			$scope.showDivs(true);

		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	}

	$scope.deleteEmployee = function() {
		res = $http.delete($scope.urlService+"/"+$scope.id);
		res.success(function(data, status, headers, config) {
			$scope.getEmployees();
			$scope.showDivs(true);

		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	}

	$scope.searchEmployees = function() {
		$http.get($scope.urlService+"/"+$scope.searchType+"/"+$scope.searchText).
			then(function(response) {
				$scope.employees = response.data;
			});
	}

	$scope.showDetail = function() {
		$scope.showDivs(false);
		$scope.showPhoto = true;
		$scope.formTitle = "Update Employee"
		$scope.id = $scope.employee.id;
		$scope.photo = $scope.employee.photo;
		$scope.firstName = $scope.employee.firstName;
		$scope.lastName = $scope.employee.lastName;
		$scope.birthDate = $scope.employee.birthDate;
		$scope.phone = $scope.employee.phone;
		$scope.email = $scope.employee.email;
		$scope.title = $scope.employee.title;
		$scope.dept = $scope.employee.dept;
	}

});
