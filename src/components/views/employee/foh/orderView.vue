<script setup lang="ts">
import EmployeeUiSearchAndFilterBar from '@/components/ui/employee/UiSearchAndFilterBar.vue'
import EmployeeUiWorkspaceStateNavbar from '@/components/ui/employee/UiWorkspaceStateNavbar.vue'
import EmployeeUiWorkspaceStateOption from '@/components/ui/employee/UiWorkspaceStateOption.vue'
import EmployeeUiOrderDetailsNavbar from '@/components/ui/employee/UiOrderDetailsNavbar.vue'
</script>

<template>
  <div class="h-full grow">
    <EmployeeUiSearchAndFilterBar />
    <EmployeeUiWorkspaceStateNavbar />

    <div class="grid grid-cols-3 gap-6 p-6">
      <template v-for="index in 9" :key="index">
        <EmployeeUiWorkspaceStateOption />
      </template>
    </div>
  </div>
  <EmployeeUiOrderDetailsNavbar />
</template>
<style scoped></style>
