import { gql } from '@apollo/client';

export const LIST_TODOS = gql`
  query ListTodos($offset: Int, $limit: Int) {
    todos(skip: $offset, first: $limit) {
      id
      title
      description
      dueDate
      isCompleted
    }
  }
`;