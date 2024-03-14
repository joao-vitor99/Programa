import { Spinner, ToastProps } from "@blueprintjs/core";
import { Client } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { CreateOrEdit } from "../components/Clients/CreateOrEdit";
import { Read } from "../components/Clients/Read";
import { ScreenMenuProps } from "../components/ScreenMenu";
import { SCREEN_MODE } from "../constants";
import { ScreenLocalContext } from "../context/ScreenLocalContext";
import {
  createClient,
  deleteClient,
  editClient,
  getClients,
} from "../queries/client";
import { createStyleMap } from "../utils";
import DataHeader from "../components/DataHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateClientResolver } from "../resolvers/user.resolver";
import { AppToaster } from "../config/toast";
import DeleteAlertModal from "../components/AlertModal";

type ClientWithoutId = Omit<Client, "id">;

export const Orders = () => {
  const {
    screenMode: { screenMode, setScreenMode },
    selectedRow: { selectedRow, setSelectedRow },
  } = useContext(ScreenLocalContext);

  const showToast = async (props: ToastProps) => {
    (await AppToaster).show(props);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery("Clients", getClients, {
    onError: () => {
      showToast({
        message: "Erro ao obter os clientes!",
        intent: "success",
      });
    },
  });

  const { mutateAsync: createClientMutation, isSuccess: createdSuccessfully } =
    useMutation("createClient", createClient, {
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

  const { mutateAsync: deleteClientMutation } = useMutation(
    "deleteClient",
    deleteClient,
    {
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
    }
  );

  const { mutateAsync: editClientMutation, isSuccess: editedSuccessfully } =
    useMutation("editClient", editClient, {
      onSuccess: () => {
        refetch();
        showToast({
          message: "Cliente editado com sucesso!",
          intent: "success",
        });
      },
      onError: () => {
        showToast({
          message: "Erro ao editar o cliente",
          intent: "danger",
        });
      },
    });

  const form = useForm<Client>({
    resolver: zodResolver(CreateClientResolver),
  });

  useEffect(() => {
    return () => {
      setScreenMode(SCREEN_MODE.VIEW);
      form.reset();
    };
  }, []);

  const handleDeleteActionButton = async () => {
    await deleteClientMutation((selectedRow as Client)?.id);
    setSelectedRow({});
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
      const onCreate: SubmitHandler<ClientWithoutId> = async (data) => {
        await createClientMutation(data);

        if (createdSuccessfully) {
          form.reset();
          changeScreen();
        }
      };

      const onEdit: SubmitHandler<ClientWithoutId> = async (data) => {
        const { id } = selectedRow as Client;

        await editClientMutation({
          clientId: id,
          clientData: data,
        });

        if (editedSuccessfully) {
          form.reset();
          changeScreen();
        }
      };

      form.handleSubmit(screenMode === SCREEN_MODE.NEW ? onCreate : onEdit)();
    },
    onCancelClick: (changeScreen) => {
      form.reset();
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

        <FormProvider {...form}>
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
            <CreateOrEdit />
          )}
        </FormProvider>
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
          Deletar o cliente <b>{(selectedRow as Client)?.name}</b> ?
        </p>
      </DeleteAlertModal>
    </>
  );
};
