// ---------------- main redux ----------------
export type MainState = {
  openedModal: ModalType,
  pending: boolean,
  data: APIRes,
}

export type ModalType = 'A' | 'B' | null

export type APIRes = {
  total: number,
  contacts_ids: number[],
  contacts: {
    [contact_id: number]: Contact
  }
}

export type Contact = {
  id: number,
  first_name: string,
  last_name: string,
  email: string | null,
  phone_number: string,
  country_id: number,
}