<script setup lang="ts">
import type { SVGTheme, ThemePreset } from "@/stores/world";
import { THEMES } from "@/stores/world";
import { useWorldStore } from "@/stores/world.ts";

const store = useWorldStore();

const themes = Object.keys(THEMES) as ThemePreset[];
</script>

<template>
<div class="bg-white p-6 border-l border-gray-200 min-h-full overflow-y-auto w-80 shrink-0 shadow-2xl">
  <h2 class="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Presets</h2>
  <div class="grid grid-cols-2 gap-2 mb-8">
    <button type="button" v-for="preset in themes" :key="preset" @click="store.setTheme(THEMES[preset])" :class="[
      'text-left px-3 py-2 rounded-lg transition-all text-xs font-bold flex flex-col gap-1 border',
      {
        'border-slate-200 bg-slate-50/50 text-slate-700': store.currentTheme === THEMES[preset],
        'border-gray-100 hover:bg-gray-50 text-gray-600': store.currentTheme !== THEMES[preset]
      }
    ]">
      <span v-text="preset"></span>
      <div class="w-full h-2 rounded-full opacity-50" :style="{ background: THEMES[preset].gradient }" />
    </button>
  </div>

  <h2 class="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Composition</h2>

  <div class="space-y-6">
    <div class="space-y-2">
      <div v-for="item in [
        { label: 'Hide Background', value: store.currentTheme.hideBackground, field: 'hideBackground' },
        { label: 'Show Rounding', value: store.currentTheme.showRounding, field: 'showRounding' },
        { label: 'Break Arrays', value: store.currentTheme.breakArrays, field: 'breakArrays' },
        { label: 'Line Numbers', value: store.currentTheme.showLineNumbers, field: 'showLineNumbers' }
      ]" :key="item.field" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <label class="text-xs font-bold text-gray-600 uppercase">{{ item.label }}</label>
        <button type="button" @click="store.updateThemeField(item.field as keyof SVGTheme, !item.value)" :class="[
          'relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
          item.value ? 'bg-slate-600' : 'bg-gray-200'
        ]">
          <span :class="[
            'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            item.value ? 'translate-x-5' : 'translate-x-0'
          ]" />
        </button>
      </div>
    </div>

    <div v-if="!store.currentTheme.hideBackground" class="p-3 bg-slate-50/30 rounded-lg border border-slate-100">
      <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Background</label>
      <div class="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-md border border-gray-100">
        <input type="color" :value="store.currentTheme.background"
          @input="(e) => store.updateThemeField('background', (e.target as HTMLInputElement).value)"
          class="w-6 h-6 rounded border-none cursor-pointer bg-transparent" />
        <input type="text" :value="store.currentTheme.background"
          @input="(e) => store.updateThemeField('background', (e.target as HTMLInputElement).value)"
          class="flex-1 text-[10px] mono uppercase bg-transparent outline-none w-16" />
      </div>
    </div>

    <h2 class="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] pt-2">Syntax Colors</h2>
    <div class="grid grid-cols-2 gap-x-3 gap-y-4">
      <div v-for="color in [
        { label: 'Keys', field: 'keyColor' },
        { label: 'Strings', field: 'stringColor' },
        { label: 'Quotes', field: 'quoteColor' },
        { label: 'Brackets', field: 'bracketColor' },
        { label: 'Numbers', field: 'numberColor' },
        { label: 'Booleans', field: 'booleanColor' },
        ...(store.currentTheme.showLineNumbers ? [{ label: 'Line Nums', field: 'lineNumberColor' }] : [])
      ]" :key="color.field">
        <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider"
          v-text="color.label"></label>
        <div class="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-md border border-gray-100">
          <input type="color" :value="store.currentTheme[color.field as keyof SVGTheme]"
            @input="(e) => store.updateThemeField(color.field as keyof SVGTheme, (e.target as HTMLInputElement).value)"
            class="w-6 h-6 rounded border-none cursor-pointer bg-transparent" />
          <input type="text" :value="store.currentTheme[color.field as keyof SVGTheme]"
            @input="(e) => store.updateThemeField(color.field as keyof SVGTheme, (e.target as HTMLInputElement).value)"
            class="flex-1 text-[10px] mono uppercase bg-transparent outline-none w-16" />
        </div>
      </div>
    </div>

    <h2 class="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] pt-2">Sizing</h2>
    <div class="space-y-4">
      <div>
        <label class="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Font Size</label>
        <input type="range" min="10" max="32" :value="store.currentTheme.fontSize"
          @input="(e) => store.updateThemeField('fontSize', parseInt((e.target as HTMLInputElement).value))"
          class="w-full accent-slate-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer" />
        <div class="text-right text-[10px] font-black text-gray-400 mt-1 uppercase">
          <span v-text="`${store.currentTheme.fontSize}px`"></span>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Padding</label>
        <input type="range" min="0" max="120" :value="store.currentTheme.padding"
          @input="(e) => store.updateThemeField('padding', parseInt((e.target as HTMLInputElement).value))"
          class="w-full accent-slate-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer" />
        <div class="text-right text-[10px] font-black text-gray-400 mt-1 uppercase">
          <span v-text="`${store.currentTheme.padding}px`"></span>
        </div>
      </div>

      <div v-if="store.currentTheme.showRounding">
        <label class="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Corner Radius</label>
        <input type="range" min="0" max="40" :value="store.currentTheme.borderRadius"
          @input="(e) => store.updateThemeField('borderRadius', parseInt((e.target as HTMLInputElement).value))"
          class="w-full accent-slate-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer" />
        <div class="text-right text-[10px] font-black text-gray-400 mt-1 uppercase">
          <span v-text="`${store.currentTheme.borderRadius}px`"></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>