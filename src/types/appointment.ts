export interface AppointmentTypes {
  id: string;
  title: string;
  date: Date;
  startTime: Date;
  endTime?: Date;
  allDay?: boolean;
  // location?: string;
  notes?: string;
  // type?: string;
  person: PersonTypes | null;
}

export interface PersonTypes {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
