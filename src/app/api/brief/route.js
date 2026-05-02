import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('project_briefs')
      .insert([body]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Brief submitted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}