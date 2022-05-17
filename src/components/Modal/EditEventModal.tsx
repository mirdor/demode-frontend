import { useState, useEffect } from "react";
import { useFormik } from "formik";

import demodeApi from "../../api/axios";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { TextArea, TextInput } from "../Input";
import { Spinner } from "../Spinner";
import { Event } from "../../types/dataTypes";
import { useAppDispatch } from "../../store/hooks";
import { updateEvent } from "../../store/slices/events/eventsSlice";

type Props = {
  isOpened: boolean;
  onClose: () => void;
  event: Event;
};

export const EditEventModal = ({ event, isOpened, onClose }: Props) => {
  const [isSending, setIsSending] = useState(false);
  const dispatch = useAppDispatch();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: event.title,
      place: event.place,
      description: event.description,
      starts_at: event.starts_at,
      url: event.url,
    },
    onSubmit: () => editEvent(),
  });

  const editEvent = () => {
    setIsSending(true);
    demodeApi.put<Event>(`/events/${event._id}/edit`, values).then((res) => {
      dispatch(updateEvent(res.data));
      setIsSending(false);
      onClose();
    });
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
          label='Lugar'
          name='place'
          value={values.place}
          placeholder='Ingrese el lugar...'
          required
        />
        <TextInput
          onChange={handleChange}
          label='Fecha y hora'
          name='starts_at'
          value={values.starts_at}
          type='datetime-local'
          placeholder='Ingrese la fecha...'
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

                <p>Actualizando...</p>
              </div>
            ) : (
              "Actualizar"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
