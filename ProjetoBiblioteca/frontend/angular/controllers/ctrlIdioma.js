app.controller("ctrlIdioma", function ($scope, $location, $routeParams, $rootScope, ModalService) {
    $scope.idiomasCadastrados = [
        { codigo: "pt-br", descricao: "Portugues-Brasil" },
        { codigo: "en-uk", descricao: "Inglês - Inglaterra" },
        { codigo: "es-es", descricao: "Espanhol - Espanha" }
    ];

    $scope.idioma = {};

    $scope.irParaPagina = function (path) {
        $location.path(path);
    };

    $scope.buscarIdiomaId = function (idIdioma) {
        angular.forEach($scope.idiomasCadastrados, function (idioma, i) {
            if (idioma.codigo == idIdioma) {
                $scope.idioma = idioma;
            };
        });
    };

    $scope.alterarIdioma = function () {
        console.log($scope.idioma);
    };

    $scope.limparCampos = function () {
        $scope.idioma = null;
    };

    $scope.salvarIdioma = function () {
        $scope.idiomasCadastrados = $scope.idioma;
        console.log($scope.idioma);
    };

    $scope.modalExcluir = function (idioma) {
        $rootScope.title = idioma.descricao;
        ModalService.showModal({
            templateUrl: '../../idiomas/modalExcluir.html',
            controller: 'ctrlIdioma'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.message = result ? "You said Yes" : "You said No";
            });
        });

    };

    $scope.modalExcluido = function (idioma) {
        $rootScope.title = idioma;
        ModalService.showModal({
            templateUrl: '../../idiomas/modalExcluido.html',
            controller: 'ctrlIdioma'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.message = result ? "You said Yes" : "You said No";
            });
        });
    };

    if ($routeParams.id != null) {
        $scope.buscarIdiomaId($routeParams.id);
    }
});