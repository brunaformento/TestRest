app.controller("ctrlGenero", function ($scope, $location, $routeParams, $rootScope, ModalService) {
    $scope.generosCadastrados = [
        { codigo: "1", descricao: "Aventura" },
        { codigo: "2", descricao: "Fantasia" },
        { codigo: "3", descricao: "Ação" },
        { codigo: "4", descricao: "Suspense" }
    ];

    $scope.genero = {};

    $scope.irParaPagina = function (path) {
        $location.path(path);
    };

    $scope.buscarGeneroId = function (idGenero) {
        angular.forEach($scope.generosCadastrados, function (genero, i) {
            if (genero.codigo == idGenero) {
                $scope.genero = genero;
            };
        });
    };

    $scope.alterarGenero = function () {
        console.log($scope.genero);
    };

    $scope.salvarGenero = function () {
        $scope.generosCadastrados = $scope.genero;
        console.log($scope.genero);
    }

    $scope.limparCampos = function () {
        $scope.genero = null;
    }

    $scope.modalExcluir = function (genero) {
        $rootScope.title = genero.descricao;
        ModalService.showModal({
            templateUrl: '../../generos/modalExcluir.html',
            controller: 'ctrlGenero'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.message = result ? "You said Yes" : "You said No";
            });
        });
    };

    $scope.modalExcluido = function (genero) {
        $rootScope.title = genero;
        ModalService.showModal({
            templateUrl: '../../generos/modalExcluido.html',
            controller: 'ctrlGenero'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.message = result ? "You said Yes" : "You said No";
            });
        });
    };

    $scope.generoparaExcluir = "";

    if ($routeParams.id > 0) {
        $scope.buscarGeneroId($routeParams.id);
    }
});