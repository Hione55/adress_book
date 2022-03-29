import { useParams } from "react-router-dom";
import styled from "styled-components";
import { User } from "types/User";

interface Props {
  user: User;
}

function UserDetails({ user }: Props) {
  if (!user) return null;

  return (
    <Container id="details">
      <ProfilePicture src={user.picture} />
      <Name>{user.name}</Name>
      <Phone>
        <div>
          <Icon className="fa-solid fa-phone" />
          <span>Phone</span>
        </div>
        <div>{user.phone}</div>
      </Phone>
      <Email>
        <div>
          <Icon className="fa-solid fa-envelope" />
          <span>Email</span>
        </div>
        <div>{user.email}</div>
      </Email>
    </Container>
  );
}

export default UserDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 240px;
  height: 100%;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
`;

const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Icon = styled.i`
  font-size: 16px;
  margin-right: 16px;
`;

const Phone = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 16px;

  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  & span {
    font-size: 14px;
    font-weight: bold;
  }
`;

const Email = styled(Phone)``;
