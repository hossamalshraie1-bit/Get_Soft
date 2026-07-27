import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin =
  rawUrl && serviceKey
    ? createClient(rawUrl, serviceKey)
    : null

export async function POST(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin service key is missing' }, { status: 500 })
    }

    const body = await request.json()
    const { action, table, data, id, query } = body

    if (action === 'insert') {
      const { data: resData, error } = await supabaseAdmin.from(table).insert([data]).select()
      if (error) throw error
      return NextResponse.json({ success: true, data: resData[0] })
    }

    if (action === 'update') {
      const { data: resData, error } = await supabaseAdmin.from(table).update(data).eq('id', id).select()
      if (error) throw error
      return NextResponse.json({ success: true, data: resData[0] })
    }

    if (action === 'delete') {
      const { error } = await supabaseAdmin.from(table).delete().eq('id', id)
      if (error) throw error
      return NextResponse.json({ success: true })
    }

    if (action === 'upsert_settings') {
      const upsertRows = Object.entries(data).map(([key, value]) => ({ key, value }))
      const { error } = await supabaseAdmin.from('site_settings').upsert(upsertRows, { onConflict: 'key' })
      if (error) throw error
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'إجراء غير معروف' }, { status: 400 })
  } catch (err) {
    console.error('DB API Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
