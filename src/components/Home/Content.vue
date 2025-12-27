<template>
  <div class="content-wrapper">
    <div class="content">
      <BlurReveal :delay="0.2" :duration="0.75" class="p-4">
        <h2 class="title-sub">Code with confidence, create with style</h2>

        <div class="flex-center">
          <h3 class="tagline">
            Code less, create more with
            <SparklesText
              text="Print Gallery"
              :colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
              :sparkles-count="8"
              class="sparkle-custom"
            />
          </h3>
        </div>

        <div class="button-group">
          <RainbowButton @click="router.push('/templates')"> Browse Templates </RainbowButton>
        </div>
      </BlurReveal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RainbowButton from '@/components/ui/rainbow-button/RainbowButton.vue'
import SparklesText from '@/components/ui/sparkles-text/SparklesText.vue'
import BlurReveal from '@/components/ui/blur-reveal/BlurReveal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.content-wrapper {
  position: relative;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* Changed: Remove min-h-screen to prevent double-scrolling */
  padding: 4rem 1rem;
  color: white;
  text-align: center;
}

.content {
  width: 100%;
  max-width: 800px;
}

.title-sub {
  /* Using clamp for responsive font size */
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.tagline {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-weight: 400;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
  margin-top: 1rem;
}

/* Reduced Sparkle Text Size */
:deep(.sparkle-custom) {
  display: inline-flex !important;
  font-size: clamp(1.4rem, 4vw, 1.9rem) !important;
  font-weight: 700 !important;
  margin: 0 !important;
  padding: 0 4px;
}

.button-group {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
}
</style>
