import { InputGroup, InputGroupProps } from "@blueprintjs/core";
import * as React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  InputGroupProps & {
    error?: boolean;
  }
>((props, ref) => {
  return (
    <InputGroup
      fill
      inputRef={ref}
      intent={props?.intent ? props.intent : props?.error ? "danger" : "none"}
      {...props}
    />
  );
});
