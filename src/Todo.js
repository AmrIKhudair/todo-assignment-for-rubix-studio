
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TodoCheckbox from './TodoCheckbox';

function Todo({ todo }) {
    
    return (
        <TableRow>
            <TodoCheckbox todo={todo} />
            <TableCell align="left">
                {todo.title}
            </TableCell>
            <TableCell align="right">
                {todo.dueDate}
            </TableCell>
        </TableRow>
    );
}

export default Todo;