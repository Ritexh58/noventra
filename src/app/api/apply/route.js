import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("BODY:", body); // 👈 ADD THIS

    const { data, error } = await supabase
      .from('creator_applications') // make sure this is correct
      .insert([body]);

    if (error) {
      console.error("SUPABASE ERROR FULL:", JSON.stringify(error, null, 2)); // 👈 IMPORTANT
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("API ERROR FULL:", error); // 👈 IMPORTANT
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}