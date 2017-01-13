'use strict';

const boom = require('boom');

let users = {};

module.exports = {
  saveItem: function(request, reply) {
    try {
      if (!users.hasOwnProperty(request.params.user)) {
        users[request.params.user] = {};
        users[request.params.user][request.params.item] = 1;
        reply(users[request.params.user]);
      } else if (users[request.params.user].hasOwnProperty(request.params.item))
        reply(boom.conflict('Item is already added, increase quantity instead'));
      else {
        users[request.params.user][request.params.item] = 1;
        reply(users[request.params.user]);
      }
    } catch (error) {
      request.log('error', error);
      reply(boom.badImplementation());
    };
  },

  deleteItem: function(request, reply) {
    try {
      if (!users.hasOwnProperty(request.params.user))
        reply(boom.notFound());
      else if (!users[request.params.user].hasOwnProperty(request.params.item))
        reply(boom.notFound());
      else {
        delete users[request.params.user][request.params.item];
        reply(users[request.params.user]);
      }
    } catch (error) {
      request.log('error', error);
      reply(boom.badImplementation());
    };
  },

  changeQuantity: function(request, reply) {
    try {
      if (!users.hasOwnProperty(request.params.user))
        reply(boom.notFound());
      else if (!users[request.params.user].hasOwnProperty(request.params.item))
        reply(boom.notFound());
      else if (request.params.quantity === 0) {
        delete users[request.params.user][request.params.item];
        reply(users[request.params.user]);
      } else {
        users[request.params.user][request.params.item] = request.params.quantity;
        reply(users[request.params.user]);
      }
    } catch (error) {
      request.log('error', error);
      reply(boom.badImplementation());
    };
  },

  order: function(request, reply) {
    reply(boom.notImplemented());
  },
};
