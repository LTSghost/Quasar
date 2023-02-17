/*
export function someAction (context) {
}
*/
export function updateAccount(context, status) {
    context.commit('mutateAccount', status)
}