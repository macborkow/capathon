<script lang="ts">
  import { Link, Router, Route } from "svelte-routing";
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Home from "./routes/Home.svelte";
  import ProductDetail from "./routes/ProductDetail.svelte";
  import Overview from "./routes/Overview.svelte";

  export let url = "/";
</script>

<main>

  <Router {url}>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/productdetail">Productdetail</Link>
      <Link to="/overview">Overview</Link>
    </nav>
    <div>
      <Route path="/home" component={Home} />
      <Route path="/productdetail" component={ProductDetail} />
      <Route path="/overview" component={Overview} />
    </div>
  </Router>
</main>
