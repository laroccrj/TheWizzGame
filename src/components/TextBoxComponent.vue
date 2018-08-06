<template>
	<div>
		<p>This is a text box:</p>
		<p>{{ msg }}</p>
		<spell-creator-node></spell-creator-node>
	</div>
</template>

<script>
export default {
  name: 'text-box-component',
  props: {msg: String}
}
</script>