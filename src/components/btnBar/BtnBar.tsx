import {
  useCallback,
  useMemo,
} from 'react';

import {
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { openModal } from '../../_redux/main';
import { BtnBarProps } from './types';

export default function BtnBar(props: BtnBarProps) {
  const dispatch = useDispatch()

  // all contacts
  const handleABtnClick = useCallback(() => {
    dispatch(openModal('A'))
  }, [])

  // us contacts
  const handleBBtnClick = useCallback(() => {
    dispatch(openModal('B'))
  }, [])

  // close
  const handleCBtnClick = useCallback(() => {
    dispatch(openModal(null))
  }, [])

  // only even checkbox
  const onlyEven = useMemo(() => props.onlyEven, [props.onlyEven])
  const changeCheckbox = useCallback(() => {
    props.toogleOnlyEven()
  }, [props.toogleOnlyEven])

  return <>
    <Link to={"/modalA"}>
      <Button onClick={handleABtnClick} variant="outline-success buttonA">All Contacts</Button>
    </Link>

    <Link to={"/modalB"}>
      <Button onClick={handleBBtnClick} variant="outline-success buttonB">US Contacts</Button>
    </Link>

    <Link to={"/"}>
      <Button onClick={handleCBtnClick} variant="close-modal">Close</Button>
    </Link>

    <Form>
      <Form.Check
        type={'checkbox'}
        label={'Only even'}
        checked={onlyEven}
        onChange={changeCheckbox}
      />
    </Form>
  </>
}