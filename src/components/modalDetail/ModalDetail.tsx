import { useMemo } from 'react';

import {
  Button,
  Modal,
  Table,
} from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars';

import { Contact } from '../../_redux/main';
import { ModalDetailProps } from './types';

export default function ModalB(props: ModalDetailProps) {
  const show = useMemo<boolean>(() => props.open, [props.open])
  const contact = useMemo<Contact | null>(() => props.data, [props.data])
  const onCloseModal = useMemo<() => void>(() => props.dismiss, [props.dismiss])

  return <>
    <Modal size="lg" className='modal-c' centered show={show} onHide={onCloseModal} animation={false}>
      <Modal.Header>
        <Modal.Title>Detail</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Scrollbars style={{ width: '100%', height: '500px' }}>
          {contact !== null && <Table bordered hover>
            <tbody>
              <tr>
                <td>No</td>
                <td>{contact.id}</td>
              </tr>
              <tr>
                <td>First Name</td>
                <td>{contact.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{contact.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{contact.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{contact.phone_number}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{contact.country_id}</td>
              </tr>
            </tbody>
          </Table>}
        </Scrollbars>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onCloseModal} variant="close-modal">Close</Button>
      </Modal.Footer>
    </Modal>
  </>
}