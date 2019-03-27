document.addEventListener("DOMContentLoaded", function () {

    $('.selectpicker')
        .selectpicker({ style : 'selectpicker-button'});

    $('.selectpicker-empresa')
        .selectpicker({
            liveSearch: true,
            style : 'selectpicker-button'
        })
        .ajaxSelectPicker({
            ajax: {
                url: '/api/empresa/searchbyajax',
                type: 'GET',
                dataType: 'json',
                data: function () {
                    var params = {
                        text: '{{{q}}}'
                    };

                    return params;
                }
            },

            locale: {
                searchPlaceholder: 'Digite aqui para pesquisar',
                emptyTitle: 'Procurar por empresa...',
                errorText: 'Houve algum erro na pesquisa. Tente novamente ou contate o suporte.',
                statusNoResults: 'Nenhuma empresa encontrada com estas letras. Tente outra coisa.',
                statusInitialized: 'Digite uma letra ou nome para iniciar a pesquisa.',
                currentlySelected: 'Selecionado atualmente:'
            },

            preprocessData: function (data) {
                var empresas = [];
                data.empresas.forEach(empresa => {
                    empresas.push({
                        'value': empresa._id,
                        'text': empresa.nome,
                        'disabled': false
                    });
                })
                return empresas;
            },

            preserveSelected: true
        });

        $('.selectpicker-solucao')
        .selectpicker({
            liveSearch: true,
            style : 'selectpicker-button'
        })
        .ajaxSelectPicker({
            ajax: {
                url: '/api/solucao/searchbyajax',
                type: 'GET',
                dataType: 'json',
                data: function () {
                    var params = {
                        text: '{{{q}}}'
                    };

                    return params;
                }
            },

            locale: {
                searchPlaceholder: 'Digite aqui para pesquisar',
                emptyTitle: 'Procurar por solução...',
                errorText: 'Houve algum erro na pesquisa. Tente novamente ou contate o suporte.',
                statusNoResults: 'Nenhuma solução encontrada com estas letras. Tente outra coisa.',
                statusInitialized: 'Digite uma letra ou nome para iniciar a pesquisa.',
                currentlySelected: 'Selecionado atualmente:'
            },

            preprocessData: function (data) {
                var solucoes = [];
                data.solucoes.forEach(solucao => {
                    solucoes.push({
                        'value': solucao._id,
                        'text': solucao.nome,
                        'disabled': false
                    });
                })
                return solucoes;
            },

            preserveSelected: true
        });
});