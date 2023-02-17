/*
export function someAction (context) {
}
*/
export function updateAccount(context, payload) {
    context.commit('mutateAccount', payload.account)
}