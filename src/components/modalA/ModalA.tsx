import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Spinner from 'react-bootstrap/Spinner';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  APIRes,
  Contact,
  mainStateSelector,
  setData,
  setPending,
} from '../../_redux/main';
import { filterDelay } from '../../config';
import BtnBar from '../btnBar';
import ModalDetail from '../modalDetail';
import { ModalAProps } from './types';
import { apiClient } from '../../axios';

export default function ModalA(props: ModalAProps) {
  const dispatch = useDispatch()

  // main redux
  const { openedModal, pending, data } = useSelector(mainStateSelector)

  // modal show
  const show = useMemo<boolean>(() => openedModal === 'A', [openedModal])

  // init
  const _pending = useRef<boolean>(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [query, setQuery] = useState('')
  const onQueryChange = useCallback((e: any) => {
    setQuery(e.target.value)
  }, [])
  useEffect(() => {
    getData(1)
  }, [])

  // api
  const getData = useCallback(async (page: number) => {
    _pending.current = true
    dispatch(setPending(true))

    try {
      const res = await apiClient.get(
        "https://api.dev.pastorsline.com/api/contacts.json",
        {
          headers: {},
          params: {
            companyId: 171,
            query: query,
            page: page,
            countryId: '',
          }
        }
      );

      // success
      if (res.data.total) {
        setPageNumber(page)
        console.log(res.data)
        const _data: APIRes = res.data
        dispatch(setData(page !== 1 ? { ...data, contacts_ids: [...data.contacts_ids, ..._data.contacts_ids], contacts: { ...data.contacts, ..._data.contacts } } : _data))
      }
    } catch (err) {
      console.log('error')
    }

    _pending.current = false
    dispatch(setPending(false))
  }, [query, data])

  // filter
  const filterTimeout = useRef<NodeJS.Timeout | null>(null)
  const onFilter = useCallback(async (event: any) => {
    filterTimeout.current !== null && clearTimeout(filterTimeout.current)

    filterTimeout.current = setTimeout(() => {
      getData(1)
    }, event.key === 'Enter' ? 0 : filterDelay)
  }, [getData])

  // only even checkbox state
  const [onlyEven, setOnlyEven] = useState(false)
  const toogleOnlyEven = useCallback(() => {
    setOnlyEven(!onlyEven)
  }, [onlyEven])

  const scrollBar = useRef<Scrollbars>(null)

  // load more
  const loadMore = useCallback(() => {
    data.total > data.contacts_ids.length && getData(pageNumber + 1)
  }, [data, pageNumber, getData])
  const onScrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const onScroll = useCallback((values: any) => {
    if (onScrollTimeout.current !== null) {
      clearTimeout(onScrollTimeout.current)
    }
    onScrollTimeout.current = setTimeout(() => {
      console.log('onScroll', _pending.current)

      if (_pending.current === true) return
      const { scrollTop, scrollHeight, clientHeight } = values
      const rows = (onlyEven ? data.contacts_ids.filter((contact_id: number) => contact_id % 2 === 0) : data.contacts_ids).length
      if (rows < 10) return
      const pad = 1 // offset pixels

      // t will be greater than 1 if we are about to reach the bottom
      const t = ((scrollTop + pad) / (scrollHeight - clientHeight))
      if (t > 1){
        loadMore()
        scrollBar.current?.scrollTop(scrollTop - 2)
      }
    }, 100)
  }, [loadMore, onlyEven, data])

  // show detail modal
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const onShowDetail = useCallback((contact: Contact) => {
    setSelectedContact(contact)
    setShowDetail(true)
  }, [])
  const closeDetailModal = useCallback(() => {
    setShowDetail(false)
  }, [])

  return <>
    <Modal size="lg" centered backdrop="static" show={show} animation={false}>
      <Modal.Header style={{ 'backgroundColor': '#46139f', 'color': 'white' }}>
        <Modal.Title>Modal A</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* spinner */}
        <Spinner animation="border" role="status" className={pending ? 'display' : 'none'} />

        {/* filter */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Input Search key</Form.Label>
          <Form.Control type="text" placeholder="search..." onKeyUp={onFilter} onChange={onQueryChange} value={query} />
        </Form.Group>

        {/* table */}
        <Scrollbars ref={scrollBar} onUpdate={onScroll} style={{ width: '100%', height: '400px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {data.contacts_ids.length === 0 ? <>
                <tr>
                  <td colSpan={6}>No contact</td>
                </tr>
              </> : (onlyEven ? data.contacts_ids.filter((contact_id: number) => contact_id % 2 === 0) : data.contacts_ids).map((contact_id: number) => {
                const contact: Contact = data.contacts[contact_id]
                return <tr key={contact.id} onClick={() => onShowDetail(contact)}>
                  <td>{contact.id}</td>
                  <td>{contact.first_name}</td>
                  <td>{contact.last_name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone_number}</td>
                  <td>{contact.country_id}</td>
                </tr>
              })}
            </tbody>
          </Table>
        </Scrollbars>
      </Modal.Body>

      <Modal.Footer>
        <BtnBar
          onlyEven={onlyEven}
          toogleOnlyEven={toogleOnlyEven}
        />
      </Modal.Footer>
    </Modal>

    <ModalDetail
      open={showDetail}
      data={selectedContact}
      dismiss={closeDetailModal}
    />
  </>
}