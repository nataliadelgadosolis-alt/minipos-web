import { useState } from "react";
import { useCreatePan_coco,usePan_cocos,useDeletePan_coco, useUpdatePan_coco } from "../api/pan_cocos.queries";

export default function Pan_cocoPage() {

    // CONSULTAS Y MUTATIONS
    const { data = [], isLoading, isError, error, refetch } = usePan_cocos();
    const createMut = useCreatePan_coco();
    const deleteMut = useDeletePan_coco();
    const updateMut = useUpdatePan_coco();

    // ESTADOS
    const [fullName, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    //BOTÓN EDITAR 

    const [editingId, setEditingId] = useState<number | null>(null);

    // CREAR
    async function onCreate(e: React.FormEvent) {
        e.preventDefault();

        await createMut.mutateAsync({
            fullName: fullName,
            description: description,
            price: price
        });

        setName("");
        setDescription("");
        setPrice("");
    }

    // ACTUALIZAR
    async function onUpdate() {

        if (!editingId) return;

        await updateMut.mutateAsync({
            id: editingId,
            dto: {
                fullName: fullName,
                description: description,
                price: price
            }
        });

        setEditingId(null);

        setName("");
        setDescription("");
        setPrice("");
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* HEADER */}
            <header className="border-b bg-white">
                <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">

                    <h1 className="text-xl font-semibold">
                        Pan-Coco
                    </h1>

                    <button
                        className="rounded-lg border px-3 py-2"
                        onClick={() => refetch()}
                    >
                        Reintentar / Refrescar
                    </button>

                </div>
            </header>

            {/* MAIN */}
            <main className="mx-auto max-w-5xl px-4 py-6 space-y-4">

                {/* FORMULARIO */}
                <form
                    onSubmit={onCreate}
                    className="rounded-xl border bg-white p-4 space-y-3"
                >

                    <p className="text-sm text-slate-600">
                        <b>Mutation (POST)</b>: crea pan-coco y luego invalida cache para refrescar listado.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">

                        {/* NOMBRE */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nombre
                            </label>

                            <input
                                className="w-full rounded-lg border px-3 py-2"
                                value={fullName}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* DESCRIPCIÓN */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Descripción
                            </label>

                            <input
                                className="w-full rounded-lg border px-3 py-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* PRECIO */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Precio
                            </label>

                            <input
                                type="number"
                                className="w-full rounded-lg border px-3 py-2"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                    </div>

                    {/* BOTONES */}
                    <div className="flex gap-2">

                        {/* CREAR */}
                        <button
                            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
                            disabled={createMut.isPending}
                        >
                            {createMut.isPending ? "Creando…" : "Crear"}
                        </button>

                        {/* ACTUALIZAR */}
                        <button
                            type="button"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                            disabled={!editingId || updateMut.isPending}
                            onClick={onUpdate}
                        >
                            {updateMut.isPending ? "Actualizando…" : "Actualizar"}
                        </button>

                    </div>

                </form>

                {/* TABLA */}
                <div className="rounded-xl border bg-white">

                    <div className="p-4 border-b">

                        {isLoading && (
                            <p className="text-sm text-slate-600">
                                Cargando…
                            </p>
                        )}

                        {isError && (
                            <p className="text-sm text-red-600">
                                Error: {String(error)}
                            </p>
                        )}

                        {!isLoading && !isError && (
                            <p className="text-sm text-slate-600">
                                {data.length} registro(s)
                            </p>
                        )}

                    </div>

                    {/* TABLA */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-left">
                                <tr>
                                    <th className="p-3">Nombre</th>
                                    <th className="p-3">Descripción</th>
                                    <th className="p-3">Precio</th>
                                    <th className="p-3">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                {/* RECORRER DATOS */}
                                {data.map((c) => (
                                    <tr key={c.id} className="border-t">

                                        {/* NOMBRE */}
                                        <td className="p-3">
                                            {c.fullName}
                                        </td>

                                        {/* DESCRIPCIÓN */}
                                        <td className="p-3">
                                            {c.description}
                                        </td>

                                        {/* PRECIO */}
                                        <td className="p-3">
                                            ${c.price}
                                        </td>

                                        {/* ACCIONES */}
                                        <td className="p-3 flex gap-2">

                                            {/* BORRAR */}
                                            <button
                                                className="rounded-md border px-2 py-1 hover:bg-slate-50 disabled:opacity-50"
                                                disabled={deleteMut.isPending}
                                                onClick={() => {

                                                    if (!confirm("¿Seguro que deseas borrar este pan-coco?")) return;

                                                    deleteMut.mutate(c.id);

                                                }}
                                            >
                                                Borrar
                                            </button>

                                            {/* EDITAR */}
                                            <button
                                                className="rounded-md border px-2 py-1 hover:bg-slate-50"
                                                onClick={() => {

                                                    setEditingId(c.id);

                                                    setName(c.fullName);

                                                    setDescription(c.description);

                                                    setPrice(String(c.price));

                                                }}
                                            >
                                                Editar
                                            </button>

                                        </td>

                                    </tr>
                                ))}

                                {/* SIN REGISTROS */}
                                {!isLoading && !isError && data.length === 0 && (
                                    <tr>
                                        <td
                                            className="p-6 text-center text-slate-500"
                                            colSpan={3}
                                        >
                                            No hay registros.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* ERROR BORRANDO */}
                    {deleteMut.isError && (
                        <div className="p-4">
                            <p className="text-sm text-red-600">
                                Error borrando: {String(deleteMut.error)}
                            </p>
                        </div>
                    )}

                </div>

            </main>

        </div>
    );
}