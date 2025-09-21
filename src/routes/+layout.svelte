<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#667eea" />
</svelte:head>

<body>
	{@render children?.()}
</body>

<style>
	:global(html) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		line-height: 1.5;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		min-height: 100vh;
		color: #333;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(a) {
		color: #667eea;
		text-decoration: none;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	:global(button) {
		font-family: inherit;
	}

	:global(input, select, textarea) {
		font-family: inherit;
	}
</style>
