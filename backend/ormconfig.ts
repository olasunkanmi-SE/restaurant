import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dBConfig: PostgresConnectionOptions = {
  type: 'postgres',

  //     migrationsDir: __dirname + '/src/infrastructure/data_access/migrations',
  //   },
};

export default dBConfig;
