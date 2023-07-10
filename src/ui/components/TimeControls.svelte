<script lang="ts">
  import { simTime, timeStep } from "../store";

  let pausedTimeStep = null;
</script>

<menu class="fixed top-0 right-0 flex flex-col">
  <div>
    <button
      on:click={() => {
        timeStep.set(-1 * 5);
      }}
    >
      &lt;&lt;
    </button>
    <button
      on:click={() => {
        timeStep.set(-1 * 2);
      }}
    >
      &lt;
    </button>
    <button
      on:click={() => {
        timeStep.set(pausedTimeStep !== null ? pausedTimeStep : 1);
      }}>play</button
    >
    <button
      on:click={() => {
        pausedTimeStep = $timeStep;
        timeStep.set(0);
      }}
    >
      pause
    </button>
    <button
      on:click={() => {
        simTime.set(0);
        timeStep.set(1);
      }}
    >
      reset
    </button>
    <button
      on:click={() => {
        timeStep.set(1 * 2);
      }}
    >
      &gt;
    </button>
    <button
      on:click={() => {
        timeStep.set(1 * 5);
      }}
    >
      &gt;&gt;
    </button>
  </div>
  <div>simTime: {$simTime.toFixed(2)}</div>
</menu>
