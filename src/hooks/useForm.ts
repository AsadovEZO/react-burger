import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

interface IUseForm<T> {
  values: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<T>>
}

export function useForm<T extends Record<string, string>>(initialValues: T): IUseForm<T> {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
