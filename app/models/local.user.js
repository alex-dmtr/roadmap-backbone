// import {LocalStorage} from 'backbone.localstorage'

const UID = 'local.user.roadmap'
var LocalUser = Bb.Model.extend({
    // localStorage: new LocalStorage('local.user'),

    defaults: {
      username: '',
      id: null,
      jwt: null,
      is_auth: false
    },

    fetch: function() {
      this.set(JSON.parse(localStorage.getItem(UID)))
    },

    destroy: function() {
      localStorage.removeItem(UID)
      this.unset('username')
      this.unset('id')
      this.unset('jwt')
      this.set('is_auth', false)
    },

    save: function() {
      localStorage.setItem(UID, JSON.stringify(this.toJSON()))

    }
})

module.exports = LocalUser