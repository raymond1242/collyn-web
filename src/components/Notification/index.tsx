import { notification } from "antd";

export const invalidDataNotification = (message: string): void => {
    notification.error({
        message: "Error al enviar datos",
        description: message,
        duration: 4,
    });
};

export const InvalidShippingDateNotification = (): void => {
  notification.error({
    message: "Error al crear pedido",
    description: "La fecha de entrega no puede ser anterior a la fecha actual",
    duration: 5,
  });
};
