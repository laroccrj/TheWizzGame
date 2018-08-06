<template>
	<div>
		<div>This is a test</div>
		<text-box-component msg='lol'></text-box-component>
	</div>
</template>

<script>

	import TextBoxComponent from '@/components/TextBoxComponent'
	export default {
	  name: 'MyComponent',
	  data () {
	    return {
	      msg: 'Welcome to Your Vue.js App RAHB'
	    }
	  },
	  components: {
	  	TextBoxComponent
	  }
	}

</script>