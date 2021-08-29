import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Modal, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSaveTodoMutation } from './gql/mutations';

const useStyles = makeStyles(theme => (
  {
    modalBody: {
      position: 'absolute',
      minWidth: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '1em',
      borderRadius: '1em',
    },
    
    wrapper: {
        padding: '1em',
    }
  }
));

export default function TodoModal({ open, todo, onClose }) {
    const [saveTodo, { loading: saving, error }] = useSaveTodoMutation(todo?.id)
    const [title, setTitle] = useState(todo?.title ?? '');
    const [description, setDescription] = useState(todo?.description ?? '');
    const [dueDate, setDueDate] = useState(todo?.dueDate ?? void 0);
    const [isCompleted, setIsCompleted] = useState(todo?.isCompleted ?? false);
    const classes = useStyles();


    if (error) {
        console.log(JSON.stringify(error));
        return <Paper className={classes.modalBody}><Typography align="center">Error: {error.message}</Typography></Paper>;
    };

    const close = () => onClose instanceof Function ? onClose() : void 0;
 
    return ( 
        <Modal open={open} onClose={close}>
            <Paper className={classes.modalBody}>
                <form onSubmit={e => {e.preventDefault(); saveTodo({ variables: { data: { title, description, dueDate, isCompleted } } }).then(close)}}>
                    <Box className={classes.wrapper}>
                        <TextField label='Title' value={title} disabled={saving} fullWidth onChange={e => setTitle(e.target.value)} required autoFocus/>
                    </Box>
                    <Box className={classes.wrapper}>
                        <TextField label='Description' value={description} disabled={saving} fullWidth multiline onChange={e => setDescription(e.target.value)} />
                    </Box>
                    <Box className={classes.wrapper}>
                        <TextField
                            label='Due Date' value={dueDate} disabled={saving} type='date' fullWidth
                            InputLabelProps={{ shrink: true }} onChange={e => setDueDate(e.target.value || void 0)} />
                    </Box>
                    <Box className={classes.wrapper}>
                        <FormControlLabel
                            control={<Checkbox checked={isCompleted} disabled={saving} onClick={e => setIsCompleted(e.target.checked)} />}
                            label="Completed?"
                        />
                    </Box>
                    <Box className={classes.wrapper} textAlign="right">
                        <Button variant='contained' color='primary' disabled={saving} type="submit">Save</Button>
                    </Box>
                </form>
            </Paper>
        </Modal>
    );
};