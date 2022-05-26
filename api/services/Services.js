const database = require('../models');

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo;
    }

    async todosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    
}

module.exports = Services;