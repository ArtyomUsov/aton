import { useEffect, useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  Box,
} from "@mui/material";

const ClientsList = () => {
  const [clientData, setClientData] = useState({ clients: [] });

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8080/api/client", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        return;
      }
      if (!response.ok) {
        throw new Error("Не удалось получить данные для текущего пользователя");
      }
      const client = await response.json();
      if (client) {
        setClientData(client);
      } else {
        throw new Error("Данные пользователя не корректны");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (clientId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8080/api/client", {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus, clientId: clientId }),
      });
      if (!response.ok) {
        console.log("Не удалось обновить статус клиента");
        throw new Error("Не удалось обновить статус клиента");
      }
      const updatedClient = clientData.clients.find((client) => client._id === clientId);
      updatedClient.status = newStatus;
      setClientData({ clients: [...clientData.clients] });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ p: 5 }}>
      <Box sx={{ p: 2, border: "solid", borderColor: "lightgray" }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "whitesmoke" }}>
            <TableRow>
              <TableCell align="center">№ счёта</TableCell>
              <TableCell align="center">Фамилия</TableCell>
              <TableCell align="center">Имя</TableCell>
              <TableCell align="center">Отчество</TableCell>
              <TableCell align="center">Дата рождения</TableCell>
              <TableCell align="center">ИНН</TableCell>
              <TableCell align="center">Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData.clients.length > 0 ? (
              clientData.clients.map((client, _id) => (
                <TableRow key={_id}>
                  <TableCell align="center">{client.accountNumber}</TableCell>
                  <TableCell align="center">{client.lastName}</TableCell>
                  <TableCell align="center">{client.name}</TableCell>
                  <TableCell align="center">{client.surname}</TableCell>
                  <TableCell align="center">{client.dateOfBirth.split("T")[0]}</TableCell>
                  <TableCell align="center">{client.tin}</TableCell>
                  <TableCell align="center">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                      <Select
                        defaultValue={"Не в работе"}
                        value={client.status}
                        onChange={(e) => handleChange(client._id, e.target.value)}
                        label={client.status}
                      >
                        <MenuItem value={client.status}>
                          <em>{client.status}</em>
                        </MenuItem>
                        <MenuItem value={"Не в работе"}>Не в работе</MenuItem>
                        <MenuItem value={"В работе"}>В работе</MenuItem>
                        <MenuItem value={"Сделка закрыта"}>Сделка закрыта</MenuItem>
                        <MenuItem value={"Отказ"}>Отказ</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Загрузка...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default ClientsList;
