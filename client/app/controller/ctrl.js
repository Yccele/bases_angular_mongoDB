angular.module('myApp').controller('ctrl', ['$scope', '$http', 'persoFactory' , function($scope, $http, persoFactory) {

	$scope.listPerso = [];
	// GET sans factory
	// $http.get("/api/users").then(function(response){
 	// 		$scope.listPerso = response.data;
 	// });

 	persoFactory.query().$promise.then(function(success) {
        // console.log(success);
        $scope.listPerso = success;
    }, function(err) {
        console.log(err);
    });

	$scope.traitForm = function(perso) {
		// Méthode sans factory
		// console.log($scope.perso);
		// $http.post('/api/formulaire', $scope.perso)
		// .then(function(success) {
		// 	console.log(success);
		// 	if (success == 'err') {
		// 		alert("Désolé un problème est survenu lors de l'enregistrement");
		// 	} else {
		// 		console.log($scope.perso);
		// 		alert("La fiche a bien été enregistrée");
		// 		$scope.listPerso.push($scope.perso);
		// 		$scope.perso = {};
		// 	}
		// }), function(error) {
		// 		console.log("Erreur");
		// };
		console.log(perso);
		console.log(persoFactory);
		if (perso != null) {
			$scope.listPerso.push($scope.perso);
			$scope.perso = {};
			persoFactory.save(perso);
			$scope.error = false;
			$scope.listPerso = persoFactory.query();
		} else {
			$scope.error = true;
		}
	}

	$scope.delete = function(perso) {
		// console.log(perso._id);
		// persoFactory.delete({id : perso._id});
  //       $scope.listPerso = persoFactory.query();
  		perso.$delete().then(function(success) {
            console.log(success);
            $scope.listPerso = persoFactory.query();
        }, function(err) {
            console.log(err);
        });
	}
}]);