import { Button } from 'antd';
import { useState } from 'react';
import Operation, { Props } from './Operation';

export default function Stash() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<Props['type']>();

  const onOpen = () => {
    setType(null);
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col p-24px">
        <div className="text-right">
          <Button type="primary" onClick={onOpen}>
            新建
          </Button>
        </div>
        <div className="flex-1">物料广场</div>
      </div>
      <Operation type={type} open={open} setOpen={setOpen}></Operation>
    </>
  );
}
