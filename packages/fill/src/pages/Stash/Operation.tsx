import { Form, Image, Input, Modal, Upload } from 'antd';
import { FC, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { getBase64 } from '@/utils/file';

type FieldType = {
  title: string;
  thumbnail: string;
  intro?: string;
};

export interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'edit' | null | undefined;
}
const { TextArea } = Input;
const Operation: FC<Props> = function Operation(props) {
  const { open, setOpen, type } = props;

  const [form] = Form.useForm();
  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);

    handleCancel();
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const title = useMemo(() => {
    return type === 'edit' ? '编辑' : '新增';
  }, [type]);

  const fileList = Form.useWatch('thumbnail', form);

  const customRequest: UploadProps['customRequest'] = (file) => {
    // console.log(file);
    file.onSuccess?.(getBase64(file.file as File));
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const onPreview: UploadProps['onPreview'] = (file) => {
    Promise.resolve(file.response).then((res) => {
      setPreviewImage(res);
      setPreviewOpen(true);
    });
  };

  return (
    <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} autoComplete="off">
        <Form.Item<FieldType> label="标题" name="title" rules={[{ required: true, message: '请输入标题!' }]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="缩略图"
          name="thumbnail"
          rules={[{ required: true, message: '请输入缩略图!' }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            maxCount={1}
            onPreview={onPreview}
            accept="image/*"
            customRequest={customRequest}
            listType="picture-card"
          >
            {fileList?.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item<FieldType> label="备注" name="intro">
          <TextArea rows={4} />
        </Form.Item>
      </Form>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </Modal>
  );
};

export default Operation;
