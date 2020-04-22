import { GlobalServiceMethodType } from './support/global-service-method-type.enum';

export const GLOBAL_SERVICE_DEFINITION: any = {
  users: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    getById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/' },
    doLogin: { method: GlobalServiceMethodType.POST, url: '/doLogin' },
    addUser: { method: GlobalServiceMethodType.POST, url: '/addUser' },
    updateUser: { method: GlobalServiceMethodType.POST, url: '/updateUser' },
    getUsersDto: { method: GlobalServiceMethodType.GET, url: '/getUsersDto' }
  },
  person: {
    addPerson: { method: GlobalServiceMethodType.POST, url: '/addPerson' },
    updatePerson: { method: GlobalServiceMethodType.PUT, url: '/updatePerson' },
    getPerson: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getPerson/$id' },
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' }
  },
  employee: {
    getById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getById/' },
    getByName: { method: GlobalServiceMethodType.GET, url: '/getByName/$name' },
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    addEmployee: { method: GlobalServiceMethodType.POST, url: '/addEmployee' },
    availables: { method: GlobalServiceMethodType.GET, url: '/availables' },
    uppdateEmployee: { method: GlobalServiceMethodType.POST, url: '/uppdateEmployee' },
    getSchedule: { method: GlobalServiceMethodType.GET_BY_ID, url: '/schedule/' },
    getAvailableSupervisor: { method: GlobalServiceMethodType.GET, url: '/getAvailableSupervisor' },
    getPages: { method: GlobalServiceMethodType.GET, url: '/getPages' },
    getSuperVisorTeam: { method: GlobalServiceMethodType.GET, url: '/getSuperVisorTeam' },
    getMachines: { method: GlobalServiceMethodType.GET, url: '/getMachines' }
  },
  roles: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    getAllPermissions: { method: GlobalServiceMethodType.GET, url: '/getAllPermissions' },
    getById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getById/' },
    updateRole: { method: GlobalServiceMethodType.POST, url: '/updateRole' },
    addRole: { method: GlobalServiceMethodType.POST, url: '/addRole' },
    getRolePermissions: { method: GlobalServiceMethodType.GET, url: '/getRolePermissions' }
  },
  teams: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    getById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getById/' },
    addTeam: { method: GlobalServiceMethodType.POST, url: '/addTeam' },
    updateTeam: { method: GlobalServiceMethodType.POST, url: '/updateTeam' }
  },
  teamsEmployees: {
    syncTeamsEmployees: { method: GlobalServiceMethodType.POST, url: '/syncTeamsEmployees' },
    getTeamEmployees: { method: GlobalServiceMethodType.GET, url: '/getTeamEmployees/$id' }
  },
  goals: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    getById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getById/' },
    addGoal: { method: GlobalServiceMethodType.POST, url: '/addGoal' },
    getByTeam: { method: GlobalServiceMethodType.GET, url: '/getByTeam/$id' }
  },
  teamGoal: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    getById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getById/' },
    addTeamGoal: { method: GlobalServiceMethodType.POST, url: '/addTeamGoal' }
  },
  schedules: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    addSchedule: { method: GlobalServiceMethodType.POST, url: '/addSchedule' },
    findById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getById/' },
    uppdateSchedule: { method: GlobalServiceMethodType.POST, url: '/uppdateSchedule' },
    findByIdEmployee: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getByEmployee/' },
    saveEmployeeSchedule: { method: GlobalServiceMethodType.POST, url: '/saveEmployeeSchedule' },

  },
  employees_schedules: {

  },
  machines: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    getById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/getById/' },
    addMachine: { method: GlobalServiceMethodType.POST, url: '/addMachine' },
    updateMachine: { method: GlobalServiceMethodType.POST, url: '/updateMachine' },
  },
  employeeMachines: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    getByEmployee: { method: GlobalServiceMethodType.GET, url: '/getByEmployee/$id' },
    add: { method: GlobalServiceMethodType.POST, url: '/add' },
    update: { method: GlobalServiceMethodType.POST, url: '/update' },
    delete: { method: GlobalServiceMethodType.DELETE, url: '/delete' }
  },
  reports: {
    generateReport: { method: GlobalServiceMethodType.GET, url: '/generateReport' },
    getChartsData: { method: GlobalServiceMethodType.GET, url: '/getChartsData' },
  },
  assigned_details: {
    saveDetail: { method: GlobalServiceMethodType.POST, url: '/addDetail' },
    updateDetail: { method: GlobalServiceMethodType.POST, url: '/updateDetail' }
  }
};
