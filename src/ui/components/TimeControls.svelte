<script lang="ts">
  import { sinPeriod } from "../../helpers/math";
  import { simTime, timeStep } from "../store";

  let pausedTimeStep = null;
</script>

<menu class="fixed top-0 right-0 flex flex-col">
  <div>
    <button
      on:click={() => {
        timeStep.set(-sinPeriod() * 5);
      }}
    >
      &lt;&lt;
    </button>
    <button
      on:click={() => {
        timeStep.set(-sinPeriod() * 2);
      }}
    >
      &lt;
    </button>
    <button
      on:click={() => {
        timeStep.set(pausedTimeStep !== null ? pausedTimeStep : sinPeriod());
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
        timeStep.set(sinPeriod());
      }}
    >
      reset
    </button>
    <button
      on:click={() => {
        timeStep.set(sinPeriod() * 2);
      }}
    >
      &gt;
    </button>
    <button
      on:click={() => {
        timeStep.set(sinPeriod() * 5);
      }}
    >
      &gt;&gt;
    </button>
  </div>
  <div>simTime: {$simTime.toFixed(2)}</div>
</menu>
