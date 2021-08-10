import { gql, useMutation } from '@apollo/client';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';

const SET_COMPLETION = gql`
    mutation SetTodoCompletion {
        updateTodo(data: {is_completed: $is_completed}, where: {id: $id}) {
            id
            is_completed
        }
    }
`

function TodoCheckbox({ todo }) {
    const [setCompletion, {loading, error, data}] = useMutation(SET_COMPLETION)

    if (error) window.alert(JSON.stringify(error));

    return (
        <TableCell padding="checkbox" disabled={loading}>
            <Checkbox checked={todo.is_completed} onClick={() => setCompletion({ variables: { id: todo.id, is_completed: !todo.is_completed } })} />
        </TableCell>
    )
}

export default TodoCheckbox