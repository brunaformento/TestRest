app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            templateUrl: "livros/listar.html"
        })
        .when("/livros/lista", {
            templateUrl: "livros/listar.html",
            controller: "ctrlLivros"
        })
        .when("/livros/novo", {
            templateUrl: "livros/cadastrar.html",
            controller: "ctrlLivros"
        })
        .when("/livros/alterar/:id", {
            templateUrl: "livros/alterar.html",
            controller: "ctrlLivros"
        })
        .when("/generos/lista", {
            templateUrl: "generos/listar.html",
            controller: "ctrlGenero"
        })
        .when("/generos/novo", {
            templateUrl: "generos/cadastrar.html",
            controller: "ctrlGenero"
        })
        .when("/generos/alterar/:id", {
            templateUrl: "generos/alterar.html",
            controller: "ctrlGenero"
        })
        .when("/idiomas/lista", {
            templateUrl: "idiomas/listar.html",
            controller: "ctrlIdioma"
        })
        .when("/idiomas/novo", {
            templateUrl: "idiomas/cadastrar.html",
            controller: "ctrlIdioma"
        })
        .when("/idiomas/alterar/:id", {
            templateUrl: "idiomas/alterar.html",
            controller: "ctrlIdioma"
        })
});