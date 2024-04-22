import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    lastName: "",
    surname: "",
    login: "",
    password: "",
  });
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData({ ...registerData, [name]: value });
  };

  const handleChangeRepeatPassword = (e) => {
    const { value } = e.target;
    setRepeatPassword(value);
    if (value !== registerData.password) {
      setPasswordError("Пароли не совпадают");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: registerData.login,
          password: registerData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorStatus = response.status;
        setError(errorData);
        setStatus(errorStatus);
      } else {
        const data = await response.json();
        localStorage.setItem("token", data);
        navigate("/main");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerData.name,
          lastName: registerData.lastName,
          surname: registerData.surname,
          login: registerData.login,
          password: registerData.password,
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Возникла ошибка при создании пользователя");
      } else {
        console.log("Вы успешно зарегистрировались");
        setRegisterData({
          name: "",
          lastName: "",
          surname: "",
          login: "",
          password: "",
        });
      }
      setIsLoginFormVisible(true);
    } catch (error) {
      console.error("Ошибка при обработке входа:", error);
    }
  };

  const loginForm = (
    <>
      <TextField
        label="Логин"
        name="login"
        value={registerData.login}
        onChange={handleChange}
        error={error && status === 404 ? error : null}
        helperText={error && status === 404 ? error : null}
        inputProps={{ maxLength: 21 }}
      />
      <TextField
        type="password"
        label="Пароль"
        name="password"
        value={registerData.password}
        onChange={handleChange}
        error={error && status === 400 ? error : null}
        helperText={error && status === 400 ? error : null}
        inputProps={{ maxLength: 21 }}
      />
      <Button
        variant="contained"
        color="success"
        onClick={handleLogin}
        disabled={!registerData.login || !registerData.password}
      >
        Войти
      </Button>
      <Button variant="text" color="success" onClick={() => setIsLoginFormVisible(false)}>
        Зарегистрироваться
      </Button>
    </>
  );

  const registerForm = (
    <>
      <TextField
        label="Имя"
        name="name"
        value={registerData.name}
        onChange={handleChange}
        inputProps={{ maxLength: 21 }}
      />
      <TextField
        label="Фамилия"
        name="lastName"
        value={registerData.lastName}
        onChange={handleChange}
        inputProps={{ maxLength: 21 }}
      />
      <TextField
        label="Отчество"
        name="surname"
        value={registerData.surname}
        onChange={handleChange}
        inputProps={{ maxLength: 21 }}
      />
      <TextField
        label="Логин"
        name="login"
        value={registerData.login}
        onChange={handleChange}
        inputProps={{ maxLength: 21 }}
      />
      <TextField
        type="password"
        label="Пароль"
        name="password"
        value={registerData.password}
        onChange={handleChange}
        inputProps={{ maxLength: 21 }}
      />
      <TextField
        type="password"
        label="Повторите пароль"
        name="repeat password"
        value={repeatPassword}
        onChange={handleChangeRepeatPassword}
        error={passwordError !== ""}
        helperText={repeatPassword !== "" ? passwordError : null}
        inputProps={{ maxLength: 21 }}
        disabled={!registerData.password || registerData.password === ""}
      />
      <Button
        variant="contained"
        color="success"
        onClick={handleRegister}
        disabled={
          !registerData.name ||
          !registerData.lastName ||
          !registerData.surname ||
          !registerData.login ||
          !registerData.password ||
          passwordError !== "" ||
          repeatPassword === ""
        }
      >
        Зарегистрироваться
      </Button>
      <Button variant="text" color="success" onClick={() => setIsLoginFormVisible(true)}>
        Войти
      </Button>
    </>
  );

  return (
    <Box sx={{ pt: 4 }}>
      <Box sx={{ m: "auto", p: 4, display: "grid", gap: 1, maxWidth: 400, border: "2px solid grey", borderRadius: 3 }}>
        {isLoginFormVisible ? loginForm : registerForm}
      </Box>
    </Box>
  );
};

export default Auth;
