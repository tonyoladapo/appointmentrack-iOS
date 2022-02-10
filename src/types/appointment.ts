export interface AppointmentTypes {
  id: string;
  title: string;
  date: Date;
  endTime: Date;
  allDay?: boolean;
  notes?: string;
  person: PersonTypes | null;
  remindMe?: boolean;
  reminderTime?: Date;
}

export interface PersonTypes {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
