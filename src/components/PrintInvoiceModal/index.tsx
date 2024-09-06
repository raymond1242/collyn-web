import { Modal, Button } from "antd";
import { useState } from "react";
import PrintInvoiceButton from "@/components/PrintInvoiceButton";
import { PrinterOutlined } from "@ant-design/icons";

export default function PrintInvoiceModal ({ record }: { record: any }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        icon={<PrinterOutlined className='text-xl' />}
        shape="circle"
      ></Button>
      <Modal
        centered
        width={420}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <PrintInvoiceButton record={record} />
      </Modal>
    </>
  )
}
