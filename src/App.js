
import { CssBaseline, Container, Table, TableBody, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import Todo from './Todo';
import { LIST_TODOS } from './gql/queries';

function App() {
  const {loading, error, data, fetchMore} = useQuery(LIST_TODOS, { variables: { offset: 0, limit: 20 } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

  return (
    <Container>
      <CssBaseline />
      <Typography variant='h1' align='center'>TODO App</Typography>
      <Table>
        <TableBody>
          {data.todos.map(todo => <Todo todo={todo} />)}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
