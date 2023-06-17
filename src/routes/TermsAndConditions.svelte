<script>
  import Account from "svelte-material-icons/account.svelte";
</script>

<main class="px-3">
  <div class="text-center">Terms and conditions</div>
  <h1>Terms and Conditions</h1>

  <div class="overflow-auto summary w-9/12">
    <section>
      <h2>Accuracy Disclaimer</h2>
      <p class="break-words inline-block">
        The app provides information about potential allergens in scanned food
        products based on the ingredients listed on the packaging or provided by
        the manufacturer. However, please note that the app's accuracy is
        dependent on the accuracy and completeness of the information provided.
        Users should be aware that the app cannot guarantee 100% accuracy in
        detecting all allergens or cross-contamination risks.
      </p>
    </section>

    <section>
      <h2>Double-Check Recommendation</h2>
      <p>
        Users should be advised to double-check the ingredients and allergen
        information on product packaging, especially if they have severe
        allergies or dietary restrictions. The app should emphasize that it
        serves as a tool to assist users in making informed decisions but does
        not replace the importance of personal verification.
      </p>
    </section>

    <section>
      <h2>Manufacturer's Responsibility</h2>
      <p>
        It should be made clear that the ultimate responsibility for ensuring
        the safety and suitability of food products lies with the manufacturers.
        Users should be encouraged to contact manufacturers directly for any
        specific allergen-related inquiries or concerns.
      </p>
    </section>

    <section>
      <h2>No Medical Advice</h2>
      <p>
        The app should clearly state that it does not provide medical advice or
        diagnosis. Users should be advised to consult with a healthcare
        professional or allergist for personalized advice regarding their
        allergies or dietary requirements.
      </p>
    </section>

    <section>
      <h2>Liability Limitation</h2>
      <p>
        To the extent permitted by applicable laws, the app includes a clause
        limiting its liability for any issues arising from the use of the app or
        reliance on the information provided. This clause states that the app
        developers or owners are not responsible for any direct or indirect
        damages, allergic reactions, or health issues resulting from the use of
        the app.
      </p>
    </section>
  </div>
  <div
    class="absolute bottom-5 w-44 p-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <a class="flex items-center justify-center gap-2" href="/profile">
      <span class="text-white drop-shadow-2xl shad">Go to Profile </span>
      <div
        class=""
        style="background-color: rgb(255, 178, 120); border-radius: 50%"
      >
        <Account size="1.8em" />
      </div>
    </a>
  </div>
</main>

<style>
  .summary {
    height: 500px;
  }
</style>
