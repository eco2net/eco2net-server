export default () => ({
    database: {
            name: 'default',
            type: 'postgres',
            host: process.env.PGHOSTLOCAL,
            port: parseInt(process.env.PGPORTLOCAL),
            username: process.env.PGUSRLOCAL,
            password: process.env.PGPWDLOCAL,
            database: process.env.PGDBLOCAL,
            entities: [
              "dist/entities/**/*.js",
           ],
            synchronize: true,
    }  
})