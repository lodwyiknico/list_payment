const initialState = {
    Detail : []
}

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case 'DETAIL':
            return{
                ...state,
                Detail:[action.val]
            }
        default:
        return state
    }
}

export default appReducer