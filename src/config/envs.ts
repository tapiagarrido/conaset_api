import "dotenv/config";
import { get } from "env-var";

export const envs = {

    PORT: get("PORT").required().asPortNumber(),
    BASE_URL_CONASET: get("BASE_URL_CONASET").required().asString(),
    X_API_KEY: get("X_API_KEY").required().asString(),
    API_KEY_CRECIC: get("API_KEY_CRECIC").required().asString()
    
}