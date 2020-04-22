import React from "react";
import { render, fireEvent } from "@testing-library/react";
import  Snowman from "./Snowman";

test("renders without crashing", function() {
  render (<Snowman />);
});

test("matches snapshot", function() {
  const { asFragment } = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});

test("changes image after incorrect guess", function() {
  const {getByText, getByAltText } = render(<Snowman />);

  // expect the first image to show, but not the second
  expect(getByAltText("snowman-state")).toHaveAttribute("src", "0.png");
  expect(getByAltText("snowman-state")).not.toHaveAttribute("src", "1.png");

  // make a wrong guess
  const wrongLetter = getByText("z");
  fireEvent.click(wrongLetter);

  // expect the second image to show, but not the first
  expect(getByAltText("snowman-state")).toHaveAttribute("src", "1.png");
  expect(getByAltText("snowman-state")).not.toHaveAttribute("src", "0.png");
});

test("changes revealed letters after correct guess", function() {
  const {getByText } = render(<Snowman words={["test"]} />);

  expect(getByText("____")).toBeInTheDocument();

  // make a correct guess
  const rightLetter = getByText("t");
  fireEvent.click(rightLetter);

  expect(getByText("t__t")).toBeInTheDocument();

});