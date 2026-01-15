import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { generateJSONSVG } from "@/utils/svgGenerator";

export interface SVGTheme {
	background: string;
	keyColor: string;
	stringColor: string;
	numberColor: string;
	booleanColor: string;
	nullColor: string;
	bracketColor: string;
	quoteColor: string;
	lineNumberColor: string;
	gradient: string;
	borderRadius: number;
	padding: number;
	fontSize: number;
	fontFamily: string;
	showLineNumbers: boolean;
	startLineNumber: number;
	hideBackground: boolean;
	showRounding: boolean;
	breakArrays: boolean;
}

export type ThemePreset =
	| "MinimalWhite"
	| "Dracula"
	| "OneDark"
	| "Monokai"
	| "GithubLight"
	| "Synthwave";

const SYSTEM_MONO =
	'"Monaco", "Menlo", "Consolas", "Liberation Mono", "Courier New", monospace';

export const THEMES: Record<ThemePreset, SVGTheme> = {
	MinimalWhite: {
		background: "#1a1a1a",
		keyColor: "#ffffff",
		stringColor: "#ffffff",
		numberColor: "#ffffff",
		booleanColor: "#ffffff",
		nullColor: "#ffffff",
		bracketColor: "#ffffff",
		quoteColor: "#ffffff",
		lineNumberColor: "#666666",
		gradient:
			"linear-gradient(to right,#1a1a1a 0%, #ffffff 12.5%, #ffffff 25%, #ffffff 37.5%, #ffffff 50%, #ffffff 62.5%, #ffffff 75%, #ffffff 87.5%, #666666 100%)",
		borderRadius: 4,
		padding: 24,
		fontSize: 14,
		fontFamily: SYSTEM_MONO,
		showLineNumbers: false,
		startLineNumber: 1,
		hideBackground: false,
		showRounding: false,
		breakArrays: false,
	},
	Dracula: {
		background: "#282a36",
		keyColor: "#ff79c6",
		stringColor: "#f1fa8c",
		numberColor: "#bd93f9",
		booleanColor: "#50fa7b",
		nullColor: "#ffb86c",
		bracketColor: "#f8f8f2",
		quoteColor: "#f1fa8c88",
		lineNumberColor: "#6272a4",
		gradient:
			"linear-gradient(to right,#282a36 0%, #ff79c6 12.5%, #f1fa8c 25%, #bd93f9 37.5%, #50fa7b 50%, #ffb86c 62.5%, #f8f8f2 75%, #f1fa8c88 87.5%, #6272a4 100%)",
		borderRadius: 4,
		padding: 24,
		fontSize: 14,
		fontFamily: SYSTEM_MONO,
		showLineNumbers: false,
		startLineNumber: 1,
		hideBackground: false,
		showRounding: false,
		breakArrays: false,
	},
	OneDark: {
		background: "#282c34",
		keyColor: "#e06c75",
		stringColor: "#98c379",
		numberColor: "#d19a66",
		booleanColor: "#56b6c2",
		nullColor: "#abb2bf",
		bracketColor: "#abb2bf",
		quoteColor: "#98c37988",
		lineNumberColor: "#4b5263",
		gradient:
			"linear-gradient(to right,#282c34 0%, #e06c75 12.5%, #98c379 25%, #d19a66 37.5%, #56b6c2 50%, #abb2bf 62.5%, #abb2bf 75%, #98c37988 87.5%, #4b5263 100%)",
		borderRadius: 4,
		padding: 24,
		fontSize: 14,
		fontFamily: SYSTEM_MONO,
		showLineNumbers: false,
		startLineNumber: 1,
		hideBackground: false,
		showRounding: false,
		breakArrays: false,
	},
	Monokai: {
		background: "#272822",
		keyColor: "#f92672",
		stringColor: "#e6db74",
		numberColor: "#ae81ff",
		booleanColor: "#a6e22e",
		nullColor: "#fd971f",
		bracketColor: "#f8f8f2",
		quoteColor: "#e6db7488",
		lineNumberColor: "#90908a",
		gradient:
			"linear-gradient(to right,#272822 0%, #f92672 12.5%, #e6db74 25%, #ae81ff 37.5%, #a6e22e 50%, #fd971f 62.5%, #f8f8f2 75%, #e6db7488 87.5%, #90908a 100%)",
		borderRadius: 4,
		padding: 24,
		fontSize: 14,
		fontFamily: SYSTEM_MONO,
		showLineNumbers: false,
		startLineNumber: 1,
		hideBackground: false,
		showRounding: false,
		breakArrays: false,
	},
	GithubLight: {
		background: "#ffffff",
		keyColor: "#0550ae",
		stringColor: "#0a3069",
		numberColor: "#cf222e",
		booleanColor: "#0550ae",
		nullColor: "#6e7781",
		bracketColor: "#24292f",
		quoteColor: "#0550ae66",
		lineNumberColor: "#afb8c1",
		gradient:
			"linear-gradient(to right,#ffffff 0%, #0550ae 12.5%, #0a3069 25%, #cf222e 37.5%, #0550ae 50%, #6e7781 62.5%, #24292f 75%, #0550ae66 87.5%, #afb8c1 100%)",
		borderRadius: 4,
		padding: 24,
		fontSize: 14,
		fontFamily: SYSTEM_MONO,
		showLineNumbers: false,
		startLineNumber: 1,
		hideBackground: false,
		showRounding: false,
		breakArrays: false,
	},
	Synthwave: {
		background: "#2b213a",
		keyColor: "#f92aad",
		stringColor: "#3fe4c4",
		numberColor: "#f97e72",
		booleanColor: "#72f1b8",
		nullColor: "#ff8b39",
		bracketColor: "#ffffff",
		quoteColor: "#3fe4c488",
		lineNumberColor: "#6e5e8e",
		gradient:
			"linear-gradient(to right,#2b213a 0%, #f92aad 12.5%, #3fe4c4 25%, #f97e72 37.5%, #72f1b8 50%, #ff8b39 62.5%, #ffffff 75%, #3fe4c488 87.5%, #6e5e8e 100%)",
		borderRadius: 4,
		padding: 24,
		fontSize: 14,
		fontFamily: SYSTEM_MONO,
		showLineNumbers: false,
		startLineNumber: 1,
		hideBackground: false,
		showRounding: false,
		breakArrays: false,
	},
};

const DEFAULT_JSON = `{
  "id": "item-001",
  "name": "Vector JSON Stylist",
  "active": true,
  "stats": {
    "views": 4200,
    "rating": 4.9
  },
  "tags": ["design", "svg", "tool"],
  "meta": null
}`;

export const useWorldStore = defineStore("world", () => {
	const jsonInput = ref(DEFAULT_JSON);
	const currentTheme = ref<SVGTheme>(THEMES.MinimalWhite);
	const copied = ref(false);
	const codeIsShowing = ref(false);

	const showCode = () => {
		codeIsShowing.value = true;
	};
	const hideCode = () => {
		codeIsShowing.value = false;
	};

	const setTheme = (newTheme: SVGTheme) => {
		currentTheme.value = newTheme;
	};
	const updateThemeField = (field: keyof SVGTheme, value: unknown) => {
		currentTheme.value = { ...currentTheme.value, [field]: value };
	};

	const svgOutput = computed(() => {
		try {
			return generateJSONSVG(jsonInput.value, currentTheme.value);
		} catch (e) {
			console.error(e);
			return "";
		}
	});

	const isValid = computed(() => {
		return svgOutput.value !== "";
	});

	const handleCopy = () => {
		navigator.clipboard.writeText(svgOutput.value);
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	};

	const handleDownload = () => {
		const blob = new Blob([svgOutput.value], { type: "image/svg+xml" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "styled-json.svg";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return {
		jsonInput,
		currentTheme,
		setTheme,
		updateThemeField,
		copied,
		codeIsShowing,
		showCode,
		hideCode,
		svgOutput,
		isValid,
		handleCopy,
		handleDownload,
	};
});
