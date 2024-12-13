import { computed, inject, ref, watch } from 'vue'
const useFormFieldProps = (name, emits) => {
  const filterRef = inject('filterRef')
  const valueRef = computed(() => {
    return filterRef.value[name]
  })

  const change = value => {
    filterRef.value[name] = value
  }
  watch(
    () => valueRef.value,
    () => {
      filterRef.value[name] = valueRef.value
      emits('change', valueRef.value, filterRef)
      emits('fieldChange', valueRef.value)
    }
  )
  return {
    valueRef,
    change
  }
}
export default useFormFieldProps
