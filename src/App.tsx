import { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { getUsers } from "services/userService";
import { User } from "types/User";
import UsersTable from "components/UsersTable";
import SearchBox from "components/common/SearchBox";
import UserDetails from "components/UserDetails";
import { SortColumn } from "types/SortColumn";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "name",
    order: "asc",
  });

  function mapToViewModel(item: any): User {
    return {
      id: item.login.uuid,
      name: `${item.name.first} ${item.name.last}`,
      email: item.email,
      nationality: item.nat,
      phone: item.cell,
      picture: item.picture.large,
      thumbnail: item.picture.thumbnail,
    };
  }

  useEffect(() => {
    async function loadUsers() {
      const { data } = await getUsers();
      const users: User[] = data.results.map(mapToViewModel);
      setUsers(users);
    }

    loadUsers();
  }, []);

  const filterdUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = _.orderBy(
    filterdUsers,
    [sortColumn.path],
    [sortColumn.order]
  );

  return (
    <Container>
      <SearchBox value={searchQuery} onChange={setSearchQuery} />
      <Users>
        <UsersTable
          sortColumn={sortColumn}
          onSort={setSortColumn}
          users={sortedUsers}
          onSelectUser={setSelectedUser}
          selectedUser={selectedUser}
        />
        {selectedUser && <UserDetails user={selectedUser} />}
      </Users>
    </Container>
  );
}

export default App;

const Container = styled.div`
  padding: 24px;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Users = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-item: center;
  }
`;
