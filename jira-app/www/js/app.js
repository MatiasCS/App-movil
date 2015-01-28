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

  .state('sidemenu.boards',{
    url: "/boards",
    views:{
      'menuContent':{
        templateUrl: "templates/tab-menu.html",
      }
    }
  })

  .state('sidemenu.boards.backlog',{
    url: "/backlog",
    views:{
      'tabContent':{
        templateUrl: "templates/backlog.html",
        controller: "BLCtrl",
        activetab: "progreso"
      }
    }
  })

  .state('sidemenu.boards.progreso',{
    url: "/progreso",
    views:{
      'tabContent':{
        templateUrl: "templates/progreso.html",
        controller: "ProCtrl",
        activetab: "progreso"
      }
    }
  })

  .state('sidemenu.boards.listo',{
    url: "/listo",
    views:{
      'tabContent':{
        templateUrl: "templates/listo.html",
        controller: "LiCtrl",
        activetab: "listo"
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
  $http.get('issues.json').success(function(data) {
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
  $http.get('issues.json').success(function(data) {
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

.run(function($ionicPlatform) {
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
