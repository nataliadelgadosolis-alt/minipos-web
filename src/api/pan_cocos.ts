import { http } from "./http"; 
 
export type Pan_coco = { 
    id: number; 
    fullName: string; 
    description: string; 
    price: string; 
}; 
 
export type CreatePan_cocoDto = { 
    fullName: string; 
    description: string; 
    price: string; 
}; 
 
export type UpdatePan_cocoDto = Partial<CreatePan_cocoDto>; 
 
export const pan_cocosApi = { 
    list: () => http<Pan_coco[]>("/pan_cocos"), 
    create: (dto: CreatePan_cocoDto) => 
        http<Pan_coco>("/pan_cocos", { method: "POST", body: JSON.stringify(dto) }), 
    update: (id: number, dto: UpdatePan_cocoDto) => 
        http<Pan_coco>(`/pan_cocos/${id}`, { method: "PATCH", body: JSON.stringify(dto) 
}), 
    remove: (id: number) => http<void>(`/pan_cocos/${id}`, { method: "DELETE" }), 
}; 