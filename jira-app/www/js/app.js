// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // para verificar si es NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

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

.controller('CardCtrl',function($scope, $http, $rootScope){
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
  var url = 'https://bcinnovacion.atlassian.net/rest/api/2/search?jql=assignee%20in%20(currentUser())';        
  $http.get(url).
    success(function(data, status, headers, config) {
      $scope.tasks = data.issues;
      $scope.projects = [];
      for (i = 0; i < $scope.tasks.length; i++){
        var nombre = $scope.tasks[i].fields.project.name
        if($scope.projects.indexOf(nombre)){
          $scope.projects.push(nombre);
        }
      }
      /*
      if($scope.tasks.length){
        console.log(nombre);
        $scope.projects.push(proyectos[i]);
      }
    // this callback will be called asynchronously
    // when the response is available*/
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

.controller('NewICtrl',function($scope, $http, $ionicPopup){
  $scope.nuevo_issue = {proyecto: '', tipo: '', resumen:'', informador : '', descripcion:'' };

  url_get_projects = 'https://bcinnovacion.atlassian.net/rest/api/2/project';
  url_get_types = 'https://bcinnovacion.atlassian.net/rest/api/2/issuetype';

  $http.get(url_get_projects).success(function(data){
    $scope.projects = data;
  });

  $http.get(url_get_types).success(function(data) {
    $scope.types = data;
  });

  $http.get(url_get_types).success(function(data) {
    $scope.types = data;
  });

  url_get_reporters = 'https://bcinnovacion.atlassian.net/rest/api/2/user/assignable/search?project=IAC';
  
   $http.get(url_get_reporters).success(function(data) {
    $scope.reporters = data;
  });

  $scope.addIssue = function(){
      var datos = {
              "fields": {
                 "project":
                 {
                    "id": $scope.nuevo_issue.proyecto.id 
                 },
                 "summary": $scope.nuevo_issue.resumen,
                 "description": $scope.nuevo_issue.descripcion,
                 "reporter":{"name":$scope.nuevo_issue.informador.name},
                 "issuetype": {
                    "name": $scope.nuevo_issue.tipo.name
                 }
             }
          };

      console.log(datos);
      var url_nuevo_issue = 'https://bcinnovacion.atlassian.net/rest/api/2/issue'
      $http.post(url_nuevo_issue, datos).
      success(function(data, status, headers, config) {
        //Ventana de alerta personalizar
        var alertPopup = $ionicPopup.alert({
          title: 'EXITO',
          template: 'Incidencia creada con exito!'
        });
      }).
      error(function(data, status, headers, config) {
        console.log(data)
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      })

  };
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
