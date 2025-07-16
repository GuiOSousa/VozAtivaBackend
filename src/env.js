import dotenv from 'dotenv';
dotenv.config();

export const getEnvKey = (key) => {
    return process.env[key]
}