import styled from "styled-components";
import { SortColumn } from "types/SortColumn";
import { User } from "types/User";

interface Props {
  users: User[];
  selectedUser: User | null;
  sortColumn: SortColumn;
  onSelectUser: (user: User) => void;
  onSort: (sortColumn: SortColumn) => void;
}

function UserTable({
  users,
  selectedUser,
  sortColumn,
  onSort,
  onSelectUser,
}: Props) {
  function raiseSort(path: string) {
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === `asc` ? `desc` : `asc`;
    } else {
      sortColumn.path = path;
      sortColumn.order = `asc`;
    }
    onSort({ ...sortColumn });
  }

  function renderSortIcon(path: string) {
    if (sortColumn.path === path)
      return sortColumn.order === `asc` ? (
        <i className="fa-solid fa-sort-down" />
      ) : (
        <i className="fa-solid fa-sort-up" />
      );

    return null;
  }

  return (
    <Table>
      <TableHeader>
        <span onClick={() => raiseSort(`name`)}>
          CONTACT{renderSortIcon(`name`)}
        </span>
        <span onClick={() => raiseSort(`email`)}>
          EMAIL{renderSortIcon(`email`)}
        </span>
        <span onClick={() => raiseSort(`phone`)}>
          PHONE{renderSortIcon(`phone`)}
        </span>
        <span onClick={() => raiseSort(`nationality`)}>
          NATIONALITY{renderSortIcon(`nationality`)}
        </span>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const isSelected = selectedUser === user ? "selected" : "";
          return (
            <TableRow key={user.id}>
              <span>
                <img src={user.thumbnail} />
                <a
                  href="#details"
                  className={isSelected}
                  onClick={() => onSelectUser(user)}
                >
                  {user.name}
                </a>
              </span>
              <span>{user.email}</span>
              <span>{user.phone}</span>
              <span>{user.nationality}</span>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default UserTable;

const Table = styled.div`
  width: 800px;
  height: 100%;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 500px) {
    width: 200px;
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 100px;
  padding-bottom: 8px;
  border-bottom: 2px solid #eee;
  font-weight: bold;

  & span {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

const TableBody = styled.div``;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 100px;
  padding: 16px 0;
  align-items: center;
  border-bottom: 1px solid #eee;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  & span {
    color: #777;
  }

  & > span:first-child {
    display: flex;
    align-items: center;
  }

  & img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 16px;
  }

  & a {
    text-decoration: underline;
    cursor: pointer;

    &.selected {
      font-weight: bold;
    }
  }
`;
