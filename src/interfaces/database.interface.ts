interface IDatabaseConfig {
    name : string;
    type : string,
    host : string,
    port : number,
    username : string,
    password : string,
    database : string,
    entities : string[],
    synchronize : boolean
}