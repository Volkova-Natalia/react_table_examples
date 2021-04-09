import React from "react";
import styled from "styled-components/macro";
import Table from "./components/Table/Table";
import { ColumnInterface } from "./components/Table/Table";


const Styled = styled.div`
  background-color: rgba(57, 85, 236, 0.50);
  border-style: solid;
  border-color: black;
  width: 560px;
  height: 560px;
  border-width: 2px 2px 2px 2px;
  margin: 32px 32px 32px 32px;
  padding: 16px 16px 16px 16px;
`;


function App() {
  interface RowInterface {
    state: number,
    first_name: string,
    last_name: string,
  }

  const columns: Array<ColumnInterface> = React.useMemo(
    () => [
      {
        id: "state",
        Header: "",
        is_sortable: true,
        accessor: (row: RowInterface) => row.state,
      },
      {
        id: "first_name",
        Header: "First Name",
        is_sortable: true,
        accessor: (row: RowInterface) => row.first_name,
      },
      {
        id: "last_name",
        Header: "Last Name",
        is_sortable: true,
        accessor: (row: RowInterface) => row.last_name,
      },
      {
        id: "delete",
        Header: "",
        accessor: () => null,
      },
    ],
    [],
  );

  const data: Array<RowInterface> = [
    {
      state: 1,
      first_name: "Sophia",
      last_name: "Loren",
    },
    {
      state: 1,
      first_name: "Brigitte",
      last_name: "Bardot",
    },
    {
      state: 3,
      first_name: "Rita",
      last_name: "Hayworth",
    },
    {
      state: 4,
      first_name: "Veronica",
      last_name: "Lake",
    },
    {
      state: 1,
      first_name: "Elizabeth",
      last_name: "Taylor",
    },
    {
      state: 5,
      first_name: "Marilyn",
      last_name: "Monroe",
    },
    {
      state: 5,
      first_name: "Katharine",
      last_name: "Hepburn",
    },
    {
      state: 2,
      first_name: "Audrey",
      last_name: "Hepburn",
    },
    {
      state: 8,
      first_name: "Catherine",
      last_name: "Deneuve",
    },
    {
      state: 3,
      first_name: "Jane",
      last_name: "Fonda",
    },
    {
      state: 1,
      first_name: "Grace",
      last_name: "Kelly",
    },
    {
      state: 4,
      first_name: "Ingrid",
      last_name: "Bergman",
    },
    {
      state: 1,
      first_name: "Vivien",
      last_name: "Leigh",
    },
  ];

  return (
    <Styled>
      <Table columns={columns} data={React.useMemo(() => data, [])}/>
    </Styled>
  );
}


export default App;
