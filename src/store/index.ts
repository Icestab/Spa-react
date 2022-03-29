export default function State() {
  const token = sessionStorage.getItem('token')
  return token
}
