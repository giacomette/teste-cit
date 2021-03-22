import { render } from "@testing-library/react";
import ModalJob from "../index";

describe("ModalJob", () => {
  test("Deve renderizar a modal", () => {
    const onCancel = jest.fn();
    const onSave = jest.fn();
    const open = false;
    const value = null;

    render(
      <ModalJob
        onCancel={onCancel}
        onSave={onSave}
        open={open}
        value={value}
      />
    );
  });

  test("Deve verificar se houve mudança na modal", () => {
      const onCancel = jest.fn();
      const onSave = jest.fn();
      const open = false;
      const value = null;

    const component = render(
      <ModalJob
        onCancel={onCancel}
        onSave={onSave}
        open={open}
        value={value}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
