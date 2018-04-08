const rest = require('node-rest-client').Client
const moment = require('moment')
require('moment/locale/fr')
moment.locale('fr')
let client = new rest()

let divElement = document.getElementById('docker-rest')

client.get('http://monster.nbx-infra.fr:2376/v1.37/containers/json?all=1', function (data) {

    for (i = 0; i < data.length; i++) {
        let name = data[i].Names[0].replace('/', '')
        let created_at = moment(data[i].Created * 1000).format("DD-MM-YYYY")
        let state = ''
        switch (data[i].State) {
            case 'created':
                state = '<span class="badge badge-pill badge-info">Non Initialisé</span>'
                break
            case 'restarting':
                state = '<span class="badge badge-pill badge-primary">Redémarrage en cours...</span>'
                break
            case 'running':
                state = '<span class="badge badge-pill badge-success">En Service</span>'
                break
            case 'removing':
                state = '<span class="badge badge-pill badge-warning">Suppression en cours...</span>'
                break
            case 'paused':
                state = '<span class="badge badge-pill badge-secondary">En Pause</span>'
                break
            case 'exited':
                state = '<span class="badge badge-pill badge-dark">Arrété</span>'
                break
            case 'dead':
                state = '<span class="badge badge-pill badge-danger">/!\ Hors Service /!\</span>'
                break
            default:
                state = 'Status Error'
        }
        divElement.innerHTML += `
    <div class="col-md-4">
    <div class="card mb-4">
      <div class="card-header" id="container-name">
        ${name}
      </div>
      <div class="card-body">
          <h5 class="card-title">${state}</h5>
          <p class="card-text">
            <u>Date de création :</u><br> ${created_at}<br>
            <u>Statut :</u><br> ${data[i].Status} 
          </p>
      </div>
    </div></div>
    `
    }
})