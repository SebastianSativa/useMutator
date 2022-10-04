const React = require('react')

const useMutator = (initialState) => {
    const [ state, dispatch ] = React.useReducer((state, mutator) => {
		const mutation = typeof mutator.mutation === 'function' ? mutator.mutation(state) : mutator.mutation
        return mutator.replace ? mutation : { ...state, ...mutation }
    }, { ...initialState })
    return {
        state,
        mutate: (mutation, replace) => dispatch({ mutation, replace })
    }
}

module.exports = useMutator