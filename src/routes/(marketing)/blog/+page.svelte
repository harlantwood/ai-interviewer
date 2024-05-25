<script lang="ts">
  import { sortedBlogPosts, blogInfo } from './posts'
</script>

<svelte:head>
  <title>{blogInfo.name}</title>
  <meta name="description" content="Our blog posts." />
</svelte:head>

<div class="py-8 lg:py-12 px-6 max-w-lg mx-auto">
  <div
    class="text-3xl lg:text-5xl font-medium text-primary flex gap-3 items-baseline text-center place-content-center"
  >
    <div
      class="text-center leading-relaxed font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
    >
      {blogInfo.name}
    </div>
  </div>
  <div class="text-lg text-center">A demo blog with sample content.</div>

  {#each sortedBlogPosts as post}
    <a href={post.link}>
      <div class="card my-6 bg-white shadow-xl flex-row overflow-hidden">
        <div class="flex-none w-6 md:w-32 bg-secondary"></div>
        <div class="py-6 px-6">
          <div class="text-xl">{post.title}</div>
          <div class="text-sm text-accent">
            {post.parsedDate?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div class="text-slate-500">{post.description}</div>
        </div>
      </div>
    </a>
  {/each}
</div>
