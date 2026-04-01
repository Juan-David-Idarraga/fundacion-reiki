'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ==========================================
// 1. ACCIONES DE MATERIALES (PDFs)
// ==========================================

export async function agregarMaterialAction(formData: FormData) {
  const supabase = await createClient();
  const archivo = formData.get('archivo') as File; 
  const nombreDoc = formData.get('nombre') as string;
  const modulo_id = formData.get('modulo_id') as string;

  if (!archivo || archivo.size === 0) return;

  const fileExtension = archivo.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
  const filePath = `${modulo_id}/${fileName}`;

  const { data: storageData, error: storageError } = await supabase.storage
    .from('materiales')
    .upload(filePath, archivo);

  if (storageError) throw new Error("Error al subir archivo");

  await supabase.from('materiales').insert([{ 
    nombre: nombreDoc, 
    url_archivo: storageData.path, 
    modulo_id 
  }]);

  revalidatePath('/admin/materiales');
  revalidatePath('/intranet/materiales');
}

export async function eliminarMaterialAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { data: material } = await supabase
    .from('materiales')
    .select('url_archivo')
    .eq('id', id)
    .single();

  if (material?.url_archivo) {
    await supabase.storage.from('materiales').remove([material.url_archivo]);
  }

  await supabase.from('materiales').delete().eq('id', id);
  revalidatePath('/admin/materiales');
  revalidatePath('/intranet/materiales');
}

// ==========================================
// 2. ACCIONES DE ALUMNOS (¡Esto es lo que te daba error!)
// ==========================================

export async function registrarAlumnoAction(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const nombre = formData.get('nombre') as string;
  const password = formData.get('password') as string;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: nombre } }
  });

  if (!authError && authData.user) {
    await supabase.from('perfiles').insert([{ 
      id: authData.user.id, email, nombre, estado: 'activo',
      vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
    }]);
  }
  revalidatePath('/admin/alumnos');
}

export async function eliminarAlumnoAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  await supabase.from('perfiles').delete().eq('id', id);
  revalidatePath('/admin/alumnos');
}

export async function actualizarEstadoAlumnoAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const estado = formData.get('estado') as string;
  await supabase.from('perfiles').update({ estado }).eq('id', id);
  revalidatePath('/admin/alumnos');
}

export async function extenderAccesoAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const dias = parseInt(formData.get('dias') as string);
  
  if (isNaN(dias)) return;

  const { data: alu } = await supabase.from('perfiles').select('vencimiento').eq('id', id).single();
  
  // Si no tiene fecha de vencimiento, empezamos desde hoy
  let nf = alu?.vencimiento ? new Date(alu.vencimiento) : new Date();
  
  // Sumamos o restamos los días
  nf.setDate(nf.getDate() + dias);
  
  await supabase.from('perfiles').update({ 
    vencimiento: nf.toISOString() 
  }).eq('id', id);
  
  revalidatePath('/admin/alumnos');
}

// ==========================================
// 3. ACCIONES DE CLASES Y MÓDULOS
// ==========================================

export async function agregarClaseAction(formData: FormData) {
  const supabase = await createClient();
  const titulo = formData.get('titulo') as string;
  const descripcion = formData.get('descripcion') as string;
  const urlOriginal = formData.get('url_youtube') as string;
  const modulo_id = formData.get('modulo_id') as string;

  const videoId = urlOriginal.includes('v=') ? urlOriginal.split('v=')[1].split('&')[0] : urlOriginal.split('/').pop();
  const url_youtube = `https://www.youtube.com/embed/${videoId}`;

  await supabase.from('clases_grabadas').insert([{ 
    titulo, descripcion, url_youtube, modulo_id,
    fecha: new Date().toLocaleDateString('es-CL'),
    duracion: "Clase Completa"
  }]);

  revalidatePath('/admin/clases');
  revalidatePath('/intranet/clases');
}

export async function eliminarClaseAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  await supabase.from('clases_grabadas').delete().eq('id', id);
  revalidatePath('/admin/clases');
}

export async function crearModuloAction(formData: FormData) {
  const supabase = await createClient();
  const nombre = formData.get('nombre') as string;
  const orden = parseInt(formData.get('orden') as string) || 0;
  await supabase.from('modulos').insert([{ nombre, orden }]);
  revalidatePath('/admin/clases');
  revalidatePath('/admin/materiales');
}

export async function eliminarModuloAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  await supabase.from('modulos').delete().eq('id', id);
  revalidatePath('/admin/clases');
  revalidatePath('/admin/materiales');
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}