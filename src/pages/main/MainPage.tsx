import { useCallback, useEffect } from 'react';

import {
  Button,
  Stack,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import { APIRes, openModal, setData } from '../../_redux/main';
import ModalA from '../../components/modalA';
import ModalB from '../../components/modalB';
import { MainPageProps } from './types';

export default function MainPage(props: MainPageProps) {
  const dispatch = useDispatch()
  const data: APIRes = {
    'total': 10, 
    'contacts_ids': [
      745450,
      502931,
    ],
    'contacts': {
      "745450": {
        "id": 745450,
        "first_name": "Jason1",
        "last_name": "Alexis1",
        "email": '',
        "phone_number": "9404480524",
        "country_id": 225,
      },
      "502931": {
        "id": 502931,
        "first_name": "jason",
        "last_name": "Alexis",
        "email": "",
        "phone_number": "0",
        "country_id": 226,
      },
    }
  }

  useEffect(() => {
    // dispatch(setData(data))
  }, [])

  const handleModalABtnClick = useCallback(() => {
    dispatch(openModal('A'))
  }, [])

  const handleModalBBtnClick = useCallback(() => {
    dispatch(openModal('B'))
  }, [])

  return <>
    <Router>
      <Stack direction="horizontal" gap={3}>
        <Link to={"/modalA"}>
          <Button onClick={handleModalABtnClick} variant="outline-success buttonA btn-lg">
            Modal A
          </Button>
        </Link>
        <Link to={"/modalB"}>
          <Button onClick={handleModalBBtnClick} variant="outline-success buttonB btn-lg">
            Modal B
          </Button>
        </Link>
      </Stack>

      <Routes>
        <Route path='/modalA/' element={<ModalA />} />
        <Route path='/modalB/' element={<ModalB />} />
        <Route path='/' element={null} />
      </Routes>
    </Router>
  </>
}