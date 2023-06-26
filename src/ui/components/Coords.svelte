<script lang="ts">
  import { findHypotenuse, mToAu } from "../../helpers/math";
  import type { Coords } from "../../interfaces/coords";

  export let coords: Coords;
</script>

<div class="flex gap-2">
  <div>{Math.fround(mToAu(findHypotenuse(coords.x, coords.z)))} AU</div>
</div>
