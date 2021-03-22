import { render } from "@testing-library/react";
import ModalSchedule from "../index";

describe("ModalSchedule", () => {
  test("Deve renderizar a modal", () => {
    const onCancel = jest.fn();
    const onSave = jest.fn();
    const open = false;
    const value = null;

    render(
      <ModalSchedule
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
      <ModalSchedule
        onCancel={onCancel}
        onSave={onSave}
        open={open}
        value={value}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
