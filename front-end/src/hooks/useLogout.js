import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
export default function useLogout() {
  const router = useRouter()
  function logout() {
    router.replace('/login')
    sessionStorage.removeItem('fromPath')
    localStorage.clear('roleId')
    Cookies.remove('token')
  }
  return logout
}