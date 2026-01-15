<script setup lang="ts">
import ControlPanel from "@/components/ControlPanel.vue";
import { useWorldStore } from "@/stores/world.ts";

const store = useWorldStore();
</script>

<template>
<header class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between z-10 shrink-0 shadow-sm">
  <div class="flex items-center gap-3">
    <div
      class="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-slate-200 shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </div>
    <div>
      <h1 class="text-xl font-bold tracking-tight text-gray-900 leading-none mb-1">JSON<span
          class="text-slate-600">2</span>SVG</h1>
      <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Vector Code Stylist</p>
    </div>
  </div>

  <div class="flex items-center gap-3">
    <button type="button" @click="store.showCode"
      class="px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 border bg-white text-gray-700 border-gray-200 hover:border-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
      View Code
    </button>
    <button type="button" @click="store.handleCopy" :class="['px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 border border-gray-200 hover:border-gray-300', {
      'bg-green-50 text-green-700 border-green-200': store.copied,
      'bg-white text-gray-700 ': !store.copied
    }]">
      <div class="flex gap-2" v-if="store.copied">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Copied
      </div>
      <div class="flex gap-2" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        Copy SVG
      </div>
    </button>
    <button type="button" :disabled="!store.isValid" @click="store.handleDownload"
      class="bg-slate-600 hover:bg-slate-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all shadow-md flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export .svg
    </button>
  </div>
</header>

<main class="flex-1 flex items-stretch overflow-hidden min-h-full">
  <div class="w-1/3 flex flex-col border-r border-gray-200 bg-white shadow-inner">
    <div class="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
      <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Input JSON</span>
      <span v-if="!store.isValid"
        class="text-red-500 text-[10px] font-bold uppercase px-2 py-0.5 bg-red-50 rounded">Invalid
        Syntax</span>
    </div>
    <textarea v-model="store.jsonInput" name="editor" :spellCheck="false"
      :class="['flex-1 p-6 mono text-sm outline-none resize-none bg-white text-gray-800 transition-colors', { 'bg-red-50/30': !store.isValid }]"
      placeholder="Paste your JSON here..." />
  </div>

  <div class="flex-1 p-8 lg:p-12 flex flex-col items-center justify-center relative bg-gray-100/50">
    <div class="w-full h-full max-w-5xl flex flex-col items-center justify-center">
      <div v-if="store.isValid"
        class="w-full max-h-full flex items-center justify-center animate-fade-in drop-shadow-2xl"
        v-html="store.svgOutput" />
      <div v-else class="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 text-center shadow-sm">
        <div class="text-gray-300 text-6xl mb-4 font-black">?</div>
        <h3 class="text-xl font-bold text-gray-600">Waiting for valid JSON</h3>
        <p class="text-gray-400 text-sm mt-2">Check for missing brackets or commas</p>
      </div>
    </div>

    <div
      class="absolute bottom-8 text-center text-gray-400 text-[11px] font-semibold uppercase tracking-widest bg-white/80 backdrop-blur px-4 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
      Live SVG Preview • Resolution Independent
    </div>
  </div>

  <ControlPanel />
</main>

<div v-if="store.codeIsShowing"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-8 transition-all">
  <div
    class="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[85vh] overflow-hidden animate-fade-in border border-white/20">
    <div class="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
      <div>
        <h3 class="text-lg font-bold text-gray-900 leading-none">SVG Source</h3>
        <p class="text-xs text-gray-500 mt-1">Direct XML output for embedding</p>
      </div>
      <button type="button" @click="store.hideCode" class="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent
          hover:border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex-1 overflow-auto p-8 bg-white">
      <pre
        class="text-xs mono text-gray-600 whitespace-pre-wrap break-all leading-relaxed bg-gray-50 p-8 rounded-2xl border border-gray-100 select-all"
        v-text="store.svgOutput"></pre>
    </div>
    <div class="p-6 border-t border-gray-100 flex justify-end shrink-0 bg-gray-50/50 gap-3">
      <button type="button" @click="store.hideCode"
        class="px-6 py-2 rounded-xl font-bold text-sm text-gray-500 hover:text-gray-700 transition-all">
        Close
      </button>
      <button type="button" @click="store.handleCopy"
        class="bg-slate-600 hover:bg-slate-700 text-white px-8 py-2 rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-100">
        <span v-if="store.copied">Copied XML!</span>
        <span v-else>Copy Source</span>
      </button>
    </div>
  </div>
</div>
</template>