<script lang="ts">
  import type CelestialObject from "../../models/celestialObjects";
  import { celestialObjectsStored } from "../store";

  let celestialObjects: Promise<CelestialObject>[] = [];
  const unsubscribe = celestialObjectsStored.subscribe(
    async (celestialObjectsStored) => {
      celestialObjects = celestialObjectsStored;
    }
  );
</script>

<menu class="fixed">
  {#if celestialObjects != null}
    {#each celestialObjects as celestialObject}
      <li>
        {#await celestialObject}
          <div>Waiting</div>
        {:then celestialObject}
          {celestialObject.name}
          {celestialObject.distanceFromSun}
          {celestialObject.model[0].position.x}
        {:catch error}
          error: {error}
        {/await}
      </li>
    {/each}
  {/if}
</menu>
