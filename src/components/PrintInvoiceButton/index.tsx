import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import InvoiceComponent from "@/components/Invoice";
import { Order } from '@/services';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

export default function PrintInvoiceButton ({ record, hide }: { record: Order, hide: boolean }) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  return (
    <div className='flex flex-col mx-auto items-center w-fit'>
      <div className='pb-6 pt-4 text-left w-full'>
        <Button
          onClick={handlePrint}
          type='primary'
          icon={<PrinterOutlined className='text-xl' />}
        >
          Imprimir
        </Button>
      </div>
      <InvoiceComponent ref={componentRef} hide={hide} order={record} />
    </div>
  );
};
