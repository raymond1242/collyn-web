import { notification } from "antd";

export const invalidDataNotification = (message: string): void => {
    notification.error({
        message: "Error al enviar datos",
        description: message,
        duration: 4,
    });
};
