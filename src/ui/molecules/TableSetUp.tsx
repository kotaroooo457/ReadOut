import styled from "styled-components";

const TableSetUp = styled.div`
  padding: 20px 70px;
  margin: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  @media (max-width: 420px) {
    padding: 20px 10px;
    margin: 0;
  }
`;

const TableTagSetUp = styled.div`
  position: fixed;
  bottom: 10%;
  right: 15%;
  @media (max-width: 420px) {
    top: 22%;
    right: 9%;
  }
`;

export { TableSetUp, TableTagSetUp };
