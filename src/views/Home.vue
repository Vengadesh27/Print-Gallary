<template>


<Login @close="showLoginDialog = false" v-if="showLoginDialog" />


  <div
    class="fixed inset-0 w-full h-screen bg-black overflow-hidden selection:bg-purple-500/30 text-white"
  >
    <div class="absolute inset-0 z-0 pointer-events-none">
      <StarsBackground :factor="0.05" :speed="20" star-color="#ffffff" />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-purple-600/10 blur-[120px] md:blur-[150px]"
      />
    </div>

    <nav
      class="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-6 pointer-events-none"
    >
      <div class="pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity">
        <SparklesText
          text="Print Gallery"
          :colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
          :sparkles-count="15"
          class="sparkle-nav"
        />
      </div>

      <div class="flex items-center gap-4 pointer-events-auto">
        <button class="text-sm font-medium hover:text-purple-400 transition-colors" @click="showLoginDialog = true">Login</button>
        <RainbowButton class="scale-90 origin-right">Donate</RainbowButton>
      </div>
    </nav>

    <main
      class="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide flex flex-col"
    >
      <div class="flex-grow flex flex-col items-center justify-center pt-24">
        <div class="w-full max-w-7xl mx-auto px-6 md:px-12">
          <Content />
        </div>
      </div>

      <footer class="w-full py-4 mt-auto border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div
          class="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-white/40"
        >
          <p>© {{ new Date().getFullYear() }} Print Gallery. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>

    <FluidCursor class="z-50" />
  </div>
</template>

<script setup lang="ts">
import Content from '@/components/Home/Content.vue'
import { FluidCursor } from '@/components/ui/fluid-cursor'
import { StarsBackground } from '@/components/ui/bg-stars'
import RainbowButton from '@/components/ui/rainbow-button/RainbowButton.vue'
import SparklesText from '@/components/ui/sparkles-text/SparklesText.vue'

import Login from '@/views/Login.vue'

import { ref } from 'vue'

const showLoginDialog = ref(false)





</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Nav specific sparkle size */
:deep(.sparkle-nav) {
  display: inline-flex !important;
  font-size: 1.25rem !important;
  font-weight: 800 !important;
  margin: 0 !important;
  padding: 0 !important;
  letter-spacing: -0.025em;
}
</style>
