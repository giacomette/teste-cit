import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("Deve renderizar a tela", () => {
    render(<App />);
  });

  test("Deve verificar se houve mudança na tela", () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });
});
