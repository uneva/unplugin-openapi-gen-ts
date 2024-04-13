<script setup lang="ts">
import type {LoginUserQueryParams} from "./interface";

const parmas:LoginUserQueryParams = {
    username: 'admin',
    password: '123456'
}
</script>

<template>
    <h1>unplugin openapi generate typescript to vite</h1>
    <p>{{parmas}}</p>
</template>

<style scoped></style>
