import { StatusBar } from "expo-status-bar";
import React from "react";
import { Home } from "./src/screens/Home";
import { Routes } from "./src/routes";
import { MovieProvider } from "./src/contexts/MoviesContext";

export default function App() {
  return (
    <>
      <MovieProvider>
        <Routes />
        <StatusBar style="auto" translucent backgroundColor="#242a32" />
      </MovieProvider>
    </>
  );
}
