import { render, screen } from "@testing-library/react";
import Home from "../pages";
import Login from "../pages/login";

import "jest-styled-components";

test("Test", () => {
  expect(1 + 1).toBe(2);
});

test("Login page", () => {
  render(<Login />);
  /*const link = screen.getByText("Click here to go to login page");

  expect(link).toBeInTheDocument();*/
});
