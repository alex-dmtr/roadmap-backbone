import {LocalStorage} from 'backbone.localstorage'

var LocalUser = Bb.Model.extend({
    localStorage: new LocalStorage('local.user'),

    defaults: {
      username: '',
      id: null,
      jwt: null
    }
})

module.exports = LocalUser