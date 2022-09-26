const useReducer = require('react').useReducer

const useMutator = (initialState) => {
    const [ state, dispatch ] = useReducer((state, mutator) => {
		const mutation = typeof mutator.mutation === 'function' ? mutator.mutation(state) : mutator.mutation
        return mutator.replace ? mutation : { ...state, ...mutation }
    }, initialState)
    return {
        state,
        mutate: (mutation, replace) => dispatch({ mutation, replace })
    }
}

module.exports = useMutator