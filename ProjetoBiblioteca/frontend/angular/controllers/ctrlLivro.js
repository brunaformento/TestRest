app.controller("ctrlLivros", function ($scope, $location, $log, ModalService, $routeParams, $rootScope) {
    var generoAventura = { codigo: "1", descricao: "Aventura" };
    var generoFantasia = { codigo: "2", descricao: "Fantasia" };
    var generoAcao = { codigo: "3", descricao: "Ação" };
    var generoSuspense = { codigo: "4", descricao: "Suspense" };

    var idiomaPtbr = { codigo: "pt-br", descricao: "Portugues-Brasil" };
    var idiomaEnUk = { codigo: "en-uk", descricao: "Inglês - Inglaterra" };
    var idiomaEsEs = { codigo: "es-es", descricao: "Espanhol - Espanha" };

    $scope.livro = {};

    $scope.idiomasCadastrados = [
        idiomaPtbr, idiomaEnUk, idiomaEsEs
    ];

    $scope.generosCadastrados = [
        generoAcao, generoAventura, generoFantasia, generoSuspense
    ];

    $scope.livros = [
        {
            codigo: "1", nome: "O Senhor dos Aneis",
            genero: [generoAventura, generoFantasia], idioma: idiomaPtbr
        },
        {
            codigo: "2", nome: "Lord of the Rings", genero: [generoAventura], idioma: idiomaEnUk
        },
        {
            codigo: "3", nome: "El Señor de los Anillos", genero: [generoFantasia], idioma: idiomaEsEs
        }
    ];

    $scope.adicionaGenero = function () {
        if ($scope.livro.genero == undefined) {
            $scope.livro.genero = [];
        };
        if ($scope.generoEscolhido != undefined) {
            $scope.livro.genero.push($scope.generoEscolhido);
            $scope.removerGeneroDropDown($scope.generoEscolhido);
        } else {
            $scope.modalEscolhaGenero();
        }

    };

    $scope.removerGeneroDropDown = function (genero) {
        var lista = [];
        angular.forEach($scope.generosCadastrados, function (generoCadastrado, i) {
            if (genero != generoCadastrado) {
                lista.push(generoCadastrado);
            };
        });
        $scope.generosCadastrados = lista;
    };

    $scope.removerGeneroTabela = function (item) {
        var lista = [];

        angular.forEach($scope.livro.genero, function (livroGeneros, i) {
            if (item != livroGeneros) {
                lista.push(livroGeneros);
            };
        });
        $scope.livro.genero = lista;
        $scope.generosCadastrados.push(item);
    };

    $scope.atualizarGenero = function () {
        var lista = $scope.generosCadastrados;
        var listaItens = $scope.livro.genero;

        angular.forEach(listaItens, function (item) {
            lista = lista.filter(function (genero) {
                return genero.descricao !== item.descricao;
            });
        });

        $scope.generosCadastrados = lista;
    };

    $scope.buscarLivroId = function (idLivro) {
        angular.forEach($scope.livros, function (livro, i) {
            if (livro.codigo == idLivro) {
                $scope.livro = livro;
            };
        });
    };

    $scope.irParaPagina = function (path) {
        $location.path(path);
    };

    $scope.alterarLivro = function () {
        console.log($scope.livro);
    };

    $scope.salvarLivro = function () {
        $scope.livros = $scope.livro;
        console.log($scope.livro);

    };

    $scope.limparCampos = function () {
        $scope.livro = null;
    };

    $scope.modalExcluir = function (livro) {
        $rootScope.title = livro.nome;
        ModalService.showModal({
            templateUrl: '../../livros/modalExcluir.html',
            controller: 'ctrlLivros'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.message = result ? "You said Yes" : "You said No";
            });
        });
    };

    $scope.modalExcluido = function (livro) {
        $rootScope.title = livro;
        ModalService.showModal({
            templateUrl: '../../livros/modalExcluido.html',
            controller: 'ctrlLivros'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.message = result ? "You said Yes" : "You said No";
            });
        });
    };

    $scope.modalEscolhaGenero = function () {
        ModalService.showModal({
            templateUrl: '../../livros/modalEscolhaGenero.html',
            controller: 'ctrlLivros'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.message = result ? "You said Yes" : "You said No";
            });
        });
    };

    if ($routeParams.id > 0) {
        $scope.buscarLivroId($routeParams.id);
        $scope.atualizarGenero();
    };

});
