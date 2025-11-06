type projectEnvVariablesTypes = Pick<ImportMetaEnv,
"VITE_CLERK_PUBLISHABLE_KEY" |
"VITE_GENERATE_SOURCEMAP" |
"VITE_ENVIRONMENT_NAME" |
"VITE_BACKEND_URL">;

const projectEnvVariables: projectEnvVariablesTypes = {
    VITE_CLERK_PUBLISHABLE_KEY : "${VITE_CLERK_PUBLISHABLE_KEY}",
    VITE_GENERATE_SOURCEMAP: "${VITE_GENERATE_SOURCEMAP}",
    VITE_ENVIRONMENT_NAME : "${VITE_ENVIRONMENT_NAME}",
    VITE_BACKEND_URL : "${VITE_BACKEND_URL}",
};

export const getProjectEnvVariables = () : {
    envVariables : projectEnvVariablesTypes
} => {
    return {
        envVariables : {
            VITE_CLERK_PUBLISHABLE_KEY : !projectEnvVariables.VITE_CLERK_PUBLISHABLE_KEY.includes("VITE_") 
            ? projectEnvVariables.VITE_CLERK_PUBLISHABLE_KEY : import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
            
            VITE_GENERATE_SOURCEMAP : !projectEnvVariables.VITE_GENERATE_SOURCEMAP.includes("VITE_") 
            ? projectEnvVariables.VITE_GENERATE_SOURCEMAP : import.meta.env.VITE_GENERATE_SOURCEMAP,

            VITE_ENVIRONMENT_NAME : !projectEnvVariables.VITE_ENVIRONMENT_NAME.includes("VITE_") 
            ? projectEnvVariables.VITE_ENVIRONMENT_NAME : import.meta.env.VITE_ENVIRONMENT_NAME,
            
            VITE_BACKEND_URL : !projectEnvVariables.VITE_BACKEND_URL.includes("VITE_") 
            ? projectEnvVariables.VITE_BACKEND_URL : import.meta.env.VITE_BACKEND_URL,
        }
    }
}