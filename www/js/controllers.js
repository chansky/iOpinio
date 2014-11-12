angular.module('directory.controllers', [])

    .controller('EmployeeIndexCtrl', function ($scope, EmployeeService) {

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllEmployees();
        }

        $scope.search = function () {
            EmployeeService.findByName($scope.searchKey).then(function (employees) {
                $scope.employees = employees;
            });
        }

        var findAllEmployees = function() {
            EmployeeService.findAll().then(function (employees) {
                $scope.employees = employees;
            });
        }

        findAllEmployees();

    })

    .controller('EmployeeDetailCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findById($stateParams.employeeId).then(function(employee) {
            $scope.employee = employee;
        });
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findByManager($stateParams.employeeId).then(function(employees) {
            $scope.employees = employees;
        });
    })

    .controller('homeCtrl', function ($scope, $location) {
        $scope.changeView = function(view){
            $location.path(view);
        }
    }) 

    .controller('registerPageCtrl', function($scope, $location){

    })

    .controller('loginPageCtrl', function($scope, $location){
        $scope.submitLogin = function(){
            console.log("username is: "+$scope.username);
            console.log("password is: "+ $scope.password);
        }
    });   
