import { render } from "@testing-library/react";
import { Container, GlobalStyle } from "../styles";

describe("styles App", () => {
  test("Deve verificar se houve mudança no Container", () => {
    const component = render(<Container />);

    expect(component).toMatchSnapshot();
  });
  test("Deve verificar se houve mudança no GlobalStyle", () => {
    const component = render(<GlobalStyle />);

    expect(component).toMatchSnapshot();
  });
});
