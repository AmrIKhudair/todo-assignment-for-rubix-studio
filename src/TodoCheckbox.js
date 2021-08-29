import { useMutation } from '@apollo/client';
import Checkbox from '@material-ui/core/Checkbox';
import { useSaveTodoMutation } from './gql/mutations'

export default function TodoCheckbox({ todo }) {
    const [saveTodo, {loading, error}] = useSaveTodoMutation(todo.id)
    if (error) console.log(JSON.stringify(error));

    return (
        <Checkbox checked={todo.isCompleted} disabled={loading} onClick={e => saveTodo({ variables: { data: { isCompleted: e.target.checked } } })} />
    )
};