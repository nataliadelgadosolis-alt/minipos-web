import { http } from "./http"; 
 
export type Department = { 
    id: number; 
    name: string; 
}; 
 
export type CreateDepartmentDto = { 
    id?: number;
    name: string; 
}; 
 
export type UpdateDepartmentDto = Partial<CreateDepartmentDto>; 
 
export const departmentsApi = { 
    list: () => http<Department[]>("/departments"), 

    create: (dto: CreateDepartmentDto) => 
        http<Department>("/departments", { method: "POST", body: JSON.stringify(dto) }), 
    
    update: (id: number, dto: UpdateDepartmentDto) => 
        http<Department>(`/departments/${id}`, { method: "PATCH", body: JSON.stringify(dto) 
}), 
    remove: (id: number) => http<void>(`/departments/${id}`, { method: "DELETE" }), 
}; 