import { Table, Button, Switch, Tag, DatePicker } from "antd";
import type { TableProps } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { EditFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Order, OrdersApiService } from "@/services";
import OrderViewerModal from "@/components/OrderViewerModal";

const { RangePicker } = DatePicker;

export default function OrderList () {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ordersApi = OrdersApiService();
  const [currentFilter, setCurrentFilter] = useState(1);

  const columns: TableProps<Order>["columns"] = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <Button
            disabled
            className="rounded-full"
            icon={<EditFilled />}
            onClick={() => console.log(record)}
          />
          <OrderViewerModal record={record} />
        </div>
      ),
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
      title: "Adelanto",
      dataIndex: "advancePayment",
      key: "advancePayment",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Pendiente",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <p>{record.pendingPayment}</p>,
    },
    {
      title: "Recepción",
      dataIndex: "shippingPlace",
      key: "location",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Fecha registro", 
      dataIndex: "createdAt",
      key: "registeredDate",
      render: (text: Date) => <p>{moment(text).format('DD/MM/YY')}</p>,
    },
    {
      title: "Fecha entrega",
      dataIndex: "shippingDate",
      key: "shippingDate",
      render: (date: Date) => <p>{moment(date).format('DD/MM/YY')}</p>,
    },
    {
      title: "Hora entrega",
      dataIndex: "shippingDate",
      key: "shippingDate",
      render: (date: Date) => <p>{moment(date).format('HH:mm')}</p>,
    },
    {
      title: "Lugar entrega",
      dataIndex: "shippingPlace",
      key: "shippingPlace",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title:"PROD",
      dataIndex: "hasProduction",
      key: "hasProduction",
      render: (text: boolean) => text ? (
        <div className="text-center">
          <Tag className="rounded-md bg-primary text-white border-primary">Si</Tag>
        </div>
      ) : (
        <div className="text-center">
          <Tag className="rounded-md text-neutral-400">No</Tag>
        </div>
      ),
    },
    {
      title: "Entregado",
      dataIndex: "delivered",
      key: "delivered",
      render: (text: boolean, record) => (
        <div className="text-center">
          <Switch checked={text} onChange={(e) => onChangeDeliveryStatus(e, record)} />
        </div>
      ),
    }
  ];

  const onChangeDeliveryStatus = (status: boolean, currentOrder: Order) => {
    console.log(status, currentOrder);
  }

  useEffect(() => {
    ordersApi.ordersList().then((response) => {
      setOrders(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const dateFilter = [
    "Hoy",
    "Mañana",
    "Próximos 7 días",
    "Próximos 30 días",
  ]

  return (
    <section className="grid gap-4 py-2">
      <div className="flex flex-col gap-4 justify-between py-2">
        <Button
          type="primary"
          size="large"
          className="w-fit"
          onClick={() => {
            setLoading(true);
            router.push('/order/create');
          }}
          loading={loading}
        >
          Crear pedido
        </Button>
        <div className="flex flex-wrap gap-2 items-center">
          {dateFilter.map((date, key) => (
            <Button
              key={key}
              className="rounded-lg"
              onClick={() => setCurrentFilter(key + 1)}
              type={currentFilter === key + 1 ? "primary" : "default"}
            >
              {date}
            </Button>
          ))}
          <RangePicker className="rounded-lg text-primary border-primary border" />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <Table
          dataSource={orders}
          columns={columns}
          pagination={false}
          size="middle"
          className="hover:cursor-pointer"
          rowKey={(record) => record.id as string}
          locale={{emptyText: 'No hay pedidos'}}
        />
      </div>
    </section>
  );
}
