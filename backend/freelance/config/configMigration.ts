const config = require('../config/configEnv')
require('dotenv').config();
import { join } from "path";
import { DataSource } from "typeorm";
 const connectionSource  = new DataSource({
    type: config.TYPE,
    host: config.HOST,
    port: config.PORT,
    username: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],

    migrations: [join(__dirname, '..', 'migrations/*{.ts,.js}')],
    synchronize:config.NODE_ENV === 'production'?false:true
})

// console.log(process.env)
console.log(config.DATABASE)
export default connectionSource;
