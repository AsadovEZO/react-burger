import { ComponentPropsWithoutRef } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

type TInputProps = ComponentPropsWithoutRef<typeof Input>;
type TUnwantedKeys = "onPointerEnterCapture" | "onPointerLeaveCapture";
type TCustomInput = Omit<TInputProps, TUnwantedKeys>;

const CustomInput: React.FC<TCustomInput> = (props) => (
  <Input
    {...props}
    {...({} as Omit<
      ComponentPropsWithoutRef<typeof Input>,
      keyof TCustomInput
    >)}
  />
);

export default CustomInput;
