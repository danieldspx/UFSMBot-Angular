import { Routine } from './routine';

import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface RoutineWrapper {
  id: string,
  docRef: DocumentReference
  data: Routine
}
