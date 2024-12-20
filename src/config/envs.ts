import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    // PRODUCTS_MICROSERVICE_HOST: string;
    // PRODUCTS_MICROSERVICE_PORT: number;
    NATS_SERVERS: string[];
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_DB: joi.string().required(),
    // PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    // PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
})
.unknown(true);

const {error, value} = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    postgresUser: envVars.POSTGRES_USER,
    postgresPassword: envVars.POSTGRES_PASSWORD,
    postgresDb: envVars.POSTGRES_DB,
    // productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
    // productsMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
    natsServers: envVars.NATS_SERVERS,
}

