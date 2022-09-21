const useReducer = require('react').useReducer

const useMutator = (initialState) => {
    const [ state, dispatch ] = useReducer((state, mutator) => {
        return mutator.replace ? mutator.mutation : { ...state, ...mutator.mutation }
    }, initialState)
    return {
        state,
        mutate: (mutation, replace) => dispatch({ mutation, replace })
    }
}

module.exports = useMutator