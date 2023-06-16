<script lang="ts">
  import { Link, Router, Route } from "svelte-routing";
  import Counter from "./lib/Counter.svelte";
  import Home from "./routes/Home.svelte";
  import Overview from "./routes/Overview.svelte";

  export let url = "/";
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/overview">Overview</Link>
    </nav>
    <div>
      <Route path="/home" component={Home} />
      <Route path="/overview" component={Overview} />
    </div>
  </Router>
</main>
