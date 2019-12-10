const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Reply = require('./reply')(sequelize, Sequelize)
db.Image = require('./image')(sequelize, Sequelize);
db.Sns = require('./sns')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
