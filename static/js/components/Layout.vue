<template>
  <inertia-head>
    <title head-key="title">Django + Inertia.js test app</title>
  </inertia-head>

  <main>
    <header>
      <ul>
        <li><inertia-link :href="$route('index')">Home</inertia-link></li>
        <li><inertia-link :href="$route('page1')">Page #1</inertia-link></li>
        <li><inertia-link :href="$route('page2')">Page #2</inertia-link></li>
        <li><inertia-link :href="$route('form')">Form</inertia-link></li>
      </ul>
    </header>

    <article>
      <slot />
    </article>
  </main>
</template>
