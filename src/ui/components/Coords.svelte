<script lang="ts">
  import type { Coords } from "../../interfaces/coords";

  export let coords: Coords;
</script>

<div class="flex gap-2">
  <div>x: {coords.x.toFixed(2)}</div>
  <div>y: {coords.y.toFixed(2)}</div>
  <div>z: {coords.z.toFixed(2)}</div>
</div>
