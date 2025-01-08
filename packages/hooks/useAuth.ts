import { onMounted, Ref, ref } from 'vue'

type AuthInfo = Record<string, boolean>

type UseAuth = (codeList: string[]) => {
  authInfoRef: Ref<AuthInfo>
}

const useAuth: UseAuth = codeList => {
  const authInfoRef = ref<AuthInfo>({})
  onMounted(async () => {
    const permission = new uni.$u.PermissionRequest()
    const { list = [] } = await permission.getFFunCodes(codeList)
    const res = list.reduce((obj, item) => {
      obj[item] = true
      return obj
    }, {})

    authInfoRef.value = res
  })

  return {
    authInfoRef
  }
}

export default useAuth
