<template>
  <n-message-provider>
    <n-notification-provider>
      <n-dialog-provider>
        <n-loading-bar-provider>
          <router-view />
        </n-loading-bar-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import {
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NLoadingBarProvider,
} from 'naive-ui'
</script>

<style>
body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
</style>
