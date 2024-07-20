import { Table, Modal, Button } from "antd";
import type { TableProps } from "antd";
import CreateOrder from "@/components/CreateOrder";
import moment from "moment";
import { useState } from "react";

export interface Order {
  id: number;
  name: string;
  description: string;
  deliveryDate: moment.Moment;
  comment: string;
  quantity: number;
  price: number;
  paid: boolean;
}

const ordersMock: Order[] = [
  {
    id: 1,
    name: "Torta de chocolate",
    description: "Esta es una torta de chocolate, este es un texto largo para ver si se ajusta bien",
    deliveryDate: moment(),
    comment: "Este es un comentario",
    quantity: 3,
    price: 10,
    paid: false,
  },
  {
    id: 2,
    name: "Torta de papas",
    description: "Esta es una torta de papas",
    deliveryDate: moment().add(1, 'hour'),
    comment: "Este es un comentario",
    quantity: 2,
    price: 10,
    paid: true,
  }
];

const columns: TableProps<Order>["columns"] = [
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
    render: (text: number) => <p>{text}</p>,
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    render: (text: number) => <p>{text}</p>,
  },
  {
    title: "Hora entrega",
    dataIndex: "deliveryDate",
    key: "deliveryDate",
    render: (date: moment.Moment) => <p className="text-gray-700 text-xl font-bold">{date.format('HH:mm')}</p>,
  },
  {
    title: "Pagado",
    dataIndex: "paid",
    key: "paid",
    render: (text: boolean) => (
      <>
        {text ? (
          <p className="bg-green-200 text-green-700 w-fit px-2 py-1 text-sm font-medium rounded-md">Si</p>
        ) : (
          <p className="bg-red-200 text-red-700 w-fit px-2 py-1 text-sm font-medium rounded-md">No</p>
        )}
      </>
    ),
  }
];

export default function OrderList () {
  const [orders, setOrders] = useState<Order[]>(ordersMock);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [openModal, setOpenModal] = useState(false);
  
  const handleAddOrder = (order: Order) => {
    setOrders([...orders, order]);
  }

  const handleCompleteOrder = () => {
    setCompletedOrders([...completedOrders, currentOrder!]);
    setCurrentOrder(null);
    setOrders(orders.filter((order) => order.id !== currentOrder?.id));
  }

  return (
    <section className="grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-4 py-4">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-medium">
          Pedidos pendientes
        </p>
        <Table
          dataSource={orders}
          columns={columns}
          pagination={false}
          size="middle"
          className="hover:cursor-pointer"
          rowKey={(record) => record.id}
          locale={{emptyText: 'No hay pedidos pendientes'}}
          onRow={(record) => ({
            onClick: () => {
              setCurrentOrder(record);
              setOpenModal(true);
            },
          })}
        />
      </div>
      <div className="flex flex-col gap-4">
        <CreateOrder orders={orders} onAddOrder={handleAddOrder} />
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium text-neutral-500">
            Pedidos completados
          </p>
          <Table
            dataSource={completedOrders}
            locale={{emptyText: 'No hay pedidos completados'}}
            columns={columns}
            size="middle"
            pagination={false}
            className="hover:cursor-pointer"
            rowKey={(record) => record.id}
            />
        </div>
      </div>
      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        width={600}
        footer={null}
      >
        <div className="flex flex-col w-full">
          <p className="text-3xl font-medium mb-6">
            {currentOrder?.name}
          </p>
          <p className="text-lg font-medium mb-2">
            Fecha de entrega:&nbsp;
            <span className="text-gray-600 text-xl font-normal">
              {currentOrder?.deliveryDate.format('HH:mm DD/MM')}
            </span>
          </p>
          <p className="text-base font-light mb-2">
            {currentOrder?.description}
          </p>
          <p className="text-lg font-medium mb-4">
            Comentarios:
            <br />
            <span className="text-base font-light">
              {currentOrder?.comment}
            </span>
          </p>
          <Button
            size="large"
            onClick={() => {
              setOpenModal(false);
              handleCompleteOrder();
            }}
          >
            Completado
          </Button>
        </div>
      </Modal>
    </section>
  );
}
