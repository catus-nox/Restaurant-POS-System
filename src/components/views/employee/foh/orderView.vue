<script setup lang="ts">
import EmployeeUiSearchAndFilterBar from '@/components/ui/employee/UiSearchAndFilterBar.vue'
import EmployeeUiWorkspaceStateNavbar from '@/components/ui/employee/UiWorkspaceStateNavbar.vue'
import EmployeeUiWorkspaceStateOption from '@/components/ui/employee/UiWorkspaceStateOption.vue'
</script>

<template>
  <EmployeeUiSearchAndFilterBar />
  <EmployeeUiWorkspaceStateNavbar />

  <div class="grid grid-cols-3 gap-6 p-6">
    <template v-for="index in 9" :key="index">
      <EmployeeUiWorkspaceStateOption />
    </template>
  </div>
</template>
<style scoped></style>
