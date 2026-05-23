import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
import { departmentsApi, type CreateDepartmentDto, type UpdateDepartmentDto } from "./departments"; 
 
const keys = { 
    all: ["departments"] as const, 
}; 
 
export function useDepartments() { 
    return useQuery({ 
        queryKey: keys.all, 
        queryFn: departmentsApi.list, 
    }); 
} 
 
export function useCreateDepartment() { 
    const qc = useQueryClient(); 
    return useMutation({ 
        mutationFn: (dto: CreateDepartmentDto) => departmentsApi.create(dto), 
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }), 
    }); 
} 
 
export function useUpdateDepartment() { 
    const qc = useQueryClient(); 
    return useMutation({ 
        mutationFn: ({ id, dto }: { id: number; dto: UpdateDepartmentDto }) => 
            departmentsApi.update(id, dto), 
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }), 
    }); 
} 
 
export function useDeleteDepartment() { 
    const qc = useQueryClient(); 
    return useMutation({ 
        mutationFn: (id: number) => departmentsApi.remove(id), 
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }), 
    }); 
} 
