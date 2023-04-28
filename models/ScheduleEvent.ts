interface ScheduleEvent {
    id: number;
    journalId: number;
    subjectStudyPeriodId: number | null;
    nameEt: string;
    nameEn: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    hasStarted: boolean;
    teachers: Teacher[];
    rooms: Room[];
    studentGroups: StudentGroup[];
    subgroups: any[];
    students: any[];
    addInfo: any | null;
    singleEvent: boolean;
    publicEvent: number;
    timetableId: number;
    showStudyMaterials: boolean;
    capacityType: string;
    isPersonal: any | null;
    person: any | null;
    isJuhanEvent: boolean;
    isExam: boolean;
    isOngoing: any | null;
    includesEventStudents: boolean;
    changed: string;
    canEdit: any | null;
    canDelete: any | null;
    nameRu: string;
}

interface Teacher {
    id: number;
    name: string;
}

interface StudentGroup {
    id: number;
    code: string;
}
