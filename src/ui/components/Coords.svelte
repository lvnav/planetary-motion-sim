<script lang="ts">
  import { findHypotenuse, mToAu } from "../../helpers/math";
  import type { Coords } from "../../interfaces/coords";
  import { distanceDivider } from "../store";

  export let coords: Coords;
</script>

<div class="flex gap-2">
  <div>
    {mToAu(
      findHypotenuse(coords.x * $distanceDivider, coords.z * $distanceDivider)
    ).toPrecision(2)} AU
  </div>
</div>
