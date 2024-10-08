import { Switch, Modal, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { Order } from "@/services";
import { useState } from "react";
import { OrdersApiService } from "@/services";

interface Props {
  checked: boolean;
  record: Order;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  completedOrders: Order[];
  setCompletedOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  disabled: boolean;
}

export default function SwitchConfirmModal ({
  checked,
  record,
  orders,
  setOrders,
  completedOrders,
  setCompletedOrders,
  disabled,
}: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(checked);
  const [loading, setLoading] = useState(false);

  const ordersApi = OrdersApiService();

  const onChangeCompletedStatus = (status: boolean) => {
    setOpenModal(true);
    setStatus(status);
  }

  const onConfirm = () => {
    setLoading(true);
    const requestParamas = {
      id: record.id as string,
      data: {
        completed: status
      }
    }
    ordersApi.ordersUpdateCompleted(requestParamas).then((response) => {
      setLoading(false);
      setOpenModal(false);
      if (response.completed) {
        setOrders(orders.filter(order => order.id !== record.id));
        let newCompletedOrders = completedOrders.concat(response);
        setCompletedOrders(newCompletedOrders.map(order => (order.id === record.id ? { ...order, completed: response.completed } : order)));
      } else {
        setCompletedOrders(completedOrders.filter(order => order.id !== record.id));
        let newOrders = orders.concat(response);
        setOrders(newOrders.map(order => (order.id === record.id ? { ...order, completed: response.completed } : order)));
      }
    }).catch((error) => {
      setLoading(false);
      setOpenModal(false);
      console.error(error);
    });
  }

  return (
    <>
      <Switch
        checked={checked}
        disabled={disabled}
        checkedChildren={<CheckOutlined />}
        onChange={(e) => onChangeCompletedStatus(e)}
      />
      <Modal
        centered
        open={openModal}
        width={480}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg font-light">
            El pedido
            <span className="text-xl font-medium mx-1.5">
              {record.name}
            </span>
            será marcado como&nbsp;
            <span className="text-xl font-medium">
              {!checked ? 'entregado' : 'no entregado'}.
            </span>
          </p>
          {Number(record.pendingPayment) === 0 && (
            <p className="text-base text-green-600">
              No hay monto pendiente de pago.
            </p>
          )}
          {!checked && Number(record.pendingPayment) > 0 && (
            <p className="text-lg font-light">
              El cliente tiene un monto pendiente de pago de
              <span className="text-red-500 text-xl px-1.5 font-semibold">
                S/.{record.pendingPayment}
              </span>
            </p>
          )}
          <p className="text-lg font-medium">¿Estás seguro de continuar?</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              size="large"
              type="primary"
              loading={loading}
              onClick={() => onConfirm()}
            >
              Si, continuar
            </Button>
            <Button
              size="large"
              onClick={() => setOpenModal(false)}
            >
              No, cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
