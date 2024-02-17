import { Spinner, ToastProps } from "@blueprintjs/core";
import { Client } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Create } from "../components/Clients/Create";
import { Read } from "../components/Clients/Read";
import { ScreenMenuProps } from "../components/ScreenMenu";
import { SCREEN_MODE } from "../constants";
import { ScreenLocalContext } from "../context/ScreenLocalContext";
import { createClient, deleteClient, getClients } from "../queries/client";
import { createStyleMap } from "../utils";
import DataHeader from "../components/DataHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateClientResolver } from "../resolvers/user.resolver";
import { AppToaster } from "../config/toast";
import DeleteAlertModal from "../components/AlertModal";

type ClientWithoutId = Omit<Client, "id">;

export const Clients = () => {
  const {
    screenMode: { screenMode, setScreenMode },
    selectedRow: { selectedRow, setSelectedRow },
  } = useContext(ScreenLocalContext);

  const showToast = async (props: ToastProps) => {
    (await AppToaster).show(props);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      setScreenMode(SCREEN_MODE.VIEW);
    };
  }, []);

  const { data, isLoading, refetch } = useQuery("Clients", getClients, {
    onError: () => {
      showToast({
        message: "Erro ao obter os clientes!",
        intent: "success",
      });
    },
  });

  const { mutateAsync: createClientMutation } = useMutation("createClient", createClient, {
    onSuccess: () => {
      refetch();
      showToast({
        message: "Cliente criado com sucesso!",
        intent: "success",
      });
    },
    onError: () => {
      showToast({
        message: "Erro ao criar o cliente",
        intent: "danger",
      });
    },
  });

  const { mutateAsync: deleteClientMutation } = useMutation("deleteClient", deleteClient, {
    onSuccess: () => {
      refetch();
      showToast({
        message: "Cliente deletado com sucesso!",
        intent: "success",
      });
    },
    onError: () => {
      showToast({
        message: "Erro ao deletar o cliente",
        intent: "danger",
      });
    },
  });

  const createForm = useForm<Client>({
    resolver: zodResolver(CreateClientResolver),
  });

  const handleDeleteActionButton = async () => {
    // setSelectedRow(undefined as any);
    await deleteClientMutation(selectedRow?.id)
    setIsDeleteModalOpen(false);
  };

  const actions: ScreenMenuProps["actions"] = {
    onNewClick: (changeScreen) => {
      changeScreen();
    },
    onEditClick: (changeScreen) => {
      changeScreen();
    },
    onSaveClick: (changeScreen) => {
      const onSave: SubmitHandler<ClientWithoutId> = async (data) => {
        await createClientMutation(data);
        createForm.reset();

        changeScreen();
      };

      createForm.handleSubmit(onSave)();
    },
    onCancelClick: (changeScreen) => {
      createForm.reset();
      changeScreen();
    },
    onDeleteClick: () => {
      setIsDeleteModalOpen(true);
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
    <>
      <div style={styles.container}>
        <DataHeader
          title="CLIENTES"
          actions={actions}
          screenMode={{ screenMode, setScreenMode }}
        />

        {isLoading ? (
          <Spinner size={110} intent="primary" />
        ) : screenMode === SCREEN_MODE.VIEW ? (
          <Read
            clients={data?.data as Client[]}
            onRowSelect={(data) => {
              setSelectedRow(data as any);
            }}
          />
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
      <DeleteAlertModal
        isOpen={isDeleteModalOpen}
        confirmButtonText="Deletar"
        cancelButtonText="Cancelar"
        icon="trash"
        intent="danger"
        actions={{
          onCancel: () => {
            setIsDeleteModalOpen(false);
          },
          onConfirm: () => {
            handleDeleteActionButton();
          },
        }}
      >
        <p>
          Deletar o cliente <b>{selectedRow?.name as any}</b> ?
        </p>
      </DeleteAlertModal>
    </>
  );
};
