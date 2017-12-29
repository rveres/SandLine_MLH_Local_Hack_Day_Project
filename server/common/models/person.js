'use strict';

module.exports = function(Person) {

    Person.disableRemoteMethodByName("create", true);
    Person.disableRemoteMethod("upsert", true);
    Person.disableRemoteMethod("updateAll", true);
    Person.disableRemoteMethod("updateAttributes", false);

    Person.disableRemoteMethod("findById", true);

};
