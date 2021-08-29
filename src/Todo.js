
import Grid from '@material-ui/core/Grid';
import TodoCheckbox from './TodoCheckbox';

export default function Todo({ todo, onShow }) {
    
    return (
        <Grid container item style={{alignItems: 'center'}}>
            <Grid item>
                <TodoCheckbox todo={todo} />
            </Grid>
            <Grid item xs onClick={() => onShow(todo.id)}>
                {todo.title}
            </Grid>
            <Grid item align="right">
                {todo.dueDate}
            </Grid>
        </Grid>
    );
};