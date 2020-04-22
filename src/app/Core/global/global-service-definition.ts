import * as VERBS from './support/VERBS';
export interface IGlobalServiceDefinition {
  users?: {
    getAll: () => VERBS.IGetCall;
    getById: () => VERBS.IGetByIdCall;
    doLogin: () => VERBS.IpostCall;
    addUser: () => VERBS.IpostCall;
    updateUser: () => VERBS.IpostCall;
    getUsersDto: () => VERBS.IGetCall;
  };
  person?: {
    addPerson: () => VERBS.IpostCall;
    updatePerson: () => VERBS.IPutCall;
    getPerson: () => VERBS.IGetByIdCall;
    getAll: () => VERBS.IGetCall;
  };
  employee?: {
    getById: () => VERBS.IGetByIdCall;
    getByName: (name: string) => VERBS.IGetCall;
    getAll: () => VERBS.IGetCall;
    addEmployee: () => VERBS.IpostCall;
    availables: () => VERBS.IGetCall;
    uppdateEmployee: () => VERBS.IpostCall;
    getSchedule: () => VERBS.IGetCall;
    getAvailableSupervisor: () => VERBS.IGetCall;
    getPages: () => VERBS.IGetCall;
    getSuperVisorTeam: () => VERBS.IGetCall;
    getMachines: () => VERBS.IGetCall;
  },
  machines?: {
    getAll: () => VERBS.IGetCall;
    getById: () => VERBS.IGetByIdCall;
    addMachine: () => VERBS.IpostCall;
    updateMachine: () => VERBS.IpostCall;
  },
  teams?: {
    getAll: () => VERBS.IGetCall;
    getById: () => VERBS.IGetByIdCall;
    addTeam: () => VERBS.IpostCall;
    addTeamGoal: () => VERBS.IpostCall;
    updateTeam: () => VERBS.IpostCall;
  },
  teamsEmployees?: {
    syncTeamsEmployees: () => VERBS.IpostCall;
    getTeamEmployees: (teamId: number) => VERBS.IGetCall;
  }
  teamGoal?: {
    getAll: () => VERBS.IGetCall;
    getById: () => VERBS.IGetByIdCall;
    addTeamGoal: () => VERBS.IpostCall;
  }
  schedules?: {
    getAll: () => VERBS.IGetCall;
    addSchedule: () => VERBS.IpostCall;
    findById: () => VERBS.IGetCall;
    findByIdEmployee: () => VERBS.IGetCall;
    uppdateSchedule: () => VERBS.IpostCall;
    saveEmployeeSchedule: () => VERBS.IpostCall;
  },
  roles?: {
    getAll: () => VERBS.IGetCall;
    getAllPermissions: () => VERBS.IGetCall;
    getById: () => VERBS.IGetByIdCall;
    updateRole: () => VERBS.IpostCall;
    addRole: () => VERBS.IpostCall;
    getRolePermissions: () => VERBS.IGetCall;
  },

  goals?: {
    getAll: () => VERBS.IGetCall;
    getById: () => VERBS.IGetByIdCall;
    addGoal: () => VERBS.IpostCall;
    getByTeam: (teamId: number) => VERBS.IGetCall;
  }

  employeeMachines?: {
    getAll: () => VERBS.IGetCall;
    getByEmployee: (id: number) => VERBS.IGetCall;
    add: () => VERBS.IpostCall;
    delete: () => VERBS.IDeleteCall;
    update: () => VERBS.IpostCall;
  }

  reports?: {
    generateReport: () => VERBS.IGetCall;
    getChartsData: () => VERBS.IGetCall;
  }

  assigned_details?: {
    saveDetail: () => VERBS.IpostCall;
    updateDetail: () => VERBS.IpostCall;
  }
}
