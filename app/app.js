var myApp = angular.module('myApp',['ui.router']);

myApp.config (['$stateProvider' , '$urlRouterProvider' , function ($stateProvider ,$urlRouterProvider){
  $stateProvider
  .state('home' , {
    url : '/',
    templateUrl : '/index.html'
  })
  .state('tableaux' ,{
    url :'/tableaux',
    templateUrl : '/view/saisie/viaTableaux/index.html'
    //controller : ''
  })
  .state('tableaux.chargesFixes', {
    url : '/chargesFixes',
    templateUrl : '/view/saisie/viaTableaux/chargesFixes/saisieFixes.html'
    //controller : 'chargesFixesCtrl'
  })
  .state('tableaux.chargesConduite', {
    url : '/chargesConduite',
    templateUrl : '/view/saisie/viaTableaux/chargesConduite/saisieConduite.html'
    //controller : ''
  })
  .state('tableaux.chargesVariables', {
    url : '/chargesVariables',
    templateUrl : '/view/saisie/viaTableaux/chargesVariables/saisieVariables.html'
    //controller : ''
  })
  .state('tableaux.chargesVoyage', {
    url : '/chargesVoyage',
    templateUrl : '/view/saisie/viaTableaux/chargesVoyage/saisieVoyage.html',
    controller : 'chargesVoyageCtrl'
  })

  .state('formulaires', {
    url :'/formulaires',
    templateUrl : '/view/saisie/viaFormulaires/index.html'
    //controller : ''
  })
  .state('formulaires.chargesFixes', {
    url : '/chargesFixes',
    templateUrl : '/view/saisie/viaFormulaires/chargesFixes/saisieFixes.html'
    //controller : 'chargesFixesCtrl'
  })
  .state('formulaires.chargesConduite', {
    url : '/chargesConduite',
    templateUrl : '/view/saisie/viaFormulaires/chargesConduite/saisieConduite.html'
    //controller : ''
  })
  .state('formulaires.chargesVariables', {
    url : '/chargesVariables',
    templateUrl : '/view/saisie/viaFormulaires/chargesVariables/saisieVariables.html'
    //controller : ''
  })
  .state('formulaires.chargesVoyage', {
    url : '/chargesVoyage',
    templateUrl : '/view/saisie/viaFormulaires/chargesVoyage/saisieVoyage.html'
    //controller : 'chargesVoyageCtrl'
  })

  .state('resultat',{
    url : '/resultat',
    templateUrl : '/view/resultat/resultat.html',
    controller : 'CtrlTableResult'
  });
  //$urlRouterProvider.otherwise('/');
}
]);

myApp.controller("chargesVoyageCtrl",

function Ctrl($scope) {
    //initialisation du scope c'est obligatoire
		$scope.model = {
		};
		$scope.model.selected = {};
		//Utilisation des localStorage
		//Recupertion des informations
		var monobjet_json = localStorage.getItem("objetTab");
		console.log(monobjet_json);

		//des le premier rechargement de la page
		if (monobjet_json != null) {
			$scope.model.tableau = JSON.parse(monobjet_json);
			// Affichage dans la console
			console.log($scope.model);
			//console.log(JSON.parse(monobjet_json));
			//localStorage.clear();
		}
		else {
			//chargement des donnees
			$scope.model = {
				tableau: {
					titre: "Matiere Premiere",
					contenu: [
						{
							id: 1,
							description: "Prix",
							donnee: 100,
							unite: "DH"
						},
						{
							id: 2,
							description: "Prix",
							donnee: 100,
							unite: "DH"
						}
					]
				},
				selected: {}
			};
			console.log($scope.model);
		}//else

		//add and moins
		$scope.add = function () {
			$scope.visible = true;
		};
		$scope.moins = function () {
			$scope.visible = false;
			console.log($scope.model.tableau.titre);
			//save title
			$scope.save();
		};

		// gets the template to ng-include for a table row / item
		$scope.getTemplate = function (ligne) {
			if (ligne.id === $scope.model.selected.id) return 'edit';
			else return 'display';
		};

		$scope.editDonnee = function (ligne) {
			$scope.model.selected = angular.copy(ligne);
		};

		$scope.saveDonnee = function (idx) {
			console.log("Saving donnee");
			$scope.model.tableau.contenu[idx] = angular.copy($scope.model.selected);

			$scope.reset();

			$scope.save();

		};
		$scope.deleteDonnee = function (idx) {
			console.log("delete donnee");
			$scope.model.tableau.contenu.splice(idx, 1);

			$scope.reset();

			$scope.save();
		};

		$scope.reset = function () {
			$scope.model.selected = {};
		};
		$scope.addNew = function (ligne) {
			var longeurDuTab = $scope.model.tableau.contenu.length;
			console.log(longeurDuTab);
			$scope.model.tableau.contenu.push({
				'id': (longeurDuTab > 0 ? $scope.model.tableau.contenu[longeurDuTab - 1].id : 0) + 1,
				'description': ligne.description,
				'donnee': ligne.donnee,
				'unite': ligne.unite,
			});
			$scope.save();
		};

		$scope.save = function () {
			localStorage.removeItem('objetTab');
			//console.log(monobjet_json);
			//utilisation du web storage the localStorage ou sessionStrorage
			var monobjet_json = JSON.stringify($scope.model.tableau);
			localStorage.setItem("objetTab", monobjet_json);
		};

});


myApp.controller('CtrlTableResult',
function Ctrl($scope) {
  //initialisation du scope c'est obligatoire
  $scope.model = {
  };
  $scope.model.selected = {};
  //Utilisation des localStorage
  //Recupertion des informations
  var monobjet_jsonResult = localStorage.getItem("objetTabResult");
  console.log(monobjet_jsonResult);

  //des le premier rechargement de la page
  if (monobjet_jsonResult != null) {
    $scope.model.tableau = JSON.parse(monobjet_jsonResult);
    // Affichage dans la console
    console.log($scope.model);
    //console.log(JSON.parse(monobjet_json));
    //localStorage.clear();
  }
  else {
    //chargement des donnees
    $scope.model = {
      tableau: {
        titre: "Matiere Premiere",
        contenu: [
          {
            id: 1,
            description: "Prix",
            result: 100,
            unite: "DH/km"
          },
          {
            id: 2,
            description: "Prix",
            result: 100,
            unite: "DH/km"
          }
        ]
      },
      selected: {}
    };
  }
  //operateurs
  $scope.operateurs = ['*', '/', '-', '+'];

  //chargement du ressourses
  $scope.data = {};
  //Recupertion des informations
  var monobjet_json = localStorage.getItem("objetTab");
  console.log(monobjet_json);

  //des le premier rechargement de la page
  if (monobjet_json != null) {
    $scope.data.tableau = JSON.parse(monobjet_json);
    // Affichage dans la console
    console.log($scope.data);
    //console.log(JSON.parse(monobjet_json));
    //localStorage.clear();
  }

  //add and moins
  $scope.add = function () {
    $scope.visible = true;
  };
  $scope.moins = function () {
    $scope.visible = false;
    console.log($scope.model.tableau.titre);
    //save title
    $scope.save();
  };

  // gets the template to ng-include for a table row / item
  $scope.getTemplate = function (ligne) {
    if (ligne.id === $scope.model.selected.id) return 'edit';
    else return 'display';
  };

  $scope.editDonnee = function (ligne) {
    $scope.model.selected = angular.copy(ligne);
  };

  $scope.saveDonnee = function (idx) {
    console.log("Saving donnee");
    $scope.model.tableau.contenu[idx] = angular.copy($scope.model.selected);

    $scope.reset();

    $scope.save();

  };
  $scope.deleteDonnee = function (idx) {
    console.log("delete donnee");
    $scope.model.tableau.contenu.splice(idx, 1);

    $scope.reset();

    $scope.save();
  }

  $scope.reset = function () {
    $scope.model.selected = {};
  };
  $scope.addNew = function (ligne) {
    var longeurDuTab = $scope.model.tableau.contenu.length;
    console.log(longeurDuTab);
    //calcul fu formule ici
    ligne.result = 0.00;
    var valeur1 = (ligne.value1 || ligne.value1Input) * 100;
    var valeur2 = (ligne.value2 || ligne.value2Input) * 100;
    switch (ligne.operateur) {
      case '*': {
        ligne.result = (valeur1 * valeur2) / 10000;
        break;
      }
      case '/': {
        ligne.result = (valeur1 / valeur2);
        break;
      }
      case '-': {
        ligne.result = (valeur1 - valeur2) / 100;
        break;
      }
      case '+': {
        ligne.result = (valeur1 + valeur2) / 100;
        break;
      }
      default: {
        ligne.result = ligne.result || 'undifened operateur';
        console.log("non calculer");
      };
    }
    $scope.model.tableau.contenu.push({
      'id': (longeurDuTab > 0 ? $scope.model.tableau.contenu[longeurDuTab - 1].id : 0) + 1,
      'description': ligne.description,
      'result': ligne.result,
      'unite': ligne.unite,
    });
    $scope.save();
  };

  $scope.save = function () {
    localStorage.removeItem('objetTabResult');
    //console.log(monobjet_json);
    //utilisation du web storage the localStorage ou sessionStrorage
    var monobjet_jsonResult = JSON.stringify($scope.model.tableau);
    localStorage.setItem("objetTabResult", monobjet_jsonResult);
  };
});