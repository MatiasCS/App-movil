// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('sidemenu', {
    url: '/principal',
    templateUrl: "templates/side-bar.html"
  })

  .state('sidemenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: "CardCtrl"
        }
      }
    })

  .state('sidemenu.tabmenu',{
    url: "/board_view",
    views:{
      'menuContent':{
        templateUrl: "templates/tab-menu.html",
      }
    }
  })

  .state('sidemenu.tabmenu.backlog',{
    url: "/backlog",
    views:{
      'tabContent':{
        templateUrl: "templates/backlog.html",
        controller: "BLCtrl",
      }
    }
  })

  .state('sidemenu.tabmenu.progreso',{
    url: "/progreso",
    views:{
      'tabContent':{
        templateUrl: "templates/progreso.html",
        controller: "ProCtrl",
      }
    }
  })

  .state('sidemenu.tabmenu.listo',{
    url: "/listo",
    views:{
      'tabContent':{
        templateUrl: "templates/listo.html",
        controller: "LiCtrl",
      }
    }
  })

  .state('sidemenu.project',{
    url: "/project",
    views:{
      'menuContent':{
        templateUrl: "templates/boards.html",
        controller: "ProyCtrl",
      }
    }
  })

  $urlRouterProvider.otherwise("/principal/home");
})

.controller("ContentCtrl",function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.controller('CardCtrl',function($scope, $http){
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  //obtencion de todos los projectos en el sistema
  $http.get('https://bcinnovacion.atlassian.net/rest/api/2/project').
    success(function(data, status, headers, config) {
      $scope.projects = data;

      for(i=0; i<= $scope.projects.length; i++){
        var project = $scope.projects[i];
        var url = 'https://bcinnovacion.atlassian.net/rest/api/2/search?jql=project="'+project.key+'"%20and%20assignee%20in%20(currentUser())';
        $http.get(url).
          success(function(data, status, headers, config) {
            $scope.tasks = data.issues;
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });    
      };

      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    

  $scope.getClass = function(name){
    var clase;
    switch(name){
      case 'En progreso':
        clase = 'en-progreso';
        break;
      case 'Backlog':
        clase = 'backlog';
        break;

      case 'Listo':
        clase = 'listo';
        break;

      default:
        clase = '';
        break;
    }

    return clase;
  };
})

.controller('BLCtrl',function($scope, $http){
  $http.get('backlog.json').success(function(data) {
    $scope.tasks = data.issues;
  })

  $scope.getClass = function(name){
    var clase;
    switch(name){
      case 'En progreso':
        clase = 'en-progreso';
        break;
      case 'Backlog':
        clase = 'backlog';
        break;

      case 'Listo':
        clase = 'listo';
        break;

      default:
        clase = '';
        break;
    }

    return clase;
  };
})

.controller('LiCtrl',function($scope, $http){
  $http.get('listos.json').success(function(data) {
    $scope.tasks = data.issues;
  })

  $scope.getClass = function(name){
    var clase;
    switch(name){
      case 'En progreso':
        clase = 'en-progreso';
        break;
      case 'Backlog':
        clase = 'backlog';
        break;

      case 'Listo':
        clase = 'listo';
        break;

      default:
        clase = '';
        break;
    }

    return clase;
  };
})

.controller('ProCtrl',function($scope, $http){
  $http.get('enprogreso.json').success(function(data) {
    $scope.tasks = data.issues;
  })

  $scope.getClass = function(name){
    var clase;
    switch(name){
      case 'En progreso':
        clase = 'en-progreso';
        break;
      case 'Backlog':
        clase = 'backlog';
        break;

      case 'Listo':
        clase = 'listo';
        break;

      default:
        clase = '';
        break;
    }

    return clase;
  };
})

.controller('MainCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/new-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('NewICtrl',function($scope, $http){
  $scope.nuevo_issue = {proyecto: '', incidencia: '', resumen:'', prioridad : '', descripcion: '' };
  
  var a = '{"fields": {"project":{"key": "TEST"},"summary":'+ $scope.nuevo_issue.resumen+',"description":'+ $scope.nuevo_issue.descripcion+',"issuetype": {"name": "Bug"}   }}';
  console.log(a);
})

.run(function($ionicPlatform, $http) {
  $http.defaults.headers.common.Authorization = 'Basic bWF0aWFzLmNhbXBvczpRdWVzbzEyNA=='
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
