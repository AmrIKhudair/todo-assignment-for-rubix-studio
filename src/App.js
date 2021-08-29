
import { useState } from 'react'
import { Box, Button, CssBaseline, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import Todo from './Todo';
import TodoModal from './TodoModal';
import { LIST_TODOS } from './gql/queries';

const useStyles = makeStyles(theme => (
  {
    root: {
      backgroundColor: 'lightgrey',
      height: '100vh',
      padding: '1em'
    },
    
    fullHeight: {
      height: '100%'
    },

    todosWrapper: {
      backgroundColor: 'white',
      borderRadius: '1em',
      padding: '1em',
      margin: '1em 0',
      overflow: 'hidden'
    },

    todos: {
      height: '100%',
      overflow: 'auto',
      paddingRight: '1em'
    }
  }
));

export default function App () {
  const {loading, error, data, fetchMore} = useQuery(LIST_TODOS, { variables: { offset: 0, limit: 20 } });
  const [open, setOpen] = useState(false);
  const [todoId, setTodoId] = useState();
  const classes = useStyles();

  if (loading) return <Container>Loading...</Container>;
  if (error) {
    console.log(JSON.stringify(error))
    return <Container>Error: {error.message}</Container>;
  }

  return (
    <Box className={classes.root}>
      <Container className={classes.fullHeight}>
        <CssBaseline />
        <Grid container wrap='nowrap' direction='column' className={classes.fullHeight}>
          <Grid item>
            <Typography variant='h1' align='center'>TODO App</Typography>
          </Grid>
          <Grid item xs className={classes.todosWrapper}>
            <Grid
              container className={classes.todos}
              onScroll={({target: t}) => { if (t.scrollHeight - Math.round(t.scrollTop) === t.clientHeight) fetchMore({ variables: { offset: data.todos.length } }) }}
            >
              {data.todos.map(todo => <Todo todo={todo} onShow={id => { setTodoId(id); setOpen(true); }} key={todo.id} />)}
            </Grid>
          </Grid>
          <Grid item>
            <Button onClick={() => {setTodoId(); setOpen(true)}}>Create</Button>
          </Grid>
        </Grid>
        <TodoModal open={open} todo={data.todos.find(todo => todo.id === todoId)} onClose={() => setOpen(false)} key={Math.random()} />
      </Container>
    </Box>
  );
};
