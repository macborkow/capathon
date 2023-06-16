<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Overview from "./routes/Overview.svelte";
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/overview" component={Overview} />
</Router>

<style>
  :global(body) {
    background: linear-gradient(to top, rgb(217, 47, 85), rgb(255, 178, 120));
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
