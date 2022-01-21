export interface AppointmentTypes {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  location?: string;
  notes?: string;
  type?: string;
  person: PersonTypes;
}

export interface PersonTypes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
