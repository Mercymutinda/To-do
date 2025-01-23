<script>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
<div>
  <RouterView/>
</div>

</template>


<style scoped>
/* Prevent overlapping */
.text-truncate {
  max-width: calc(100% - 160px);
  /* Adjust based on button sizes */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
