import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
	...compat.extends("next/core-web-vitals"),
	{
		ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
	},
	{
		rules: {
			// Prettier owns indentation
			indent: "off",
			"@typescript-eslint/indent": "off",
			// DB schema uses snake_case; constants use UPPER_CASE — too many false positives
			"@typescript-eslint/naming-convention": "off",
			// Unused vars: warn not error (many boilerplate leftovers)
			"@typescript-eslint/no-unused-vars": "warn",
			// any used intentionally in several places
			"@typescript-eslint/no-explicit-any": "off",
			// Legacy img tags in public-facing templates
			"@next/next/no-img-element": "off",
			// exhaustive-deps: warn only
			"react-hooks/exhaustive-deps": "warn",
			// target="_blank" used intentionally
			"react/jsx-no-target-blank": "off",
			// console allowed
			"no-console": "off",
		},
	},
];

export default eslintConfig;
