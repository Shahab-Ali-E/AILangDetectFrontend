import { getProjectEnvVariables } from "@/shared/projectEnvVariables";

const projectEnvVariables = getProjectEnvVariables();

export const DETECT_VIDEO_URL = `${projectEnvVariables.envVariables.VITE_BACKEND_URL}/predict`; 