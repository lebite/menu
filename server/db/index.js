const cassandra = require('cassandra-driver');
const redis = require('redis');

module.exports.client2 = redis.createClient();


module.exports.client = new cassandra.Client({ 
  contactPoints: ['13.57.213.77'],
  localDataCenter: 'datacenter1',
  keyspace: 'bite_menu',
});
