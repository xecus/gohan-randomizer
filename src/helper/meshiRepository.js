import FirebaseHelper from '@/helper/firebaseHelper'

const getMeshis = async () => {
  const path = `ryouri`
  return await FirebaseHelper.getDbRef(path).once('value').then((snapshot) => {
    return snapshot.val()
  })
}
const createMeshi = async (payload) => {
  const path = `ryouri`
  return await FirebaseHelper.getDbRef(path).push(payload)
}
const updateMeshi = async (id, payload) => {
  const path = `ryouri/${id}`
  return await FirebaseHelper.getDbRef(path).update(payload)
}
const deleteMeshi = async (id) => {
  const path = `ryouri/${id}`
  return await FirebaseHelper.getDbRef(path).set(null)
}

export default {
  getMeshis,
  createMeshi,
  updateMeshi,
  deleteMeshi
}
