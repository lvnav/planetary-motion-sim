<script lang="ts">
  import { findHypotenuse, mToAu, radToDeg } from "../../helpers/math";
  import { celestialObjectsStored, distanceDivider } from "../store";
</script>

<menu class="fixed">
  {#if $celestialObjectsStored != null}
    {#each $celestialObjectsStored as celestialObject}
      <li>
        {#await celestialObject}
          <div>Waiting</div>
        {:then celestialObject}
          {#if celestialObject.name !== "sun"}
            <span>
              {celestialObject.name}
            </span>
            <div class="flex flex-col">
              <span>
                Distance from sun: {mToAu(
                  findHypotenuse(
                    celestialObject.model[0].position.x * $distanceDivider,
                    celestialObject.model[0].position.z * $distanceDivider
                  )
                ).toPrecision(2)} AU
              </span>
              <span>
                Angular Speed: {radToDeg(
                  celestialObject.angularSpeed
                ).toPrecision(2)} deg/sec</span
              >
              <span>
                Linear Speed: {celestialObject.linearSpeed.toPrecision(2)} m/sec
              </span>
            </div>
          {/if}
        {:catch error}
          error: {error}
        {/await}
      </li>
    {/each}
  {/if}
</menu>
