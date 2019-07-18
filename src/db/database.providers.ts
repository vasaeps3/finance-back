import { createConnection, Connection } from 'typeorm';


export const databaseProviders = [
  {
    provide: Connection,
    useFactory: async () => {
      console.log('databaseProviders');
      return await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'finance',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      })
    },
  },
];
