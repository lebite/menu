const mongoose = require('mongoose');

const db = mongoose.connection;

module.exports = db;

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ 
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'bite_menu',
});

module.exports = client;
