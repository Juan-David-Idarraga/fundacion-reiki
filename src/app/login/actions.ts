'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'

export async function loginAction(formData: FormData) {
  const supabase = await createClient()

  // Extraemos el correo y contraseña que el usuario escribió
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Intentamos iniciar sesión en Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Si hay error (mala contraseña o no existe), lo devolvemos al login con un mensaje
  if (error) {
    return redirect('/login?error=Correo o contraseña incorrectos')
  }

  // Si todo sale bien, lo dejamos pasar a la intranet
  revalidatePath('/', 'layout')
  redirect('/intranet')
}