import { Table, Button, Tag, DatePicker } from "antd";
import type { TableProps } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { EditFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Order, OrdersApiService } from "@/services";
import OrderViewerModal from "@/components/OrderViewerModal";
import SwitchConfirmModal from "@/components/SwitchConfirmModal";

const { RangePicker } = DatePicker;

interface FilterButtons {
  label: string;
  startDate: string;
  endDate: string;
}

export default function OrderList () {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const router = useRouter();
  const ordersApi = OrdersApiService();
  const [currentFilter, setCurrentFilter] = useState(1);
  const [filterStartDate, setFilterStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [filterEndDate, setFilterEndDate] = useState(moment().add(1, 'day').format('YYYY-MM-DD'));

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
      render: (delivered: boolean, record) => (
        <div className="text-center">
          <SwitchConfirmModal checked={delivered} record={record} orders={orders} setOrders={setOrders} />
        </div>
      ),
    }
  ];

  useEffect(() => {
    setLoadingOrders(true);
    ordersApi.ordersList(
      {
        shippingStartDate: filterStartDate,
        shippingEndDate: filterEndDate
      }
    ).then((response) => {
      setOrders(response);
      setLoadingOrders(false);
    }).catch((error) => {
      console.error(error);
      setLoadingOrders(false);
    });
  }, [filterStartDate]);

  const dateFilter: FilterButtons[] = [
    {
      label: "Hoy",
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(1, 'day').format('YYYY-MM-DD')
    },
    {
      label: "Mañana",
      startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      endDate: moment().add(2, 'day').format('YYYY-MM-DD')
    },
    {
      label: "Próximos 7 días",
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(7, 'day').format('YYYY-MM-DD')
    },
    {
      label: "Próximos 30 días",
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(30, 'day').format('YYYY-MM-DD')
    },
  ];

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
          {dateFilter.map((date: FilterButtons, key: number) => (
            <Button
              key={key}
              className="rounded-lg"
              onClick={() => {
                setCurrentFilter(key + 1)
                setFilterStartDate(date.startDate)
                setFilterEndDate(date.endDate)
              }}
              type={currentFilter === key + 1 ? "primary" : "default"}
            >
              {date.label}
            </Button>
          ))}
          <RangePicker disabled className="rounded-lg text-primary border-primary border" />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <Table
          dataSource={orders}
          columns={columns}
          pagination={false}
          size="middle"
          loading={loadingOrders}
          className="hover:cursor-pointer"
          rowKey={(record) => record.id as string}
          locale={{emptyText: 'No hay pedidos'}}
        />
      </div>
    </section>
  );
}
