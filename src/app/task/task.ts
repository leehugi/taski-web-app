export interface Task {
    _id?: string;
    userName: string;
    title: string;
    description: string;
    finishDate: Date;
    priority: Priority
    table?: TaskTable
}

export enum Priority {
    HIGH,
    MEDIUM, 
    LOW
}

export enum TaskTable {
    NEW = 'todo',
    OPEN = 'open',
    IN_PROGRESS = 'inProgress',
    DONE = 'done'
}