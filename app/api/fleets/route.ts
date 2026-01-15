import { NextResponse } from 'next/server';
import { fleets } from '@/lib/fleet-data';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      fleets: fleets,
    });
  } catch (error) {
    console.error('Error fetching fleets:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch fleets',
      },
      { status: 500 }
    );
  }
}

