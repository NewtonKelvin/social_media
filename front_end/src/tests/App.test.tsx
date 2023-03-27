import {
  fireEvent,
  getByLabelText,
  render,
  waitFor,
} from "@testing-library/react";
import Login from "../pages/login";
import { screen } from "@testing-library/dom";

test("Test", () => {
  expect(1 + 1).toBe(2);
});

test("Login page", async () => {
  render(<Login />);

  const username = screen.getByLabelText("Username:");
  const password = screen.getByLabelText("Password:");
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("Login action", async () => {
  const container = render(<Login />);

  const username = screen.getByLabelText("Username:");
  const password = screen.getByLabelText("Password:");
  const submit = screen.getByRole("button", { name: "Login" });

  fireEvent.change(username, { target: { value: "kelvin.newton" } });
  fireEvent.change(password, { target: { value: "123123" } });
  //fireEvent.click(submit);
});
