import { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import { Button } from "../Button";
import { Spinner } from "../Spinner";
import { Modal } from "./Modal";
import { TextArea, TextInput } from "../Input";
import useStorage from "../../hooks/useStorage";
import { useAddProductMutation } from "../../store/services";

const initialValues = {
  title: "",
  description: "",
  categories: "",
  url: "",
};

type Props = {
  isOpened: boolean;
  onClose: () => void;
};

export const NewProductModal = ({ isOpened, onClose }: Props) => {
  const { registerData, isSending } = useStorage("products");
  const [img, setImg] = useState<File>();
  const [addProduct] = useAddProductMutation();

  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues,
    onSubmit: () =>
      registerData(
        img,
        () => toast.error("Se debe adjuntar una imagen"),
        (error) => toast.error("Ocurrió un error: ", error),
        (url) => newProduct(url)
      ),
  });

  const newProduct = (url: string) => {
    addProduct({ ...values, img: url })
      .then(() => {
        toast.success("Producto Registrado");
        setValues(initialValues);
      })
      .catch(() => toast.error("No se logró registrar el producto"));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    setImg(files[0]);
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <h6 className='font-semibold text-xl'>NUEVO ARTÍCULO</h6>
      <br />
      <form onSubmit={handleSubmit} noValidate>
        <TextInput
          onChange={handleChange}
          label='Título'
          name='title'
          value={values.title}
          placeholder='Ingrese el título...'
          required
        />
        <TextArea
          onChange={handleChange}
          label='Descripción'
          name='description'
          value={values.description}
          placeholder='Ingrese la descripción...'
          required
        />
        <TextInput
          onChange={handleChange}
          label='Categoría'
          name='categories'
          value={values.categories}
          placeholder='Ingrese la categoría...'
          required
        />
        <TextInput
          onChange={handleChange}
          label='Enlace'
          name='url'
          value={values.url}
          placeholder='Ingrese el enlace...'
          required
        />
        <div className='w-full flex'>
          <label className='block'>
            <span className='sr-only'>Elegir una foto</span>
            <input
              onChange={handleImageChange}
              type='file'
              className='block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-sm file:border-0
                    file:text-sm file:font-semibold
                    file:bg-alterGray file:text-white
                    hover:file:bg-darkGray '
            />
          </label>
        </div>
        <div className='w-full flex justify-left'>
          <Button
            className='px-9 mt-3 shadow-md relative'
            type='submit'
            size='sm'
            disabled={isSending}
          >
            {isSending ? (
              <div className='w-full h-full flex gap-x-2'>
                <Spinner size='inline' color='lightGray' />

                <p>Enviando...</p>
              </div>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
