import type { UnpluginFactory } from "unplugin";
import type { ResolvedConfig } from "vite";
import type { Config } from "@kubb/core";
import type { Options } from "./types";

import { LogLevel, createLogger } from "@kubb/core/logger";
import { safeBuild } from "@kubb/core";
import { createUnplugin } from "unplugin";
import process from "node:process";

export const defineUnplugin: UnpluginFactory<Options | undefined> = (options) => {
    const name = "unplugin-openapi-gen-ts" as const;
    const logger = createLogger({ name, logLevel: LogLevel.info });
    const setupLogger = (config: ResolvedConfig) => (message: string) => config.logger.info(`${name}: ${message}`);

    return {
        name,
        enforce: "pre",
        vite: {
            configResolved(config) {
                logger.on("start", setupLogger(config));
                logger.on("end", setupLogger(config));
                logger.on("warning", setupLogger(config));
                logger.on("error", setupLogger(config));
            },
        },
        async buildStart() {
            if (!options?.config) throw new Error("No config provided");

            const { root, ...userConfig } = options.config as Config;

            logger.emit("start", "🚀 Building");

            const { error } = await safeBuild({
                config: {
                    root: process.cwd(),
                    ...userConfig,
                    output: {
                        write: true,
                        clean: true,
                        ...userConfig.output,
                    },
                },
            });

            if (error) throw error;
        },
    };
};

export const unplugin = createUnplugin(defineUnplugin);

export default unplugin;
