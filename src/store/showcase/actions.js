/*
export function someAction (context) {
}
*/

// login
export function updateUser(context, status) {
    context.commit('mutateUser', status)
}
export function updateUserName(context, status) {
    context.commit('mutateUserName', status)
}

// prac1
export function updateAccount(context, status) {
    context.commit('mutateAccount', status)
}
export function updatePassword(context, status) {
    context.commit('mutatePassword', status)
}
export function updateSchool(context, status) {
    context.commit('mutateSchool', status)
}
export function updateGradDate(context, status) {
    context.commit('mutateGradDate', status)
}
export function updatAge(context, status) {
    context.commit('mutateAge', status)
}
export function updatEmail(context, status) {
    context.commit('mutateEmail', status)
}
export function updatMobile(context, status) {
    context.commit('mutateMobile', status)
}

