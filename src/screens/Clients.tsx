import { Spinner } from "@blueprintjs/core";
import { Client } from "@prisma/client";
import { useContext, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Create } from "../components/Clients/Create";
import { Read } from "../components/Clients/Read";
import { ScreenMenuProps } from "../components/ScreenMenu";
import { SCREEN_MODE } from "../constants";
import { ScreenLocalContext } from "../context/ScreenLocalContext";
import { createClient, getClients } from "../queries/client";
import { createStyleMap } from "../utils";
import DataHeader from "../components/DataHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateClientResolver } from "../resolvers/user.resolver";

type ClientWithoutId = Omit<Client, "id">;

export const Clients = () => {
  const {
    screenMode: { screenMode, setScreenMode },
  } = useContext(ScreenLocalContext);

  useEffect(() => {
    return () => {
      setScreenMode(SCREEN_MODE.VIEW);
    };
  }, []);

  const { data, isLoading } = useQuery("Clients", getClients);

  const { mutateAsync } = useMutation("createClient", createClient, {
    onError: (error) => {},
  });

  const createForm = useForm<Client>({
    resolver: zodResolver(CreateClientResolver),
  });

  const actions: ScreenMenuProps["actions"] = {
    onNewClick: (changeScreen) => {
      changeScreen();
    },
    onEditClick: (changeScreen) => {
      changeScreen();
    },
    onSaveClick: (changeScreen) => {
      const onSave: SubmitHandler<ClientWithoutId> = async (data) => {
        await mutateAsync(data);
        createForm.reset();

        changeScreen();
      };

      createForm.handleSubmit(onSave)();
    },
    onCancelClick: (changeScreen) => {
      createForm.reset()
      changeScreen();
    },
  };

  const styles = createStyleMap({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  });

  return (
    <div style={styles.container}>
      <DataHeader
        title="CLIENTES"
        actions={actions}
        screenMode={{ screenMode, setScreenMode }}
      />

      {isLoading ? (
        <Spinner size={110} intent="primary" />
      ) : screenMode === SCREEN_MODE.VIEW ? (
        <Read clients={data?.data as Client[]} />
      ) : (
        <FormProvider {...createForm}>
          {screenMode === SCREEN_MODE.NEW ? (
            <Create />
          ) : screenMode === SCREEN_MODE.EDIT ? (
            <>edit</>
          ) : null}
        </FormProvider>
      )}
    </div>
  );
};
