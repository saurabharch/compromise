// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

//combine them with .topics() method
const find = function (n) {
  let r = this.clauses()
  // Find people, places, and organizations
  let m = r.people()
  m = m.concat(r.places())
  m = m.concat(r.organizations())
  let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father']
  m = m.not(ignore)
  //return them to normal ordering
  m.sort('sequence')
  // yup.unique() //? not sure
  m = getNth(m, n)
  return m
}

const api = function (View) {
  View.prototype.topics = find
  // aliases
  View.prototype.entities = find
}
export default api