import { Sequelize } from 'sequelize-typescript';
import config from './dbConfig';

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, {
  host: config.host,
  port:config.dbport,
  dialect: config.dialect,
  logging: config.logging,
  models: [__dirname + '/models'],
});

export default sequelize;