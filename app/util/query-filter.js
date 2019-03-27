exports.solucao = (req) => {

    const query = {};

    if (req.query.codigo) {
        query.codigo = parseInt(req.query.codigo);
    }

    if (req.query.categoria && req.query.categoria != '') {
        query.categoria = {
            $regex: req.query.categoria,
            $options: 'i'
        }
    }

    if (req.query.nome && req.query.nome != '') {
        query.nome = {
            $regex: req.query.nome,
            $options: 'i'
        }
    }

    if (req.query.empresaId && req.query.empresaId != '') {
        query.empresaId = req.query.empresaId
    }
    
    return query;
}

exports.empresa = (req) => {

    const query = {};
    
   

    if (req.query.encarregado && req.query.encarregado != '') {
        query.encarregado = {
            $regex: req.query.encarregado,
            $options: 'i'
        }
    }

    if (req.query.nome && req.query.nome != '') {
        query.nome = {
            $regex: req.query.nome,
            $options: 'i'
        }
    }

    if (req.query.telefone && req.query.telefone != '') {
        query.telefone = {
            $regex: req.query.telefone,
            $options: 'i'
        }
    }

    if (req.query.email && req.query.email != '') {
        query.email = {
            $regex: req.query.email,
            $options: 'i'
        }
    }

    return query;
}

exports.avaliacao = (req) => {

    const query = {};

    if (req.query.autor && req.query.autor != '') {
        query.autor = {
            $regex: req.query.autor,
            $options: 'i'
        }
    }

    if (req.query.solucaoId && req.query.solucaoId != '') {
        query.solucaoId = req.query.solucaoId
    }
    
    return query;
}
