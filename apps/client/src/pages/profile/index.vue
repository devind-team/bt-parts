<script setup lang="ts">
const localePath = useLocalePath()
const router = useRouter()

router.push(localePath({ name: 'profile-me' }))
</script>