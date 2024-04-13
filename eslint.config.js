import unlint from "@uneva/eslint";

export default unlint({
    ignores: ["test/**"],
    rules: {
        "no-await-in-loop": "off",
        "@typescript-eslint/no-redundant-type-constituents": "off",
    },
});
