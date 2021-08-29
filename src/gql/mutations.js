import { gql, useMutation } from '@apollo/client';
import { LIST_TODOS } from './queries';

export const CREATE_TODO = gql`
    mutation CreateTodo($data: TodoCreateInput!) {
        createTodo(data: $data) {
            id
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo($id: ID!, $data: TodoUpdateInput!) {
        updateTodo(data: $data, where: {id: $id}) {
            id
        }
    }
`;

export const PUBLISH_TODO = gql`
    mutation PublishTodo($id: ID!) {
        publishTodo(where: {id: $id}) {
            id
        }
    }
`

export function useCompose(mutations) {
    const queue = []
    const data = {}
    let loading = false
    let error

    function useComposeMutation([mutation, options]) {
        const [mutate, state] = useMutation(mutation, options);
        queue.push(mutate);
        data[mutation] = state.data
        loading = loading || state.loading
        if (!error) error = state.error
    }

    mutations.forEach(useComposeMutation)

    const compose = options => {
        if (!queue.length) return
        const [first, ...rest] = queue;
        let promise = first(options)
        for (const mutate of rest) {
            promise = promise.then(r => mutate({ variables: Object.assign({}, ...Object.values(r.data)) }))
        }
        return promise
    } 
    
    return [compose, {data, loading, error}];
}

export function useTodoMutation(mutation, options) {
    return useCompose([
        [mutation, options],
        [PUBLISH_TODO, { refetchQueries: [LIST_TODOS] }]
    ])
}

export function useSaveTodoMutation(id) {
    return useTodoMutation(id ? UPDATE_TODO : CREATE_TODO, id ? { variables: { id } } : void 0)
}