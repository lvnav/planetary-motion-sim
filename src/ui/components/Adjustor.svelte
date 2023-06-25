<script lang="ts">
  import { distanceDivider, scaleFactor } from "../store";

  const onDistanceDividerChange = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("target isn't an input");
    }

    const newValue = parseInt(event.target.value);

    distanceDivider.set(
      isNaN(newValue) || newValue === 0 || event.target.value === ""
        ? 1
        : newValue
    );
  };

  const onScaleFactorChange = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("target isn't an input");
    }

    const newValue = parseInt(event.target.value);

    scaleFactor.set(
      isNaN(newValue) || newValue === 0 || event.target.value === ""
        ? 1
        : newValue
    );
  };
</script>

<menu class="fixed bottom-0 right-0 flex flex-col gap-1">
  <div>
    <label class="flex">
      Distance divider:
      <input
        class="flex-1"
        bind:value={$distanceDivider}
        on:input={onDistanceDividerChange}
      />
    </label>
  </div>
  <div>
    <label class="flex">
      Scale Factor:
      <input
        class="flex-1"
        bind:value={$scaleFactor}
        on:input={onScaleFactorChange}
      />
    </label>
  </div>
</menu>
