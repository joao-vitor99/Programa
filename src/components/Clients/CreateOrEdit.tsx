import { FormGroup } from "@blueprintjs/core";
import { useFormContext } from "react-hook-form";
import { createStyleMap } from "../../utils";
import { Input } from "../Input";
import InputError from "../InputError";
import { useContext, useEffect } from "react";
import { ScreenLocalContext } from "../../context/ScreenLocalContext";
import { SCREEN_MODE } from "../../constants";

export const CreateOrEdit = () => {
  const {
    screenMode: { screenMode },
    selectedRow: { selectedRow },
  } = useContext(ScreenLocalContext);

  const styles = createStyleMap({
    container: {
      display: "flex",
      gap: "0.5rem",
    },
  });

  const {
    register,
    reset,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const isScreenInEditModeAndHasData =
      screenMode === SCREEN_MODE.EDIT &&
      selectedRow !== undefined &&
      Object.values(selectedRow).length;

    if (isScreenInEditModeAndHasData) {
      reset(selectedRow);
    }
  }, [selectedRow]);

  return (
    <form id="create-form" style={styles.container}>
      <FormGroup
        style={{ width: "250px" }}
        label="Nome:"
        labelInfo="(obrigatório)"
      >
        <Input
          placeholder="Nome"
          fill
          error={Boolean(errors?.["name"]?.message?.toString())}
          {...register("name")}
        />
        <InputError errorMessage={errors?.["name"]?.message?.toString()} />
      </FormGroup>

      <FormGroup style={{ width: "250px" }} label="Telefone:">
        <Input
          placeholder="Telefone"
          fill
          error={Boolean(errors?.["phone"]?.message?.toString())}
          {...register("phone")}
        />
        <InputError errorMessage={errors?.["phone"]?.message?.toString()} />
      </FormGroup>
    </form>
  );
};
