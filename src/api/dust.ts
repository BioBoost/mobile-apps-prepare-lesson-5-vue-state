import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://dust.devbitapp.be/api'
});

export const Trees = {
  resource: 'trees',

  all() {
    return Api.get(`/${this.resource}`);     // Returns a promise !
  },


}