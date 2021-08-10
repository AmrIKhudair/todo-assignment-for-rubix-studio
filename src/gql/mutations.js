import { gql } from '@apollo/client';

export const UPDATE_TODO_COMPLETION = gql`
    mutation UpdateDataCompletion($id: ID, $value: Boolean) {
        updateTodo(data: {is_completed: $value}, where: {id: $id}) {
            id
        }

        publishTodo(where: {id: $id}) {
            id
        }
    }
`