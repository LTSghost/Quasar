/*
export function someMutation (state) {
}
*/
export function mutateAccount(state, status){
    state.account = status;
}
export function mutatePassword(state, status){
    state.password = status
}
export function mutateSchool(state, status){
    state.school = status
}
export function mutateGradDate(state, status){
    state.gradDate = status
}
export function mutateAge(state, status){
    state.age = status
}
export function mutateEmail(state, status){
    state.email = status
}
export function mutateMobile(state, status){
    state.mobile = status
}
