<template>
  <div
    class="relative w-full min-h-screen bg-black selection:bg-purple-500/30 text-white font-sans overflow-x-hidden"
  >
    <div class="fixed inset-0 z-0 pointer-events-none">
      <StarsBackground :factor="0.05" :speed="20" star-color="#ffffff" />
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] bg-purple-600/10 blur-[150px]"
      />
    </div>

    <header
      class="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5"
    >
      <div class="w-full px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <SparklesText
            text="Print Gallery"
            :colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
            :sparkles-count="8"
            class="sparkle-nav"
          />
        </div>

        <div class="flex-1 max-w-2xl relative group px-2">
          <GlowBorder
            class="opacity-30 group-focus-within:opacity-100 transition-opacity"
            :color="['#FF2D55', '#5856D6', '#007AFF', '#34C759']"
            :border-radius="12"
            :stroke-width="1"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search database..."
            class="relative w-full bg-zinc-900/80 text-white px-5 py-2.5 rounded-xl outline-none border border-white/10 transition-all placeholder:text-zinc-600 focus:border-purple-500/50"
          />
        </div>

        <div class="flex items-center gap-3">
          <RippleButton class="scale-90 origin-right">Login</RippleButton>
          <RainbowButton class="scale-90 origin-right">Upload</RainbowButton>
        </div>
      </div>
    </header>

    <main class="relative z-10 w-full pt-32 pb-12">
      <div v-if="loading" class="flex flex-col items-center justify-center py-40">
        <div
          class="w-12 h-12 border-2 border-white/5 border-t-purple-500 rounded-full animate-spin"
        ></div>
        <p class="mt-4 text-zinc-500 animate-pulse">Loading formats...</p>
      </div>

      <div
        v-else
        class="w-full px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
      >
        <div
          v-for="card in filteredCards"
          :key="card.id"
          class="group relative h-[580px] w-full transition-all duration-500 hover:-translate-y-2"
        >
          <GlowBorder
            class="transition-opacity duration-500 group-hover:opacity-100 opacity-20"
            :color="['#A07CFE', '#FE8FB5', '#FFBE7B', '#8EEDC7']"
            :border-radius="16"
            :stroke-width="2"
          />

          <div
            class="relative h-full w-full rounded-[16px] flex flex-col overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl"
          >
            <div class="relative w-full h-80 overflow-hidden bg-black border-b border-white/5">
              <img
                :src="`https://firstprintable.com/wp-content/uploads/2024/02/Modern-Blank-Invoice-Printable-Template-Purple-Editable-PDF.webp`"
                class="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                alt="Format Preview"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
              
              <div
                class="absolute top-4 right-4 z-20 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10"
              >
                {{ card.timeAgo }}
              </div>
            </div>

            <div class="flex-1 flex flex-col p-5 space-y-4">
              <div class="space-y-2">
                <span
                  class="text-[10px] font-black text-purple-400 border border-purple-500/20 bg-purple-500/5 px-2 py-0.5 rounded uppercase tracking-[0.2em]"
                >
                  {{ card.raw['Doctype '] || 'Sales Invoice' }}
                </span>
                <h3
                  class="text-xl font-bold text-white leading-tight group-hover:text-purple-300 transition-colors line-clamp-2"
                >
                  {{ card.title }}
                </h3>
              </div>

              <div class="flex items-center gap-2">
                <div
                  class="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-[10px] font-bold"
                >
                  {{ card.author.charAt(0) }}
                </div>
                <span class="text-sm text-zinc-400">by {{ card.author }}</span>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 mt-auto">
                <button
                  @click="copyText(card.raw.html, 'HTML')"
                  class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-orange-600/20 hover:border-orange-500/50 transition-all active:scale-95"
                >
                  <Code2Icon :size="16" />
                  <span class="text-xs font-bold uppercase tracking-wider">HTML</span>
                </button>

                <button
                  @click="copyText(card.raw.css, 'CSS')"
                  class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/50 transition-all active:scale-95"
                >
                  <FileCodeIcon :size="16" />
                  <span class="text-xs font-bold uppercase tracking-wider">CSS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { formatDistanceToNow } from 'date-fns'
import { Code2Icon, FileCodeIcon } from 'lucide-vue-next'
import GlowBorder from '@/components/ui/glow-border/GlowBorder.vue'
import { StarsBackground } from '@/components/ui/bg-stars'
import SparklesText from '@/components/ui/sparkles-text/SparklesText.vue'
import RippleButton from '@/components/ui/ripple-button/RippleButton.vue'
import RainbowButton from '@/components/ui/rainbow-button/RainbowButton.vue'

const cards = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')

const fetchFormats = async () => {
  try {
    loading.value = true
    const querySnapshot = await getDocs(collection(db, 'formats'))
    const mappedData = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      const seconds = data['Created On']?.seconds || data['Last Modified']?.seconds
      const dateObj = seconds ? new Date(seconds * 1000) : new Date()
      return {
        id: doc.id,
        title: data['Format Name'] || 'Untitled Format',
        author: data['Author'] || 'Admin',
        timestamp: dateObj,
        timeAgo: formatDistanceToNow(dateObj, { addSuffix: true }),
        raw: data,
      }
    })
    cards.value = mappedData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const filteredCards = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return cards.value.filter(
    (card) => card.title.toLowerCase().includes(q) || card.author.toLowerCase().includes(q),
  )
})

const copyText = async (text: string, type: string) => {
  if (!text) {
    alert(`No ${type} code available for this template.`)
    return
  }
  try {
    await navigator.clipboard.writeText(text)
    alert(`${type} copied to clipboard!`)
  } catch (err) {
    console.error('Failed to copy!', err)
  }
}

onMounted(fetchFormats)
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3f3f46;
}

:deep(.sparkle-nav) {
  display: inline-flex !important;
  font-size: 1.25rem !important;
  font-weight: 800 !important;
  margin: 0 !important;
  padding: 0 !important;
  letter-spacing: -0.025em;
}

img {
  -webkit-user-drag: none;
}
</style>