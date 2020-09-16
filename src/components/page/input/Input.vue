<template>
    <Notice />
</template>

<script>
import { collectTableURL} from '@/api/admin';
import Notice from './notice';
export default {
	components: {
		Notice
	},
    data() {
        return {
        };
    },
};
</script>
