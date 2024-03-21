import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { logger, LOG_LEVEL } from "./logger";
import { parseEnv } from "./parseEnv";


const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export { logger, LOG_LEVEL, parseEnv, cn };