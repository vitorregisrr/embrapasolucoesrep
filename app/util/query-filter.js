module.exports = (req) => {

    const query = {};
    
    if (req.query.zona) {
        query.zona = req.query.zona
    }

    if (req.query.tipo) {
        query.tipo = req.query.tipo
    }
    
    if (req.query.codigo && req.query.codigo != '') {
        query.codigo = req.query.codigo;
    }

    if (req.query.zona == 'Urbana') {
        if (req.query.cep && req.query.cep != '') {
            query.cep = {
                $regex: req.query.cep,
                $options: 'i'
            }
        }

        if (req.query.cidade && req.query.cidade != '') {
            query.cidade = {
                $regex: req.query.cidade,
                $options: 'i'
            }
        }

        if (req.query.rua && req.query.rua != '') {
            query.rua = {
                $regex: req.query.rua,
                $options: 'i'
            }
        }

        if (req.query.bairro && req.query.bairro != '') {
            query.bairro = {
                $regex: req.query.bairro,
                $options: 'i'
            }
        }

        if (req.query.dormitorios && req.query.dormitorios != '') {
            if (req.query.dormitorios < 4) {
                query.dormitorios = req.query.dormitorios;

            } else if (req.query.dormitorios == 4) {
                query.dormitorios = {
                    $gte: req.query.dormitorios
                }
            }
        }

        if (req.query.suites && req.query.suites != '') {
            if (req.query.suites < 4) {
                query.suites = req.query.suites;

            } else if (req.query.suites == 4) {
                query.suites = {
                    $gte: req.query.suites
                }
            }
        }

        if (req.query.cozinhas && req.query.cozinhas != '') {
            if (req.query.cozinhas < 4) {
                query.cozinhas = req.query.cozinhas;

            } else if (req.query.cozinhas == 4) {
                query.cozinhas = {
                    $gte: req.query.cozinhas
                }
            }
        }

        if (req.query.banheiros && req.query.banheiros != '') {
            if (req.query.banheiros < 4) {
                query.banheiros = req.query.banheiros;

            } else if (req.query.banheiros == 4) {
                query.banheiros = {
                    $gte: req.query.banheiros
                }
            }
        }

        if (req.query.piscina && req.query.piscina != '') {
            query.piscina = req.query.piscina;
        }

        if (req.query.patio && req.query.patio != '') {
            query.patio = req.query.patio;
        }

        if (req.query.valmin || req.query.valmax) {
            let rangeQuery = {}

            if (req.query.valmin) {
                rangeQuery.$gt = req.query.valmin;

            }

            if (req.query.valmax) {
                rangeQuery.$lt = req.query.valmax;
            }

            query.preco = rangeQuery;
        }
    }else if( req.query.zona == 'Rural'){

        if (req.query.municipio && req.query.municipio != '') {
            query.municipio = {
                $regex: req.query.municipio,
                $options: 'i'
            }
        }

        if (req.query.localidade && req.query.localidade != '') {
            query.localidade = {
                $regex: req.query.localidade,
                $options: 'i'
            }
        }

        if (req.query.mangueiras && req.query.mangueiras != '') {
            if (req.query.mangueiras < 4) {
                query.mangueiras = req.query.mangueiras;

            } else if (req.query.mangueiras == 4) {
                query.mangueiras = {
                    $gte: req.query.mangueiras
                }
            }
        }

        if (req.query.galpoes && req.query.galpoes != '') {
            if (req.query.galpoes < 4) {
                query.galpoes = req.query.galpoes;

            } else if (req.query.galpoes == 4) {
                query.galpoes = {
                    $gte: req.query.galpoes
                }
            }
        }

        if (req.query.sedes && req.query.sedes != '') {
            if (req.query.sedes < 4) {
                query.sedes = req.query.sedes;

            } else if (req.query.sedes == 4) {
                query.sedes = {
                    $gte: req.query.sedes
                }
            }
        }

        if (req.query.acudes && req.query.acudes != '') {
            if (req.query.acudes < 4) {
                query.acudes = req.query.acudes;

            } else if (req.query.acudes == 4) {
                query.acudes = {
                    $gte: req.query.acudes
                }
            }
        }

        if (req.query.extensaomin || req.query.extensaomax) {
            let rangeQuery = {}

            if (req.query.extensaomin) {
                rangeQuery.$gt = req.query.extensaomin;

            }

            if (req.query.extensaomax) {
                rangeQuery.$lt = req.query.extensaomax;
            }

            query.extensao = rangeQuery;
        }
    }
    return query;
}