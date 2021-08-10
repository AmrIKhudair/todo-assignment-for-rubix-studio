
import { Box, CssBaseline, Container, Table, TableBody } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import Todo from './Todo';

const TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      dueDate
      is_completed
    }
  }
`;

function App() {
  const {loading, error, data} = useQuery(TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

  return (
    <Container>
      <CssBaseline />
      <Table>
        <TableBody>
          {data.todos.map(todo => <Todo todo={todo} />)}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
