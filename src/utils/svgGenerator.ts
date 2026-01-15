/** biome-ignore-all lint/suspicious/noExplicitAny: TODO */
/** biome-ignore-all lint/suspicious/noAssignInExpressions: TODO */
/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: TODO */
/** biome-ignore-all lint/correctness/noUnusedVariables: TODO */

import type { SVGTheme } from "@/stores/world";

/**
 * Custom stringifier to handle the optional array breaking.
 */
const customStringify = (
	obj: any,
	theme: SVGTheme,
	indent: number = 0,
): string => {
	const spaces = "  ".repeat(indent);
	const nextSpaces = "  ".repeat(indent + 1);

	if (Array.isArray(obj)) {
		if (obj.length === 0) return "[]";

		const hasObjects = obj.some(
			(item) =>
				typeof item === "object" && item !== null && !Array.isArray(item),
		);
		const shouldBreak = hasObjects || theme.breakArrays;

		if (!shouldBreak) {
			const items = obj
				.map((item) => customStringify(item, theme, 0))
				.join(", ");
			return `[${items}]`;
		} else {
			const items = obj
				.map((item) => customStringify(item, theme, indent + 1))
				.join(`,\n${nextSpaces}`);
			return `[\n${nextSpaces}${items}\n${spaces}]`;
		}
	}

	if (obj !== null && typeof obj === "object") {
		const keys = Object.keys(obj);
		if (keys.length === 0) return "{}";
		const items = keys
			.map((key) => {
				const value = customStringify(obj[key], theme, indent + 1);
				return `"${key}": ${value}`;
			})
			.join(`,\n${nextSpaces}`);
		return `{\n${nextSpaces}${items}\n${spaces}}`;
	}

	return JSON.stringify(obj);
};

export const generateJSONSVG = (json: string, theme: SVGTheme): string => {
	let parsed: any;
	try {
		parsed = JSON.parse(json);
	} catch (e) {
		throw new Error("Invalid JSON input");
	}

	const formatted = customStringify(parsed, theme);
	const lines = formatted.split("\n");

	const lineHeight = theme.fontSize * 1.5;
	const padding = theme.padding;

	const charWidth = theme.fontSize * 0.601;
	const maxLineLength = Math.max(...lines.map((l) => l.length));

	const maxLineNumStr = (theme.startLineNumber + lines.length - 1).toString();
	const gutterWidth = theme.showLineNumbers
		? maxLineNumStr.length * charWidth + 20
		: 0;

	const internalWidth = Math.ceil(
		maxLineLength * charWidth + gutterWidth + padding * 2,
	);
	const internalHeight = Math.ceil(lines.length * lineHeight + padding * 2);

	const escape = (str: string) =>
		str
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&apos;");

	const renderLineContent = (line: string) => {
		const numberRegex = /-?\d+(\.\d+)?([eE][+-]?\d+)?/;
		const booleanRegex = /\b(true|false)\b/;
		const nullRegex = /\bnull\b/;

		const tokens = line.split(/([{}[\]:,"])/);
		let inString = false;
		let isKey = false;

		return tokens
			.map((token, index) => {
				if (token === undefined || token === "") return "";
				let color = theme.bracketColor;
				const trimmed = token.trim();

				if (token === '"') {
					const result = `<tspan fill="${theme.quoteColor}">${escape(token)}</tspan>`;
					if (!inString) {
						let nextTokenIdx = index + 1;
						while (tokens[nextTokenIdx] !== undefined) {
							if (tokens[nextTokenIdx] === '"') break;
							nextTokenIdx++;
						}
						let postQuoteIdx = nextTokenIdx + 1;
						while (
							tokens[postQuoteIdx] !== undefined &&
							tokens[postQuoteIdx].trim() === ""
						) {
							postQuoteIdx++;
						}
						isKey = tokens[postQuoteIdx] === ":";
					}
					inString = !inString;
					return result;
				}

				if (inString) {
					color = isKey ? theme.keyColor : theme.stringColor;
					return `<tspan fill="${color}">${escape(token)}</tspan>`;
				}

				if (token.match(/[{}[\]:,]/)) {
					color = theme.bracketColor;
				} else if (trimmed === "") {
					return escape(token);
				} else {
					if (trimmed.match(numberRegex)) {
						color = theme.numberColor;
					} else if (trimmed.match(booleanRegex)) {
						color = theme.booleanColor;
					} else if (trimmed.match(nullRegex)) {
						color = theme.nullColor;
					}
				}
				return `<tspan fill="${color}">${escape(token)}</tspan>`;
			})
			.join("");
	};

	const content = lines
		.map((line, i) => {
			const y = padding + i * lineHeight;
			const lineNumberX = padding;
			const codeX = padding + gutterWidth;

			let lineElement = "";
			if (theme.showLineNumbers) {
				const lineNum = theme.startLineNumber + i;
				lineElement += `<text x="${lineNumberX}" y="${y}" font-family='${theme.fontFamily}' font-size="${theme.fontSize}" fill="${theme.lineNumberColor}" text-anchor="start" dominant-baseline="hanging">${lineNum}</text>`;
			}
			lineElement += `<text x="${codeX}" y="${y}" font-family='${theme.fontFamily}' font-size="${theme.fontSize}" xml:space="preserve" dominant-baseline="hanging">${renderLineContent(line)}</text>`;
			return lineElement;
		})
		.join("\n");

	const borderRadius = theme.showRounding ? theme.borderRadius : 0;
	const backgroundRect = !theme.hideBackground
		? `<rect x="0" y="0" width="${internalWidth}" height="${internalHeight}" fill="${theme.background}" rx="${borderRadius}" />`
		: "";

	return `
<svg 
  width="100%" 
  height="100%"
  viewBox="0 0 ${internalWidth} ${internalHeight}" 
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
>
  <style>
    text { white-space: pre; }
  </style>
  ${backgroundRect}
  ${content}
</svg>`.trim();
};
