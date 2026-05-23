import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
import { pan_cocosApi, type CreatePan_cocoDto, type UpdatePan_cocoDto } from "./pan_cocos"; 
 
const keys = { 
    all: ["pan_cocos"] as const, 
}; 
 
export function usePan_cocos() { 
    return useQuery({ 
        queryKey: keys.all, 
        queryFn: pan_cocosApi.list, 
    }); 
} 
 
export function useCreatePan_coco() { 
    const qc = useQueryClient(); 
    return useMutation({ 
        mutationFn: (dto: CreatePan_cocoDto) => pan_cocosApi.create(dto), 
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }), 
    }); 
} 
 
export function useUpdatePan_coco() { 
    const qc = useQueryClient(); 
    return useMutation({ 
        mutationFn: ({ id, dto }: { id: number; dto: UpdatePan_cocoDto }) => 
            pan_cocosApi.update(id, dto), 
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }), 
    }); 
} 
 
export function useDeletePan_coco() { 
    const qc = useQueryClient(); 
    return useMutation({ 
        mutationFn: (id: number) => pan_cocosApi.remove(id), 
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }), 
    }); 
} 