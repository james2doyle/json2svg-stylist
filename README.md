# json2svg-stylist

An application that converts JSON input into beautifully styled SVG output with customizable syntax highlighting themes.

## Features

- **JSON to SVG Conversion** - Transform any valid JSON into a styled SVG image
- **Multiple Theme Presets** - Choose from built-in themes including:
  - Minimal White
  - Dracula
  - One Dark
  - Monokai
  - Solarized Dark
  - Nord
  - GitHub Dark
- **Customizable Styling** - Fine-tune fonts, colors, spacing, and dimensions
- **Live Preview** - See changes in real-time as you edit
- **Copy & Download** - Export your SVG for use anywhere

## Demo

Visit the live demo: [json2svg-stylist](https://james2doyle.github.io/json2svg-stylist/)

## Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Strict type checking
- **Vite 7** - Fast development and build
- **Pinia** - State management
- **Tailwind CSS v4** - Utility-first styling
- **Vitest** - Unit testing

## Getting Started

### Prerequisites

- Node.js 22.18.0+ (see `.nvmrc`)

### Installation

```sh
nvm use
npm install
```

### Development

Start the development server with hot reload:

```sh
npm run dev
```

### Build

Type-check and build for production:

```sh
npm run build
```

The production build outputs to the `docs/` directory for GitHub Pages deployment.

### Testing

Run unit tests:

```sh
npm run test:unit
```

### Formatting

Format code with Biome:

```sh
npm run format
```

## Project Structure

```
src/
├── main.ts              # Application entry point
├── App.vue              # Root component
├── assets/
│   └── main.css         # Global styles (Tailwind CSS v4)
├── components/
│   ├── ControlPanel.vue # Theme and style controls
│   ├── JSONInput.vue    # JSON editor
│   └── SVGPreview.vue   # Live SVG preview
├── stores/
│   └── world.ts         # Pinia store (themes, settings)
└── utils/
    └── svgGenerator.ts  # Core SVG generation logic
```

## License

MIT
