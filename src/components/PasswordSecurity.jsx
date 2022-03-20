import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 80%;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const Heading = styled.h5`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 2rem 2rem;
`;

const AccountContainer = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 1rem 2rem;
  background-color: antiquewhite;
`;

const Title = styled.h5`
  border-bottom: 1px solid grey;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Group = styled.div`
  padding: 1rem;
`;

const LabelName = styled.p`
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  width: 50%;
  padding: 1rem;
`;

const InputText = styled.textarea`
  padding: 1rem;
`;

const FirstContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UpdateButton = styled.button`
  border: none;
  border-radius: 160px;
  background-color: #14a800;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 0.5rem auto 1.5rem auto;
  font-size: 15px;
  width: 160px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  border: 1px solid lightgrey;
  border-radius: 160px;
  background-color: #fff;
  color: #14a800;
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 0.5rem auto 1.5rem auto;
  font-size: 15px;
  width: 160px;
  cursor: pointer;
`;

const PasswordSecurity = () => {
  return (
    <>
      <Container>
        <Heading>Password Setting</Heading>
        <AccountContainer>
          <Title>Change Password</Title>
          <Data>
            <Group>
              <LabelName>Old Password</LabelName>
              <InputField type="password" value="" />
            </Group>
            <Group>
              <LabelName>New Password</LabelName>
              <InputField type="password" value="" />
            </Group>
            <Group>
              <LabelName>Confirm New Password</LabelName>
              <InputField type="password" value="" />
            </Group>
            <FirstContainer>
              <UpdateButton>Update</UpdateButton>
              <CancelButton>Cancel</CancelButton>
            </FirstContainer>
          </Data>
        </AccountContainer>
      </Container>
    </>
  );
};

export default PasswordSecurity;
