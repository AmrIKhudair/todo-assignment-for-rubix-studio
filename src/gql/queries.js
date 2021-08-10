import { gql } from '@apollo/client';

export const LIST_TODOS = gql`
  query ListTodos {
    todos {
      id
      title
      dueDate
      is_completed
    }
  }
`;