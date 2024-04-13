import { promises as fs } from "node:fs";
import { basename, resolve } from "node:path";
import fg from "fast-glob";
import c from "tinyrainbow";

export async function forceDefaultExport(): Promise<void> {
    const files = await fg("*.cjs", {
        ignore: ["chunk-*"],
        absolute: true,
        cwd: resolve(process.cwd(), "./dist"),
    });

    for (const file of files) {
        console.log(c.cyan("POST "), `Fix ${basename(file)}`);
        let code = await fs.readFile(file, "utf8");
        code = code.replace("exports.default =", "module.exports =");
        code += "\nexports.default = module.exports;";

        await fs.writeFile(file, code);
    }
}
