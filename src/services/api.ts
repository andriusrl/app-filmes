import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "1a6d4181ac66b4580cb7ccee53d7a4df",
    language: "pt-BR",
    include_adult: false,
  },
});

