import React from 'react';
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import AvisosClient from "./AvisosClient";

export default async function AdminAvisosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Traer los avisos actuales (ordenados por el más reciente)
  const { data: avisos } = await supabase
    .from('avisos')
    .select('*')
    .order('created_at', { ascending: false });

  // --- SERVER ACTIONS (Lógica de Base de Datos) ---
  
  async function crearAviso(formData: FormData) {
    'use server';
    const supabaseServer = await createClient();
    
    const titulo = formData.get('titulo') as string;
    const mensaje = formData.get('mensaje') as string;
    const fechaExpiracion = formData.get('fecha_expiracion') as string;

    if (!titulo || !mensaje || !fechaExpiracion) return;

    await supabaseServer.from('avisos').insert({
      titulo,
      mensaje,
      fecha_expiracion: new Date(fechaExpiracion).toISOString(),
    });

    revalidatePath('/admin/avisos'); // Recarga esta página
    revalidatePath('/intranet'); // Actualiza la vista de los alumnos
  }

  async function borrarAviso(formData: FormData) {
    'use server';
    const supabaseServer = await createClient();
    const id = formData.get('id') as string;

    if (!id) return;

    await supabaseServer.from('avisos').delete().eq('id', id);
    
    revalidatePath('/admin/avisos');
    revalidatePath('/intranet');
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <AvisosClient 
        avisos={avisos || []} 
        crearAvisoAction={crearAviso} 
        borrarAvisoAction={borrarAviso} 
      />
    </div>
  );
}
