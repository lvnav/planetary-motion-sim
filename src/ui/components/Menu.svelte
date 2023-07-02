<script lang="ts">
  import { celestialObjectsStored } from "../store";
  import Coords from "./Coords.svelte";
</script>

<menu class="fixed">
  {#if $celestialObjectsStored != null}
    {#each $celestialObjectsStored as celestialObject}
      <li>
        {#await celestialObject}
          <div>Waiting</div>
        {:then celestialObject}
          {celestialObject.name}
          <Coords coords={celestialObject.getCelestialObjectModel().position} />
        {:catch error}
          error: {error}
        {/await}
      </li>
    {/each}
  {/if}
</menu>
