<template>

    <div v-if="visible" :class="{ 'visible' : visible }" class="error-modal">
<p>{{ message }}</p>

    </div>

</template>

<script lang="ts" setup>

      import { onMounted, ref } from 'vue';

    const visible = ref(false)
    const message = ref('')
    const type = ref('')
    



  



</script>

<style scoped>

.error-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}






</style>