import { useEffect } from "react";
import { toast } from "../ui";

type DelayedLoadingProps = {
  isPending: boolean;
  delay?: number; // Tempo em milissegundos antes de mostrar o alerta
}

export function DelayedLoading({ isPending, delay = 2500 }: DelayedLoadingProps) {

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPending) {
      // Se a query/mutation continuar pendente após o delay, mostra o aviso
      timer = setTimeout(() => {
        toast.add({
          title: "O servidor está acordando, isso pode levar algum tempo.",
          type: "warning",
          "timeout": 6000
        });
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [isPending, delay]);

  if (!isPending) return null;

  return (
    <></>
  );
}
