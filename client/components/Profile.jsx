import * as React from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientsList from "./ClientsList";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8080/api/user", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/aton");
        return;
      }
      if (!response.ok) {
        throw new Error("Не удалось получить данные текущего пользователя");
      }
      const user = await response.json();
      if (user) {
        setUserData((prevState) => ({
          ...prevState,
          name: user.userData.name,
          lastName: user.userData.lastName,
          surname: user.userData.surname,
        }));
      } else {
        throw new Error("Данные пользователя не корректны");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/aton");
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Box sx={{ pt: 5 }}>
      <Card sx={{ maxWidth: 1200, margin: "auto" }}>
        <Paper>
          <CardContent>
            {userData ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  bgcolor: "whitesmoke",
                  border: "solid",
                  borderColor: "lightgray",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  <span>{userData.lastName} </span>
                  <span>{userData.name} </span>
                  <span>{userData.surname}</span>
                </Typography>
                <CardActions>
                  <Button variant="Text" size="small" onClick={logOut}>
                    Выйти
                  </Button>
                </CardActions>
              </Box>
            ) : (
              <Typography>Загрузка...</Typography>
            )}
          </CardContent>
          <ClientsList />
        </Paper>
      </Card>
    </Box>
  );
}
