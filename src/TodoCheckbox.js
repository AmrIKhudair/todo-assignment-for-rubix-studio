import { useMutation } from '@apollo/client';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import { UPDATE_TODO_COMPLETION } from './gql/mutations'
import { LIST_TODOS } from './gql/queries';

function TodoCheckbox({ todo }) {
    const [setCompletion, {loading, error, data}] = useMutation(UPDATE_TODO_COMPLETION, { variables: { id: todo.id }, refetchQueries: [ LIST_TODOS ] })

    if (error) window.alert(JSON.stringify(error));

    return (
        <TableCell padding="checkbox" disabled={loading}>
            <Checkbox checked={todo.is_completed} onClick={() => setCompletion({ variables: { value: !todo.is_completed } })} />
        </TableCell>
    )
}

export default TodoCheckbox