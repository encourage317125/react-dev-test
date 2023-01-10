import { Contact } from '../../_redux/main';

export type ModalDetailProps = {
  open: boolean,
  data: Contact | null,
  dismiss: () => void,
}