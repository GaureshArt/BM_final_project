import config from '../config/configEnv';

import { join } from "path";

import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
export const dbConfig:MysqlConnectionOptions= {
    type: config.TYPE,
    host: config.HOST,
    port: config.PORT,
    username: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    
    synchronize:config.NODE_ENV === 'production'?false:true
}


console.log('TYPEORM TYPE:', config.TYPE);
